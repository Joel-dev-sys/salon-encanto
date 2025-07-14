import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import db from './db.js'; // ✅ este es necesario

 // Asegúrate de que este archivo esté en la misma carpeta

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar conexión
app.get('/ping', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, result) => {
    if (err) return res.status(500).send('Error en la conexión a la base de datos');
    res.send(`Conexión exitosa. Resultado: ${result[0].resultado}`);
  });
});


// Ruta para registrar usuarios (sin hashear la contraseña)
app.post('/registro', (req, res) => {
  console.log('Datos recibidos:', req.body); // Muestra los datos en la consola para verificar

  const {
    nombre, apellido, email, telefono, dni,
    fecha_nacimiento, genero, direccion, contrasena
  } = req.body;

  const sql = `
    INSERT INTO Usuarios (nombre, apellido, email, telefono, dni, direccion, fecha_nacimiento, genero, contrasena, rol)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [nombre, apellido, email, telefono, dni, direccion, fecha_nacimiento, genero, contrasena, 'cliente'];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      return res.status(500).json({ success: false, error: err.sqlMessage });
    }

    res.json({ success: true, message: 'Usuario registrado correctamente' });
  });
});

//Login

app.post('/login', (req, res) => {
  const {email,contrasena} = req.body;

  const sql = "SELECT * FROM Usuarios WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ success: false, error: "Error interno en la base de datos" });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, error: "Correo o contraseña incorrectos." });
    }

    const usuario = results[0];

    // Validar contraseña (se recomienda hashearla con bcrypt en el futuro)
    if (usuario.contrasena!== contrasena) {
      return res.status(400).json({ success: false, error: "Correo o contraseña incorrectos." });
    }

   const rol = usuario.rol;

    res.json({
      success: true,
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: rol
      }
    });
  });
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
