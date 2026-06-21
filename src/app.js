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

// Detectar la ruta del frontend seg├║n el entorno (local o Render)
const fs = require('fs');
const localFrontend = path.join(__dirname, '../../frontend');
const renderFrontend = path.join(__dirname, '../frontend');
const FRONTEND_DIR = fs.existsSync(renderFrontend) ? renderFrontend : localFrontend;

// Servir archivos est├íticos del frontend desde ambas carpetas
app.use(express.static(path.join(FRONTEND_DIR, 'client')));
app.use(express.static(path.join(FRONTEND_DIR, 'admin')));
app.use(express.static(FRONTEND_DIR));

// Rutas API
app.use('/api/appointments', appointmentRoutes);

// Rutas para servir p├íginas HTML
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'client/index.html'));
});

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'admin/login.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'admin/admin.html'));
});

// Ruta ra├¡z
app.get('/', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'client/index.html'));
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
