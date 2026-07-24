// db.js - Conexión a MySQL
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Usuario por defecto en XAMPP
  password: 'root',      
  database: 'inventario_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();