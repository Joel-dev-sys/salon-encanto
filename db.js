import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'ballast.proxy.rlwy.net',
  port: 46167, // Usa aquí el puerto que te da Railway
  user: 'root',
  password: 'gerDubYsEhQyuhswycEAmtnkzWdFmmhG',
  database: 'railway'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL desde db.js');
});

export default db;

