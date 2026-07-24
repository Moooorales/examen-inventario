// server.js - API REST Express
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Consultar todos los equipos
app.get('/api/equipos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Consultar un equipo por código
app.get('/api/equipos/:codigo', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipos WHERE codigo = ?', [req.params.codigo]);
    if (rows.length === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Registrar un nuevo equipo
app.post('/api/equipos', async (req, res) => {
  const { codigo, nombre, categoria, laboratorio, estado, responsable } = req.body;
  try {
    await db.query(
      'INSERT INTO equipos (codigo, nombre, categoria, laboratorio, estado, responsable) VALUES (?, ?, ?, ?, ?, ?)',
      [codigo, nombre, categoria, laboratorio, estado, responsable]
    );
    res.status(201).json({ message: 'Equipo registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Actualizar el estado de un equipo
app.put('/api/equipos/:codigo/estado', async (req, res) => {
  const { estado } = req.body;
  try {
    const [result] = await db.query('UPDATE equipos SET estado = ? WHERE codigo = ?', [estado, req.params.codigo]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});