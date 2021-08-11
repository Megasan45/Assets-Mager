//Usar mysql y definir la base de datos
const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys.js');
const pool = mysql.createPool(database);

//Para generar la conexion a la base de datos
pool.getConnection((err, connection) => {
    //Si hay error
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST')    {console.error("La conexion con la base de datos fue cerrada");}
        if (err.code === 'ER_CON_COUNT_ERROR')   {console.error("La base de datos tiene demasiadas conexiones");}
        if (err.code === 'ECONNREFUSED')    {console.error("La comexion fue rechazada");}
    }

    //Si la conexion es exitosa
    if (connection) connection.release();
    console.log('Base de datos conectada');
    return;
});

//Para la exportacion del modulo de forma asincrona
pool.query = promisify(pool.query);
module.exports = pool;