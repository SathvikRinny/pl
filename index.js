const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Serve resume.html
app.get('/resume', (req, res) => {
    res.sendFile(__dirname + '/public/resume.html');
});

// Serve certificate.html (Note: I corrected the typo in the filename)
app.get('/certificate', (req, res) => {
    res.sendFile(__dirname + '/public/certificate.html');
});

// Serve contact.html
app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.post('/submit-form', (req, res) => {
    // Collect form data
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    // Get current date and time
    const currentDate = new Date();
    const dateTimeString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Prepare data to be stored with date and time
    const dataToStore = `${dateTimeString} - Name: ${name}, Email: ${email}, Message: ${message}\n`;

    // Append data to the existing file (rep.txt)
    fs.appendFile('public/rep.txt', dataToStore, (err) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            console.log('Data successfully stored in rep.txt');
            res.json({ success: true });
        }
    });
});

app.get('/submitForm', (req, res) => {
    // Redirect to submitForm.html after successful form submission
    res.sendFile(__dirname + '/public/submitForm.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
