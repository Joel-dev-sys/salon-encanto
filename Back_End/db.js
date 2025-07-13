const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'databasesrt.ctm26okywdh4.us-east-2.rds.amazonaws.com', // ejemplo: mi-db.abc123xyz.us-east-1.rds.amazonaws.com
  user: 'admin',
  password: 'rootaws1',
  database: 'tu_base_de_datos'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = db;

