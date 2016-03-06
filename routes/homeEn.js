var config = require('../config');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var flash = require('express-flash');
var _ = require('underscore');


exports.get = function(req, res) {

    res.render('layoutEn');

};


exports.post = function(req, res) {

    // sends email
    var auth = {
        auth: {
            api_key: config.get('mailgun:apiKey'),
            domain: config.get('mailgun:domain')
        }
    };

    var name = _.escape( req.body.name );
    var email = req.body.email;
    var skype = _.escape( req.body.skype );
    var city = _.escape( req.body.city );
    var text = _.escape( req.body.text );

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({

        from: config.get('mailgun:from'),
        to: 'peter_babukh@mail.ru',
        subject: 'Letter from MyWebStart',
        html: '<div>' + name + '</div><div>' + email + '</div><div>' + skype +
        '</div><div>' + city + '</div><div>' + text + '</div>'

    }, function (err) {
        if (err) return next(err);

        //req.flash('info', 'Спасибо. Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.' );
        return res.render('layoutEn');

    });
};