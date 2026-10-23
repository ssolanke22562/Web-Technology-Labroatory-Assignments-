<?php
/**
 * PHP Backend Server Form Processor
 * Handles sanitization, server-side validation, JSON API endpoints,
 * and fallback HTML confirmation page.
 */

// Set Content-Type and CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");

// Helper function to detect AJAX request
function isAjaxRequest() {
    return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
        || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);
}

// Function to sanitize user string input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $errors = [];
    $sanitized = [];

    // 1. Full Name Validation
    $raw_fullName = $_POST['fullName'] ?? '';
    $fullName = sanitize_input($raw_fullName);
    if (empty($fullName) || strlen($fullName) < 2) {
        $errors['fullName'] = "Full name is required and must be at least 2 characters long.";
    } else {
        $sanitized['fullName'] = $fullName;
    }

    // 2. Email Validation
    $raw_email = $_POST['email'] ?? '';
    $email = filter_var(trim($raw_email), FILTER_SANITIZE_EMAIL);
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "A valid email address is required (e.g. user@domain.com).";
    } else {
        $sanitized['email'] = $email;
    }

    // 3. Phone Number Validation
    $raw_phone = $_POST['phone'] ?? '';
    $phone = preg_replace('/[^0-9]/', '', $raw_phone);
    if (empty($phone) || !preg_match('/^[0-9]{10}$/', $phone)) {
        $errors['phone'] = "Phone number must be exactly 10 digits.";
    } else {
        $sanitized['phone'] = $phone;
    }

    // 4. Department Validation
    $allowed_departments = [
        "Software Engineering",
        "Web Development",
        "UI/UX Design",
        "Data Analytics",
        "Cyber Security"
    ];
    $raw_dept = $_POST['department'] ?? '';
    $department = sanitize_input($raw_dept);
    if (empty($department) || !in_array($department, $allowed_departments)) {
        $errors['department'] = "Please select a valid department from the options.";
    } else {
        $sanitized['department'] = $department;
    }

    // 5. Password Validation
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';

    if (empty($password) || strlen($password) < 8) {
        $errors['password'] = "Password must be at least 8 characters long.";
    } elseif (!preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password) || !preg_match('/[^A-Za-z0-9]/', $password)) {
        $errors['password'] = "Password must include at least one uppercase letter, one digit, and one special character.";
    }

    if ($password !== $confirmPassword) {
        $errors['confirmPassword'] = "Confirm Password does not match the Password field.";
    }

    // 6. Bio / Remarks Validation (Optional)
    $raw_bio = $_POST['bio'] ?? '';
    $bio = sanitize_input($raw_bio);
    if (strlen($bio) > 300) {
        $bio = substr($bio, 0, 300);
    }
    $sanitized['bio'] = $bio ?: "No bio provided";

    // 7. Terms & Conditions Check
    if (!isset($_POST['terms'])) {
        $errors['terms'] = "You must agree to the Terms of Service and Privacy Policy.";
    } else {
        $sanitized['terms_accepted'] = true;
    }

    // Determine Response Output
    if (!empty($errors)) {
        // If validation errors exist
        if (isAjaxRequest()) {
            header('Content-Type: application/json');
            http_response_code(400);
            echo json_encode([
                'status' => 'error',
                'message' => 'Validation failed on server.',
                'errors' => $errors
            ]);
            exit;
        }
    } else {
        // Validation Passed!
        $sanitized['submitted_at'] = date('Y-m-d H:i:s T');
        $sanitized['ip_address'] = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

        if (isAjaxRequest()) {
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode([
                'status' => 'success',
                'message' => 'Registration successfully processed by PHP server backend.',
                'data' => $sanitized
            ]);
            exit;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Server Response - Form Submission</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0b0f19;
            color: #f3f4f6;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            margin: 0;
        }
        .response-card {
            background: #121826;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .status-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .status-icon.success { color: #10b981; }
        .status-icon.error { color: #ef4444; }
        h1 { font-family: 'Outfit', sans-serif; margin-bottom: 0.5rem; }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
        }
        .data-table th, .data-table td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            text-align: left;
        }
        .data-table th { color: #818cf8; font-weight: 600; width: 35%; }
        .btn-back {
            display: inline-block;
            margin-top: 2rem;
            padding: 0.8rem 1.5rem;
            background: #6366f1;
            color: #fff;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
        }
        .btn-back:hover { background: #4f46e5; }
    </style>
</head>
<body>
    <div class="response-card">
        <div class="header">
            <?php if (!empty($errors)): ?>
                <div class="status-icon error"><i class="fa-solid fa-circle-xmark"></i></div>
                <h1>Server Validation Errors</h1>
                <p>Please go back and correct the following issues:</p>
            <?php else: ?>
                <div class="status-icon success"><i class="fa-solid fa-circle-check"></i></div>
                <h1>Submission Received!</h1>
                <p>Your data was validated & processed by the PHP server.</p>
            <?php endif; ?>
        </div>

        <?php if (!empty($errors)): ?>
            <ul style="color: #ef4444; padding-left: 1.2rem;">
                <?php foreach ($errors as $field => $msg): ?>
                    <li style="margin-bottom: 0.5rem;"><?php echo htmlspecialchars($msg); ?></li>
                <?php endforeach; ?>
            </ul>
        <?php else: ?>
            <table class="data-table">
                <tr><th>Full Name:</th><td><?php echo $sanitized['fullName']; ?></td></tr>
                <tr><th>Email Address:</th><td><?php echo $sanitized['email']; ?></td></tr>
                <tr><th>Phone:</th><td><?php echo $sanitized['phone']; ?></td></tr>
                <tr><th>Department:</th><td><?php echo $sanitized['department']; ?></td></tr>
                <tr><th>Bio Summary:</th><td><?php echo $sanitized['bio']; ?></td></tr>
                <tr><th>Submitted At:</th><td><?php echo $sanitized['submitted_at']; ?></td></tr>
                <tr><th>Client IP:</th><td><?php echo $sanitized['ip_address']; ?></td></tr>
            </table>
        <?php endif; ?>

        <a href="index.html" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Back to Registration Form</a>
    </div>
</body>
</html>
