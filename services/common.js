const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "lenovok8plus38@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

async function sendMail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: '"Seva Hospital 🏥" <lenovok8plus38@gmail.com>',
    to,
    subject,
    text,
    html,
  });

  return info;
}

function confirmAppointmentTemplate(appointmentData) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              border: 1px solid #e0e0e0;
              border-radius: 10px;
              background-color: #f9f9f9;
          }
          .header {
              text-align: center;
              border-bottom: 1px solid #e0e0e0;
              padding-bottom: 10px;
              margin-bottom: 20px;
          }
          .header img {
              max-width: 150px;
          }
          .header h2 {
              color: #2c3e50;
              margin: 10px 0;
          }
          .content h3 {
              color: #4CAF50;
          }
          .content p {
              margin: 5px 0;
          }
          .footer {
              margin-top: 20px;
              padding-top: 10px;
              border-top: 1px solid #e0e0e0;
              text-align: center;
          }
          .footer p {
              font-size: 12px;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/ds0ojjzzd/image/upload/v1716227684/seva-header-footer_kncr2n.png" alt="Seva Hospital Logo">
              <h2>Appointment Confirmation at Seva Hospital</h2>
          </div>
          <div class="content">
              <p>Dear <strong>${appointmentData.patient}</strong>,</p>
              <p>We are pleased to confirm your appointment at Seva Hospital. Below are the details of your scheduled visit:</p>
              <hr>
              <h3>Appointment Details:</h3>
              <p><strong>Patient Name: </strong>${appointmentData.patient}</p>
              <p><strong>Appointment Date: </strong>${appointmentData.date}</p>
              <p><strong>Appointment Time: </strong>10.00am - 2.00pm</p>
              <p><strong>Doctor: </strong>${appointmentData.doctor.doctor}</p>
              <p><strong>Department: </strong>${appointmentData.department}</p>
              <p><strong>Appointment ID: </strong>${appointmentData.id}</p>
              <hr>
              <h3>Location:</h3>
              <p>Seva Hospital<br><br>balasore, Odisha, 756047</p>
              <hr>
              <h3>Instructions:</h3>
              <p>- Please arrive at least 15 minutes prior to your appointment time.</p>
              <p>- Bring your ID and any previous medical records relevant to your visit.</p>
              <p>- If you need to reschedule or cancel your appointment, please contact us at +91 9876543210 or lenovok8plus38@gmail.com at least 24 hours in advance.</p>
              <hr>
              <h3>Health and Safety:</h3>
              <p>At Seva Hospital, your health and safety are our top priorities. Please wear a mask and follow social distancing guidelines during your visit.</p>
              <hr>
              <h3>Contact Us:</h3>
              <p>If you have any questions or need further assistance, feel free to reach out to us at +91 9876543210 or reply to this email.</p>
          </div>
          <div class="footer">
              <p>Thank you for choosing Seva Hospital for your healthcare needs. We look forward to serving you.</p>
              <p>Wish you all the best,</p>
              <p><br>Seva Hospital<br>+91 9876543210<br>lenovok8plus38@gmail.com<br>sevahospital.onrender.com</p>
          </div>
      </div>
  </body>
  </html>
`;
}

function cencelledAppointmentTemplate(cancelAppointmentData) {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Cancellation Notice</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          .header {
              text-align: center;
              border-bottom: 1px solid #dddddd;
              padding-bottom: 10px;
              margin-bottom: 20px;
          }
  
          .logo {
              max-width: 150px;
              margin-bottom: 10px;
          }
  
          h1 {
              font-size: 24px;
              color: #333333;
          }
  
          .content {
              font-size: 16px;
              color: #555555;
              line-height: 1.6;
          }
  
          .patient-name,
          .doctor-name,
          .appointment-date,
          .cancellation-reason,
          .contact-info,
          .hospital-name {
              font-weight: bold;
              color: #333333;
          }
  
          .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 14px;
              color: #888888;
          }
  
          .footer .hospital-name {
              font-weight: bold;
              color: #333333;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <div class="header">
              <img src="https://res.cloudinary.com/ds0ojjzzd/image/upload/v1716227684/seva-header-footer_kncr2n.png" alt="Hospital Logo" class="logo">
              <h1>Appointment Cancellation Notice</h1>
          </div>
          <div class="content">
              <p>Dear <span class="patient-name">${cancelAppointmentData.patient}</span>,</p>
              <p>We regret to inform you that your appointment with <span class="doctor-name">${cancelAppointmentData.doctor.doctor}</span>
                  scheduled for <span class="appointment-date">${cancelAppointmentData.date}</span> has been cancelled.</p>
              <p><strong>Reason for Cancellation:</strong></p>
              <p class="cancellation-reason">${cancelAppointmentData.reason}</p>
              <p>If you have any questions or need to reschedule, please contact us at <span class="contact-info">+91 9876543210</span> or visit our <a href="https://sevahospital.onrender.com">website</a> to reschedule your appointment.</p>
              <p>We apologize for any inconvenience this may cause and appreciate your understanding.</p>
              </div>
          <div class="footer">
              <p>Sincerely,</p>
              <p><span class="hospital-name">Seva Hospital</span></p>
          </div>
      </div>
  </body>
  
  </html>
  `;
}

module.exports = {
  sendMail,
  confirmAppointmentTemplate,
  cencelledAppointmentTemplate,
};
