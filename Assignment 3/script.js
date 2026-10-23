/**
 * Client-Side Form Validation & PHP Server Integration Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // Element References
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const department = document.getElementById('department');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const bio = document.getElementById('bio');
    const charCount = document.getElementById('charCount');
    const terms = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    
    const togglePasswordBtn = document.getElementById('togglePassword');
    const strengthProgress = document.getElementById('strengthProgress');
    const strengthLabel = document.getElementById('strengthLabel');
    
    const responseModal = document.getElementById('responseModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const payloadContent = document.getElementById('payloadContent');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Validation Regex Rules
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    // 1. Password Visibility Toggle
    togglePasswordBtn.addEventListener('click', () => {
        const isPassword = password.type === 'password';
        password.type = isPassword ? 'text' : 'password';
        togglePasswordBtn.innerHTML = isPassword 
            ? '<i class="fa-regular fa-eye-slash"></i>' 
            : '<i class="fa-regular fa-eye"></i>';
    });

    // 2. Real-Time Password Strength Calculation
    password.addEventListener('input', () => {
        const val = password.value;
        const result = checkPasswordStrength(val);
        
        strengthProgress.style.width = `${result.score}%`;
        strengthProgress.style.backgroundColor = result.color;
        strengthLabel.textContent = result.label;
        strengthLabel.style.color = result.color;

        validateField(password, () => result.score >= 50);
        if (confirmPassword.value) {
            validateField(confirmPassword, () => confirmPassword.value === password.value);
        }
    });

    function checkPasswordStrength(pwd) {
        if (!pwd) return { score: 0, color: 'transparent', label: 'Password strength' };
        
        let score = 0;
        if (pwd.length >= 8) score += 25;
        if (/[A-Z]/.test(pwd)) score += 25;
        if (/[0-9]/.test(pwd)) score += 25;
        if (/[^A-Za-z0-9]/.test(pwd)) score += 25;

        if (score <= 25) return { score: 25, color: 'var(--danger)', label: 'Weak' };
        if (score <= 50) return { score: 50, color: 'var(--warning)', label: 'Medium' };
        if (score <= 75) return { score: 75, color: '#3b82f6', label: 'Strong' };
        return { score: 100, color: 'var(--success)', label: 'Excellent' };
    }

    // 3. Bio Character Counter
    bio.addEventListener('input', () => {
        charCount.textContent = bio.value.length;
    });

    // 4. Real-time Field Validation Functions
    function setInvalid(element) {
        element.closest('.input-group').classList.add('invalid');
    }

    function setValid(element) {
        element.closest('.input-group').classList.remove('invalid');
    }

    function validateField(element, validationFn) {
        if (validationFn()) {
            setValid(element);
            return true;
        } else {
            setInvalid(element);
            return false;
        }
    }

    // Event listeners for blur/input field validation
    fullName.addEventListener('input', () => validateField(fullName, () => fullName.value.trim().length >= 2));
    email.addEventListener('input', () => validateField(email, () => emailRegex.test(email.value.trim())));
    phone.addEventListener('input', () => {
        // Strip non-digit characters
        phone.value = phone.value.replace(/\D/g, '');
        validateField(phone, () => phoneRegex.test(phone.value));
    });
    department.addEventListener('change', () => validateField(department, () => department.value !== ''));
    confirmPassword.addEventListener('input', () => validateField(confirmPassword, () => confirmPassword.value === password.value));
    terms.addEventListener('change', () => validateField(terms, () => terms.checked));

    // 5. Entire Form Validation Check
    function validateAllFields() {
        const isNameValid = validateField(fullName, () => fullName.value.trim().length >= 2);
        const isEmailValid = validateField(email, () => emailRegex.test(email.value.trim()));
        const isPhoneValid = validateField(phone, () => phoneRegex.test(phone.value));
        const isDeptValid = validateField(department, () => department.value !== '');
        const isPasswordValid = validateField(password, () => checkPasswordStrength(password.value).score >= 50);
        const isConfirmValid = validateField(confirmPassword, () => confirmPassword.value === password.value);
        const isTermsValid = validateField(terms, () => terms.checked);

        return isNameValid && isEmailValid && isPhoneValid && isDeptValid && isPasswordValid && isConfirmValid && isTermsValid;
    }

    // 6. Form Submission Handler (AJAX to process.php)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateAllFields()) {
            showToast('Please fix the errors in the form before submitting.', 'warning');
            return;
        }

        // Set Loading UI State
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            // Send POST request to process.php
            const response = await fetch('process.php', {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                handleServerResponse(data);
            } else {
                throw new Error(`Server returned HTTP ${response.status}`);
            }
        } catch (error) {
            console.warn('PHP Server request unreachable or offline. Running simulation mode.', error);
            
            // Fallback simulation mode for testing offline / without active PHP server running
            setTimeout(() => {
                const simulatedData = {
                    status: 'success',
                    message: 'Form validation successful! (PHP Server Simulation)',
                    server_time: new Date().toISOString(),
                    received_data: {
                        fullName: fullName.value,
                        email: email.value,
                        phone: phone.value,
                        department: department.value,
                        bio: bio.value || 'N/A',
                        terms_accepted: terms.checked ? 'Yes' : 'No'
                    },
                    note: 'To run with live PHP server: open terminal and run "php -S localhost:8000"'
                };
                handleServerResponse(simulatedData);
            }, 1000);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // 7. Render Server Response Modal
    function handleServerResponse(data) {
        if (data.status === 'success') {
            modalIcon.className = 'modal-status-icon success';
            modalIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
            modalTitle.textContent = 'Registration Successful!';
        } else {
            modalIcon.className = 'modal-status-icon error';
            modalIcon.style.color = 'var(--danger)';
            modalIcon.style.background = 'rgba(239, 68, 68, 0.15)';
            modalIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
            modalTitle.textContent = 'Server Validation Error';
        }

        modalMessage.textContent = data.message || 'Server processed request.';
        payloadContent.textContent = JSON.stringify(data, null, 2);
        
        responseModal.classList.add('active');
    }

    // Modal Close Action
    closeModalBtn.addEventListener('click', () => {
        responseModal.classList.remove('active');
    });

    // Close modal on click outside box
    responseModal.addEventListener('click', (e) => {
        if (e.target === responseModal) {
            responseModal.classList.remove('active');
        }
    });

    // 8. Toast Helper
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info';
        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
        
        container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
});
