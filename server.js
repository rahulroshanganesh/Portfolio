const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const appPassword = process.env.pass;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.post('/contact', (req, res) => {
    const {name, email, subject, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'rahulroshanganesh2002@gmail.com',
            pass:appPassword
        }
    });

    const mailOptions = {
        from: email,
        to: 'rahulroshanganesh2002@gmail.com',
        subject:`Portflio contact - ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            console.log(err);
            res.status(500).send("Semething went wrong");
        }else{
            // console.log('Email sent: ' + info.response);
            // Redirect to homepage after successful submission
            return res.redirect('/');
        }
    });
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000, ()=> console.log('Server running on port 3000'));
