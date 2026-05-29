const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'noreply@myards.com';

const sendRegistrationEmail = async (email, name, applicationId, type) => {
  const subject = `Registration Received - Myards ${type}`;
  const html = `
    <h2>Welcome to Myards, ${name}!</h2>
    <p>Your registration application for a <strong>${type}</strong> account has been received and is currently under review by our team.</p>
    <p>Your Application ID is: <strong>${applicationId}</strong></p>
    <p>You can track the status of your application at any time on our status tracking page.</p>
    <br/>
    <p>Thank you,</p>
    <p>The Myards Team</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Myards Notifications" <${SENDER_EMAIL}>`,
      to: email,
      subject,
      html,
    });
    console.log(`Registration email sent to ${email}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending registration email to ${email}:`, error);
  }
};

const sendVerificationResultEmail = async (email, name, status, type) => {
  const subject = `Application Status Update - Myards ${type}`;
  const statusMessage = status === 'Approved' 
    ? 'Congratulations! Your application has been approved. You can now start using our platform.' 
    : 'Unfortunately, your application has been rejected at this time. Please contact support for more details.';
  
  const html = `
    <h2>Hello ${name},</h2>
    <p>There is an update on your Myards <strong>${type}</strong> application.</p>
    <p>Status: <strong>${status}</strong></p>
    <p>${statusMessage}</p>
    <br/>
    <p>Thank you,</p>
    <p>The Myards Team</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Myards Notifications" <${SENDER_EMAIL}>`,
      to: email,
      subject,
      html,
    });
    console.log(`Verification result email sent to ${email}: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending verification result email to ${email}:`, error);
  }
};

module.exports = { sendRegistrationEmail, sendVerificationResultEmail };
