// Importa los módulos
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Crea una instancia de Express
const app = express();

// Habilita CORS para todas las solicitudes
app.use(cors());

// Define un puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Conecta a la base de datos SQLite (si no existe, la crea)
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos SQLite establecida.');
  }
});

// Crear la tabla de usuarios si no existe
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    fecha_nacimiento TEXT,
    direccion TEXT
  )`, (err) => {
    if (err) {
      console.error('Error al crear la tabla:', err.message);
    } else {
      console.log('Tabla de usuarios creada o ya existe.');
    }
  });
});

// Ruta de prueba para la API
app.get('/', (req, res) => {
  res.send('¡Hola, mundo! El servidor API está funcionando.');
});

// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  db.all('SELECT * FROM usuarios LIMIT ? OFFSET ?', [size, offset], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ usuarios: rows });
  });
});

// Ruta para obtener un usuario por ID
app.get('/api/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  db.get('SELECT * FROM usuarios WHERE id = ?', [usuarioId], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener el usuario', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(row);
  });
});

// Ruta para editar un usuario por ID
app.put('/api/usuarios/:id', express.json(), (req, res) => {
  const { nombre, fecha_nacimiento, email, direccion } = req.body;
  const usuarioId = req.params.id;

  // Verifica si el usuario existe
  db.get('SELECT * FROM usuarios WHERE id = ?', [usuarioId], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error al buscar el usuario', error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza el usuario
    db.run(
      `UPDATE usuarios SET nombre = ?, fecha_nacimiento = ?, email = ?, direccion = ? WHERE id = ?`,
      [nombre, fecha_nacimiento, email, direccion, usuarioId],
      function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error al actualizar el usuario', error: err.message });
        }
        res.status(200).json({ message: 'Usuario actualizado', usuario: { id: usuarioId, nombre, fecha_nacimiento, email, direccion } });
      }
    );
  });
});

// Ruta para eliminar un usuario por ID
app.delete('/api/usuarios/:id', (req, res) => {
  const usuarioId = req.params.id;
  
  db.run('DELETE FROM usuarios WHERE id = ?', [usuarioId], function (err) {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el usuario', error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  });
});

// Ruta para agregar un nuevo usuario
app.post('/api/usuarios', express.json(), (req, res) => {
  const { nombre, email, fecha_nacimiento, direccion } = req.body;
  const query = 'INSERT INTO usuarios (nombre, email, fecha_nacimiento, direccion) VALUES (?, ?, ?, ?)';

  db.run(query, [nombre, email, fecha_nacimiento, direccion], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, nombre, email, fecha_nacimiento, direccion });
  });
});

// Inicia el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
