var config = require('../config');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var flash = require('express-flash');


exports.get = function(req, res) {

    res.render('layout');

};


exports.post = function(req, res) {

    // sends email
    var auth = {
        auth: {
            api_key: config.get('mailgun:apiKey'),
            domain: config.get('mailgun:domain')
        }
    };

    var name = req.body.name;
    var email = req.body.email;
    var skype = req.body.skype;
    var city = req.body.city;
    var www = req.body.www;
    var text = req.body.text;

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({

        from: config.get('mailgun:from'),
        to: 'peter_babukh@mail.ru',
        subject: 'Letter from MyWebStart',
        html: '<div>' + name + '</div><div>' + email + '</div><div>' + skype +
        '</div><div>' + city + '</div><div>' + www + '</div><div>' + text + '</div>'

    }, function (err) {
        if (err) return next(err);

        //req.flash('info', 'Спасибо. Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.' );
        return res.render('layout');

    });
};