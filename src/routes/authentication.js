//Autenticacion
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('../lib/auth');

//Pagina del Login
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('auth/login.hbs');
});

//Enviar formulario de ingreso
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/assets',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

//Pagina de registro
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup.hbs');
});

//Enviar formulario de registro
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/assets',
        failureRedirect: '/signup',
        failureFlash: true
    }));

//Cierre de sesion
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

module.exports = router;