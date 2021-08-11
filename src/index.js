const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const flash = require('connect-flash');
const passport = require('passport');

const { database } = require('./keys.js');

// Inicializar express y base de datos
const app = express();
require('./lib/passport.js');

//Configuraciones de la app
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'AssetsMagerSession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//URLs del servidor
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/assets', require('./routes/assets.js'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar servidor
app.listen(app.get('port'), () => {
    console.log("servidor en el puerto ", app.get('port'));
});