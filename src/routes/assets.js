//Bienes
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');
const pool = require('../database.js');

//Para cuando se hagan las peticiones get
router.get('/add', isLoggedIn, (req, res) => {  //Formulario para agregar bienes
    res.render('assets/add.hbs');
});

router.get('/', isLoggedIn, async (req, res) => {    //Lista de bienes
    const Assets = await pool.query('SELECT * FROM Assets WHERE user_id = ?', [req.user.ID]);
    res.render('assets/list.hbs', {Assets});
});


router.get('/next-list', isLoggedIn, async (req, res) => {    //Bienes proximos a pagar
    const Assets = await pool.query('SELECT * FROM Assets WHERE user_id = ? ORDER BY fecha_pago ASC', [req.user.ID]);
    res.render('assets/next-list.hbs', {Assets});
});

//Para las peticiones post
router.post('/add', isLoggedIn, async (req, res) => {   //Enviar el formulario
    //Con esto los datoas del formulario se convierten en un objeto
    const { arrendatario, operacion, municipio, barrio, direccion, estrato, fecha_pago, valor, valor_danos, valor_admin, alcobas, banios, garage, piscina, cuarto_util, unidad, porteria24h, vivienda, familia, servicios, gas, piso, ascensor, juegos, areas_comunes, area, antiguedad, constructora, predial, descripcion } = req.body;
    const newAsset = {
        arrendatario,
        operacion,
        municipio,
        barrio,
        direccion,
        estrato,
        fecha_pago,
        valor,
        valor_danos,
        valor_admin,
        alcobas,
        banios,
        garage,
        piscina,
        cuarto_util,
        unidad,
        porteria24h,
        vivienda,
        familia,
        servicios,
        gas,
        piso,
        ascensor,
        juegos,
        areas_comunes,
        area,
        antiguedad,
        constructora,
        predial,
        descripcion,
        user_id: req.user.ID
    };

    //Guardar a la base de datos
    await pool.query('INSERT INTO Assets set ?', [newAsset]);
    req.flash('success', 'Propiedad guardada satisfactoriamente');
    res.redirect('/assets');
});

//Para las peticiones Delete
router.get('/delete/:ID', isLoggedIn, async (req, res) => {
    console.log(req.params.id);
    const { ID } = req.params;
    await pool.query('DELETE FROM Assets WHERE ID = ?', [ID]);
    req.flash('success', 'Propiedad eliminada satisfactoriamente');
    res.redirect('/assets');
})

//Para obtener la pagina de detalle
router.get('/detail/:ID', isLoggedIn, async (req, res) => {
    const { ID } = req.params;
    const Asset = await pool.query('SELECT * FROM Assets WHERE ID = ?', [ID]);
    res.render('assets/detail', {Asset: Asset[0]});
});

//Para obtener la pagina para actualizar los datos
router.get('/edit/:ID', isLoggedIn, async (req, res) => {
    const { ID } = req.params;
    const Asset = await pool.query('SELECT * FROM Assets WHERE ID = ?', [ID]);
    res.render('assets/edit', {Asset: Asset[0]});
});

//Enviar datos a actualizar

router.post('/edit/:ID', isLoggedIn, async (req, res) => {
    const { ID } = req.params;
    const { arrendatario, operacion, municipio, barrio, direccion, estrato, fecha_pago, valor, valor_danos, valor_admin, alcobas, banios, garage, piscina, cuarto_util, unidad, porteria24h, vivienda, familia, servicios, gas, piso, ascensor, juegos, areas_comunes, area, antiguedad, constructora, predial, descripcion } = req.body;
    const newAsset = {
        arrendatario,
        operacion,
        municipio,
        barrio,
        direccion,
        estrato,
        fecha_pago,
        valor,
        valor_danos,
        valor_admin,
        alcobas,
        banios,
        garage,
        piscina,
        cuarto_util,
        unidad,
        porteria24h,
        vivienda,
        familia,
        servicios,
        gas,
        piso,
        ascensor,
        juegos,
        areas_comunes,
        area,
        antiguedad,
        constructora,
        predial,
        descripcion
    };

    await pool.query('UPDATE Assets set ? WHERE ID = ?', [newAsset, ID]);
    req.flash('success', 'Propiedad actualizada satisfactoriamente');
    res.redirect('/assets');
});

//Para obtener pagina con los resultados de busqueda
router.post('/search', isLoggedIn, async (req, res) => {    //Lista de bienes
    const { Term, Search } = req.body;
    console.log(Search);
    let Assets;
    //If para cada caso de busqueda
    if (Term == 'arrendatario')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND arrendatario LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    if (Term == 'operacion')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND operacion LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    if (Term == 'municipio')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND municipio LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    if (Term == 'barrio')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND barrio LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    if (Term == 'valor')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND valor LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    if (Term == 'fecha_pago')
        {Assets = await pool.query("SELECT * FROM Assets WHERE user_id = ? AND fecha_pago LIKE CONCAT('%', ?, '%')", [req.user.ID, Search]);}
    res.render('assets/search-list.hbs', {Assets});
});

module.exports = router;