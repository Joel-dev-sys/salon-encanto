import mysql from 'mysql2'

const db = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net', // ejemplo: mi-db.abc123xyz.us-east-1.rds.amazonaws.com
  user: 'root',
  password: 'gerDubYsEhQyuhswycEAmtnkzWdFmmhG',
  database: 'railway'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = db;

