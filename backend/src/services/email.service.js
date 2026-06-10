require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});




// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank Transaction System" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegisterationEmail(userEmail, name){
    const subject = "Welcome to Bank Transaction System!"
    const text = `Hello ${name},\n\nThank you for regestering at Bank Transaction System. We're excited to have you on board!\n\nBest regards,\nThe Backend Transaction System`
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Bank Transaction System. We're excited to have you on board!</p><p>Best regards,<br>The Bank Transaction System</p>`
    
    await sendEmail(userEmail,subject,text,html)
}

async function sendTransactionEmail(userEmail, name, amount, toAccount){
    const subject = "Transaction Successful!";
    
    const text = `Hello ${name},

Your transaction has been completed successfully.

Transaction Details:
Amount Transferred: ₹${amount}
Recipient Account: ${toAccount}

Thank you for using Bank Transaction System.

Best regards,
The Bank Transaction System`;

    const html = `
    <p>Hello ${name},</p>
    <p>Your transaction has been completed successfully.</p>
    
    <h3>Transaction Details:</h3>
    <ul>
        <li><strong>Amount Transferred:</strong> ₹${amount}</li>
        <li><strong>Recipient Account:</strong> ${toAccount}</li>
    </ul>

    <p>Thank you for using Bank Transaction System.</p>

    <p>Best regards,<br>The Bank Transaction System</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Failed - Bank Transaction System";

    const text = `Hello ${name},

We were unable to process your transaction of ₹${amount} to account ${toAccount}.

The transaction has failed and no funds have been transferred. Please verify the account details and try again.

If the issue persists, please contact our support team.

Best regards,
The Bank Transaction System`;

    const html = `
        <p>Hello ${name},</p>
        <p>We were unable to process your transaction of <strong>₹${amount}</strong> to account <strong>${toAccount}</strong>.</p>
        <p>The transaction has failed and no funds have been transferred. Please verify the account details and try again.</p>
        <p>If the issue persists, please contact our support team.</p>
        <p>Best regards,<br>The Bank Transaction System</p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegisterationEmail,
    sendTransactionEmail
}