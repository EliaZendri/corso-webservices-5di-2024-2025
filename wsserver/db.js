const mysql = require('mysql2/promise');
const { port } = require('./config');
//creo un pool di connessioni che il mio web service usera per connettersi a mySQL

const pool = mysql.createPool({
    host: 'dbserver',
    user: 'root',
    password: 'cisco',          
    port: 3306,
    database: 'dbapp',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;