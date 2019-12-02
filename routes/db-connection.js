const mysql = require('mysql');

const Pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Wabo_90_mba*#',
    database: 'cwk_dms',
    connectionLimit: 10,
    multipleStatements: true
});

module.exports = Pool;
