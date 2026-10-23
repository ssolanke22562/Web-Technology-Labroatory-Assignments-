const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Helper to create Nodemailer transporter
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: { user, pass }
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    let savedContact = null;
    let dbSaved = false;

    // Save to MongoDB if available
    try {
      savedContact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim()
      });
      dbSaved = true;
    } catch (dbErr) {
      console.warn('⚠️ Could not save contact to MongoDB:', dbErr.message);
    }

    // Trigger Email Notification via Nodemailer
    let emailSent = false;
    const transporter = createTransporter();

    if (transporter) {
      const recipient = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;
      const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: recipient,
        subject: `[Portfolio Contact] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #00f2fe; border-bottom: 2px solid #eee; padding-bottom: 8px;">New Message from Portfolio Website</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00f2fe; white-space: pre-wrap;">${message}</div>
            <p style="font-size: 0.85em; color: #888; margin-top: 25px;">This message was submitted via Sarthak Raju Solanke's Personal Portfolio.</p>
          </div>
        `
      };

      try {
        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log(`✅ Email notification sent to ${recipient}`);
      } catch (mailErr) {
        console.error('❌ Failed to send email via Nodemailer:', mailErr.message);
      }
    } else {
      console.warn('⚠️ Nodemailer skipped: EMAIL_USER and EMAIL_PASS environment variables are not set.');
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      dbSaved,
      emailSent,
      contact: savedContact
    });

  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing your request. Please try again later.'
    });
  }
};

module.exports = {
  submitContactForm
};
