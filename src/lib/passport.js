const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database.js');
const helpers = require('../lib/helpers.js');

//Configuracion del login
passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (rows.length > 0)    
        {
         const user = rows[0];
         const validPassword = await helpers.matchPassword(password, user.password);
         if (validPassword)
            {
             done(null, user, req.flash('success', 'Bienvenid@ ' + user.fullname));
            }
         else   {done(null, false, req.flash('message', 'Contraseña Errónea'));}
        }
    
    else   {done(null, false, req.flash('message', 'Usuario No Encontrado'));}
}));

//Configuracion del objeto para el registro
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    //Crear el objeto con los datos de usuario
    const { fullname, password2 } = req.body;
    const rows = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (rows.length == 0)    
        {
        if (password == password2)
            {
            const newUser = {
            username,
            password,
            fullname
            }
            newUser.password = await helpers.encryptPassword(password);
            const result = await pool.query('INSERT INTO Users SET ?', [newUser]);
            newUser.ID = result.insertId;
            console.log(result);
            return done(null, newUser, req.flash('success', 'Bienvenid@ ' + newUser.fullname));
            }
        else {return done(null, false, req.flash('message', 'Las contraseñas no coinciden'));}
        }
    else {return done(null, false, req.flash('message', 'El correo ya se encuentra registrado'));}
}));

//Middlewares de passport
passport.serializeUser((user, done) => {
    done(null, user.ID);
});

passport.deserializeUser(async (ID, done) => {
    const rows = await pool.query('SELECT * FROM Users Where ID = ?', [ID]);
    done(null, rows[0]);
});