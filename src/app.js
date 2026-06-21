const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend desde ambas carpetas
app.use(express.static(path.join(__dirname, '../../frontend/client')));
app.use(express.static(path.join(__dirname, '../../frontend/admin')));
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas API
app.use('/api/appointments', appointmentRoutes);

// Rutas para servir páginas HTML
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/client/index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/login.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/admin/admin.html'));
});

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/client/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: err.message
  });
});

module.exports = app;
