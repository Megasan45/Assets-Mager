//Rutas de express
const express = require('express');
const router = express.Router();

//Definir lo que se hace al acceder a la ruta

//Rutas al hacer peticiones get
router.get('/', (req, res) => {
    res.render('index/landing.hbs');
});

module.exports = router;