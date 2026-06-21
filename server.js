const app = require('./src/app');
const db = require('./src/db/init');

const PORT = process.env.PORT || 3000;

// Inicializar base de datos y luego iniciar servidor
db.init().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor executando em http://localhost:${PORT}`);
    console.log(`📅 Painel de Admin: http://localhost:${PORT}/admin.html`);
    console.log(`👤 Agendar Consulta: http://localhost:${PORT}/index.html`);
  });
}).catch(err => {
  console.error('❌ Erro ao inicializar a base de dados:', err);
  process.exit(1);
});
