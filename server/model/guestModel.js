const mysql = require('mysql2');

// Configuração do banco (ajuste conforme seu ambiente)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bancoX'
});

const Guest = {
    getAll: (callback) => {
        pool.query('SELECT * FROM GUESTS ORDER BY NAME DESC', callback);
    },
    updateStatus: (id, status, callback) => {
        pool.query('UPDATE GUESTS SET STATUS = ? WHERE ID = ?', [status, id], callback);
    }
};

module.exports = Guest;