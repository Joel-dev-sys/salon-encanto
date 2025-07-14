import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Front_End')));
app.use('/CSS', express.static(path.join(__dirname, 'Front_End', 'CSS')));
app.use('/JavaScript', express.static(path.join(__dirname, 'Front_End', 'JavaScript')));
app.use('/IMG', express.static(path.join(__dirname, 'Front_End', 'IMG')));

// ✅ Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Front_End', 'HTML', 'index.html'));
});

// Ping para test
app.get('/ping', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, result) => {
    if (err) return res.status(500).send('Error en la conexión a la base de datos');
    res.send(`Conexión exitosa. Resultado: ${result[0].resultado}`);
  });
});

// Registro
app.post('/registro', (req, res) => {
  const {
    nombre, apellido, email, telefono, dni,
    direccion, fecha_nacimiento, genero, contrasena_hash
  } = req.body;

  const sql = `
    INSERT INTO Usuarios (nombre, apellido, email, telefono, dni, direccion, fecha_nacimiento, genero, contrasena, rol)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'cliente')
  `;

  const values = [nombre, apellido, email, telefono, dni, direccion, fecha_nacimiento, genero, contrasena_hash];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({ success: false, error: err.sqlMessage });
    }

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  const sql = "SELECT * FROM Usuarios WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ success: false, error: "Error interno en la base de datos" });
    }

    if (results.length === 0 || results[0].contrasena !== contrasena) {
      return res.status(400).json({ success: false, error: "Correo o contraseña incorrectos." });
    }

    const usuario = results[0];
    res.json({
      success: true,
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  });
});

// Escucha en puerto que define Railway (o 8080 por defecto)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
