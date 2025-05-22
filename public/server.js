const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/message', (req, res) => {
  console.log('Received data:', JSON.stringify(req.body, null, 2));

  // Manually extract values to prevent [object Object] errors
  const getValue = (field) =>
    typeof field === 'object' && field !== null && 'value' in field ? field.value : field;

  const name = getValue(req.body.name);
  const email = getValue(req.body.email);
  const phone = getValue(req.body.phone);
  const subject = getValue(req.body.subject);
  const message = getValue(req.body.message);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alnahdanursery25@gmail.com',
      pass: 'ihle elce zsir crgc',
    },
  });

  const mailOptions = {
    from: email,
    to: 'alnahdanursery25@gmail.com',
    subject: `Message from ${name} - ${subject}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Subject: ${subject}

Message:
${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully!' });
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
