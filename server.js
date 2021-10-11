const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// initialize nodemailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'your_email@gmail.com',
            pass: 'your_password'
        }
    }
);

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))


const mailOptions = {
    from: '"your email name" <your_email@gmail,com>', // sender address
    to: 'receiver_email700@gmail.com', // list of receivers
    subject: 'Coba aplikasi server kirim email',
    template: 'email', // the name of the template file i.e email.handlebars
    context:{
        name: "Bang", // replace {{name}} with Adebola
        content: 'Bang!' // replace {{company}} with My Company
    }
};

// trigger the sending of the E-mail
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});