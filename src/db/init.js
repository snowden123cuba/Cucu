const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../appointments.db');
const db = new sqlite3.Database(dbPath);

// Promisify database operations
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const init = async () => {
  try {
    // Crear tabla de citas si no existe
    await dbRun(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        clientName TEXT NOT NULL,
        clientPhone TEXT NOT NULL,
        clientEmail TEXT,
        service TEXT NOT NULL,
        appointmentDate TEXT NOT NULL,
        appointmentTime TEXT NOT NULL,
        notes TEXT,
        status TEXT DEFAULT 'confirmada',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(appointmentDate, appointmentTime)
      )
    `);

    // Crear tabla de servicios disponibles
    await dbRun(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        duration INTEGER NOT NULL,
        price REAL
      )
    `);

    // Crear tabla de horarios disponibles
    await dbRun(`
      CREATE TABLE IF NOT EXISTS available_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        available INTEGER DEFAULT 1,
        UNIQUE(date, time)
      )
    `);

    // Crear tabla de configuración
    await dbRun(`
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        ownerPhone TEXT,
        ownerEmail TEXT,
        businessName TEXT,
        mondayStart TEXT DEFAULT '09:00',
        mondayEnd TEXT DEFAULT '17:00',
        tuesdayStart TEXT DEFAULT '09:00',
        tuesdayEnd TEXT DEFAULT '17:00',
        wednesdayStart TEXT DEFAULT '09:00',
        wednesdayEnd TEXT DEFAULT '17:00',
        thursdayStart TEXT DEFAULT '09:00',
        thursdayEnd TEXT DEFAULT '17:00',
        fridayStart TEXT DEFAULT '09:00',
        fridayEnd TEXT DEFAULT '17:00',
        saturdayStart TEXT DEFAULT '10:00',
        saturdayEnd TEXT DEFAULT '14:00',
        sundayStart TEXT,
        sundayEnd TEXT,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

  console.log('✅ Base de dados inicializada corretamente');
    
    // Inserir configurações padrão se não existirem
    const settingsCount = await dbGet(`SELECT COUNT(*) as count FROM settings`);
    if (settingsCount.count === 0) {
      await dbRun(`INSERT INTO settings (id, businessName) VALUES (1, 'Meu Negócio')`);
      console.log('✅ Configurações padrão inseridas');
    }
    // Insertar serviços por defecto se a tabela estiver vazia
    const serviceCount = await dbGet(`SELECT COUNT(*) as count FROM services`);
    if (serviceCount.count === 0) {
      await dbRun(`INSERT INTO services (name, duration, price) VALUES (?, ?, ?)`, ['Corte de Cabelo', 30, 15.00]);
      await dbRun(`INSERT INTO services (name, duration, price) VALUES (?, ?, ?)`, ['Barba', 20, 10.00]);
      await dbRun(`INSERT INTO services (name, duration, price) VALUES (?, ?, ?)`, ['Corte + Barba', 50, 25.00]);
      console.log('✅ Serviços padrão inseridos');
    }

  } catch (err) {
  console.error('❌ Erro ao inicializar BD:', err);
    throw err;
  }
};

module.exports = {
  db,
  dbRun,
  dbAll,
  dbGet,
  init
};
