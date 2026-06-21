const express = require('express');
const { dbRun, dbAll, dbGet } = require('../db/init');
const router = express.Router();

// Obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const appointments = await dbAll(`
      SELECT * FROM appointments 
      ORDER BY appointmentDate DESC, appointmentTime DESC
    `);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener citas del día
router.get('/day/:date', async (req, res) => {
  try {
    const appointments = await dbAll(`
      SELECT * FROM appointments 
      WHERE appointmentDate = ?
      ORDER BY appointmentTime
    `, [req.params.date]);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nueva cita
router.post('/', async (req, res) => {
  try {
    const { clientName, clientPhone, clientEmail, service, appointmentDate, appointmentTime, notes } = req.body;

    // Validar datos requeridos
    if (!clientName || !clientPhone || !service || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    // Verificar que el horario no esté ocupado
    const existingAppointment = await dbGet(`
      SELECT id FROM appointments 
      WHERE appointmentDate = ? AND appointmentTime = ?
    `, [appointmentDate, appointmentTime]);

    if (existingAppointment) {
      return res.status(409).json({ error: 'O horário já está reservado' });
    }

    // Insertar nueva cita
    const result = await dbRun(`
      INSERT INTO appointments 
      (clientName, clientPhone, clientEmail, service, appointmentDate, appointmentTime, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmada')
    `, [clientName, clientPhone, clientEmail, service, appointmentDate, appointmentTime, notes || '']);

    res.status(201).json({
      id: result.lastID,
      message: 'Consulta agendada com sucesso',
      appointmentId: result.lastID
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener servicios disponibles
router.get('/services', async (req, res) => {
  try {
    const services = await dbAll('SELECT * FROM services');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo servicio
router.post('/services', async (req, res) => {
  try {
    const { name, duration } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ error: 'Dados obrigatórios faltando' });
    }

    const result = await dbRun(`
      INSERT INTO services (name, duration)
      VALUES (?, ?)
    `, [name, duration]);

    res.status(201).json({
      id: result.lastID,
      message: 'Serviço criado com sucesso',
      serviceId: result.lastID
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar serviço
router.put('/services/:id', async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    await dbRun(`
      UPDATE services 
      SET name = ?, duration = ?, price = ?
      WHERE id = ?
    `, [name, duration, price, req.params.id]);

    res.json({ message: 'Serviço atualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Deletar serviço
router.delete('/services/:id', async (req, res) => {
  try {
    await dbRun(`DELETE FROM services WHERE id = ?`, [req.params.id]);
    res.json({ message: 'Serviço deletado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener horarios disponibles para una fecha
router.get('/available/:date', async (req, res) => {
  try {
    // Horarios por defecto (9:00 a 17:00 cada 30 minutos)
    const availableTimes = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minutes of ['00', '30']) {
        availableTimes.push(`${String(hour).padStart(2, '0')}:${minutes}`);
      }
    }

    // Obtener citas del día para marcar los horarios ocupados
    const appointments = await dbAll(`
      SELECT appointmentTime FROM appointments 
      WHERE appointmentDate = ?
    `, [req.params.date]);

    const bookedTimes = appointments.map(apt => apt.appointmentTime);
    const result = availableTimes.map(time => ({
      time,
      available: !bookedTimes.includes(time)
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar estado de cita
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: 'Status obrigatório' });
    }

    await dbRun(`
      UPDATE appointments 
      SET status = ?
      WHERE id = ?
    `, [status, req.params.id]);

    res.json({ message: 'Consulta atualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancelar cita
router.delete('/:id', async (req, res) => {
  try {
    await dbRun(`
      DELETE FROM appointments 
      WHERE id = ?
    `, [req.params.id]);

    res.json({ message: 'Consulta cancelada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== CONFIGURACIÓN ====================

// Obtener configuración
router.get('/config/settings', async (req, res) => {
  try {
    let settings = await dbGet(`SELECT * FROM settings WHERE id = 1`);
    
    if (!settings) {
      await dbRun(`INSERT INTO settings (id, businessName) VALUES (1, 'Meu Negócio')`);
      settings = await dbGet(`SELECT * FROM settings WHERE id = 1`);
    }
    
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar configuración
router.put('/config/settings', async (req, res) => {
  try {
    const { ownerPhone, ownerEmail, businessName, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd } = req.body;

    await dbRun(`
      UPDATE settings 
      SET ownerPhone = ?, ownerEmail = ?, businessName = ?, 
          mondayStart = ?, mondayEnd = ?,
          tuesdayStart = ?, tuesdayEnd = ?,
          wednesdayStart = ?, wednesdayEnd = ?,
          thursdayStart = ?, thursdayEnd = ?,
          fridayStart = ?, fridayEnd = ?,
          saturdayStart = ?, saturdayEnd = ?,
          sundayStart = ?, sundayEnd = ?,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [ownerPhone, ownerEmail, businessName, mondayStart, mondayEnd, tuesdayStart, tuesdayEnd, wednesdayStart, wednesdayEnd, thursdayStart, thursdayEnd, fridayStart, fridayEnd, saturdayStart, saturdayEnd, sundayStart, sundayEnd]);

    res.json({ message: 'Configurações atualizadas com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
