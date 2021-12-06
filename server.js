const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

// inisialisasi nodemailer 
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
            user: 'your_email@gmail.com',
            pass: 'your_password'
        }
    }
);

// arahkan ke folder template
const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// gunakan file template dengan nodemailer 
transporter.use('compile', hbs(handlebarOptions))


const mailOptions = {
    from: '"your email name" <your_email@gmail,com>', // alamat pengirim
    to: 'receiver_email@gmail.com', // daftar penerima
    subject: 'your subject',
    template: 'email', // nama file template yaitu email.handbars
    context:{
        name: "your name", //  ganti {{name}} sesuai nama anda
        content: 'your content' //  ganti {{perusahaan}} sesuai content
    }
};

// memicu pengiriman E-mail 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
