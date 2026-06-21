const API_BASE = '/api/appointments';

// Verificar autenticación
if (localStorage.getItem('adminLoggedIn') !== 'true') {
  window.location.href = '/login.html';
}

// Elementos del DOM
const todayView = document.getElementById('todayView');
const allView = document.getElementById('allView');
const searchView = document.getElementById('searchView');const configView = document.getElementById('configView');const menuItems = document.querySelectorAll('.menu-item');
const currentDateEl = document.getElementById('currentDate');
const refreshBtn = document.getElementById('refreshBtn');
const modal = document.getElementById('appointmentModal');
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

// Variáveis
let allAppointments = [];

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  updateDate();
  loadAllAppointments();
  setupEventListeners();
  loadConfigSettings();
  setInterval(loadAllAppointments, 30000); // Atualizar cada 30 segundos
});

// Configurar event listeners
function setupEventListeners() {
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      switchView(e.target.closest('.menu-item').dataset.view);
    });
  });

  // Evento de logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Está seguro de que desea cerrar sesión?')) {
        logout();
      }
    });
  }

  refreshBtn.addEventListener('click', loadAllAppointments);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
}

// Cambiar vista
function switchView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));

  if (viewName === 'today') {
    todayView.classList.add('active');
    displayTodayAppointments();
  } else if (viewName === 'all') {
    allView.classList.add('active');
    displayAllAppointments();
  } else if (viewName === 'search') {
    searchView.classList.add('active');
  } else if (viewName === 'config') {
    configView.classList.add('active');
    setupConfigPage();
  }

  event.target.closest('.menu-item').classList.add('active');
}

// Atualizar data atual
function updateDate() {
  const today = new Date();
  currentDateEl.textContent = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Carregar todas as citas
async function loadAllAppointments() {
  try {
    const response = await fetch(API_BASE);
    allAppointments = await response.json();

    if (todayView.classList.contains('active')) {
      displayTodayAppointments();
    }
    if (allView.classList.contains('active')) {
      displayAllAppointments();
    }
  } catch (err) {
    console.error('Erro ao carregar agendamentos:', err);
  }
}

// Mostrar citas de hoy
function displayTodayAppointments() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = allAppointments.filter(apt => apt.appointmentDate === today);

  const container = document.getElementById('todayAppointments');
  document.getElementById('todayCount').textContent = todayAppointments.length;

  // Calcular horários libres
  const totalSlots = 16; // 9:00 a 17:00 en intervalos de 30 min
  document.getElementById('todayAvailable').textContent = totalSlots - todayAppointments.length;

  if (todayAppointments.length === 0) {
    container.innerHTML = '<p class="info-text">Não há agendamentos para hoje</p>';
    return;
  }

  container.innerHTML = todayAppointments
    .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime))
    .map(apt => createAppointmentCard(apt))
    .join('');

  addCardClickListeners();
}

// Mostrar todas las citas
function displayAllAppointments() {
  const container = document.getElementById('allAppointments');

  if (allAppointments.length === 0) {
    container.innerHTML = '<p class="info-text">Não há agendamentos registrados</p>';
    return;
  }

  let html = `
    <table>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Cliente</th>
          <th>Serviço</th>
          <th>Data</th>
          <th>Telefone</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
  `;

  allAppointments
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate) || b.appointmentTime.localeCompare(a.appointmentTime))
    .forEach(apt => {
      html += `
        <tr class="appointment-row" onclick="openAppointmentModal(${apt.id})">
          <td>${apt.appointmentTime}</td>
          <td>${apt.clientName}</td>
          <td>${apt.service}</td>
          <td>${new Date(apt.appointmentDate).toLocaleDateString('pt-BR')}</td>
          <td>${apt.clientPhone}</td>
          <td><span class="status-badge status-${apt.status}">${apt.status}</span></td>
        </tr>
      `;
    });

  html += '</tbody></table>';
  container.innerHTML = html;
}

// Crear tarjeta de cita
function createAppointmentCard(apt) {
  return `
    <div class="appointment-card" onclick="openAppointmentModal(${apt.id})">
      <h3>⏰ ${apt.appointmentTime}</h3>
      <div class="appointment-info">
        <p><span class="info-label">👤 Cliente:</span> ${apt.clientName}</p>
        <p><span class="info-label">✨ Serviço:</span> ${apt.service}</p>
        <p><span class="info-label">📱 Telefone:</span> ${apt.clientPhone}</p>
        ${apt.clientEmail ? `<p><span class="info-label">📧 Email:</span> ${apt.clientEmail}</p>` : ''}
        ${apt.notes ? `<p><span class="info-label">📝 Observações:</span> ${apt.notes}</p>` : ''}
        <span class="status-badge status-${apt.status}">${apt.status}</span>
      </div>
    </div>
  `;
}

// Agregar listeners a tarjetas
function addCardClickListeners() {
  document.querySelectorAll('.appointment-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}

// Abrir modal de cita
function openAppointmentModal(appointmentId) {
  const apt = allAppointments.find(a => a.id === appointmentId);
  
  if (!apt) return;

  const modalBody = document.getElementById('modalBody');
  const statusSelect = document.getElementById('statusSelect');
  const updateStatusBtn = document.getElementById('updateStatusBtn');
  const deleteBtn = document.getElementById('deleteBtn');

  modalBody.innerHTML = `
    <p><strong>Nome:</strong> ${apt.clientName}</p>
    <p><strong>Telefone:</strong> ${apt.clientPhone}</p>
    ${apt.clientEmail ? `<p><strong>Email:</strong> ${apt.clientEmail}</p>` : ''}
    <p><strong>Serviço:</strong> ${apt.service}</p>
    <p><strong>Data:</strong> ${new Date(apt.appointmentDate).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p><strong>Hora:</strong> ${apt.appointmentTime}</p>
    ${apt.notes ? `<p><strong>Observações:</strong> ${apt.notes}</p>` : ''}
    <p><strong>Status Atual:</strong> <span class="status-badge status-${apt.status}">${apt.status}</span></p>
  `;

  statusSelect.value = apt.status;

  // Limpiar event listeners anteriores
  updateStatusBtn.replaceWith(updateStatusBtn.cloneNode(true));
  deleteBtn.replaceWith(deleteBtn.cloneNode(true));

  const newUpdateBtn = document.getElementById('updateStatusBtn');
  const newDeleteBtn = document.getElementById('deleteBtn');

  newUpdateBtn.addEventListener('click', async () => {
    await updateAppointmentStatus(apt.id, statusSelect.value);
  });

  newDeleteBtn.addEventListener('click', async () => {
    if (confirm('És seguro de que deseja cancelar este agendamento?')) {
      await deleteAppointment(apt.id);
    }
  });

  modal.style.display = 'block';
}

// Cerrar modal
function closeModal() {
  modal.style.display = 'none';
}

// Atualizar status de cita
async function updateAppointmentStatus(appointmentId, status) {
  try {
    const response = await fetch(`${API_BASE}/${appointmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    if (response.ok) {
      await loadAllAppointments();
      closeModal();
      alert('✅ Status atualizado');
    } else {
      alert('❌ Erro ao atualizar o status');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao atualizar');
  }
}

// Eliminar cita
async function deleteAppointment(appointmentId) {
  try {
    const response = await fetch(`${API_BASE}/${appointmentId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      await loadAllAppointments();
      closeModal();
      alert('✅ Agendamento cancelado');
    } else {
      alert('❌ Erro ao cancelar o agendamento');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao cancelar');
  }
}

// Buscar citas
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  
  if (!query) {
    document.getElementById('searchResults').innerHTML = '<p class="info-text">Insira critérios de busca</p>';
    return;
  }

  const results = allAppointments.filter(apt =>
    apt.clientName.toLowerCase().includes(query) ||
    apt.clientPhone.includes(query) ||
    (apt.clientEmail && apt.clientEmail.toLowerCase().includes(query))
  );

  const container = document.getElementById('searchResults');

  if (results.length === 0) {
    container.innerHTML = '<p class="info-text">Nenhum resultado encontrado</p>';
    return;
  }

  container.innerHTML = results.map(apt => createAppointmentCard(apt)).join('');
  addCardClickListeners();
}

// ==================== CONFIGURAÇÃO ====================

// Configurar página de configuração
async function setupConfigPage() {
  await loadConfigSettings();
  setupConfigTabs();
  setupConfigForms();
}

// Carregar configurações
async function loadConfigSettings() {
  try {
    const response = await fetch(`${API_BASE}/config/settings`);
    if (!response.ok) throw new Error('Erro ao carregar configurações');
    
    const settings = await response.json();
    populateConfigForms(settings);
    loadServices();
  } catch (err) {
    console.error('Erro ao carregar configurações:', err);
  }
}

// Preencher formulários com dados
function populateConfigForms(settings) {
  // Aba Informações Gerais
  if (document.getElementById('businessName')) document.getElementById('businessName').value = settings.businessName || '';
  if (document.getElementById('ownerPhone')) document.getElementById('ownerPhone').value = settings.ownerPhone || '';
  if (document.getElementById('ownerEmail')) document.getElementById('ownerEmail').value = settings.ownerEmail || '';

  // Aba Horários
  if (document.getElementById('mondayStart')) document.getElementById('mondayStart').value = settings.mondayStart || '09:00';
  if (document.getElementById('mondayEnd')) document.getElementById('mondayEnd').value = settings.mondayEnd || '17:00';
  if (document.getElementById('tuesdayStart')) document.getElementById('tuesdayStart').value = settings.tuesdayStart || '09:00';
  if (document.getElementById('tuesdayEnd')) document.getElementById('tuesdayEnd').value = settings.tuesdayEnd || '17:00';
  if (document.getElementById('wednesdayStart')) document.getElementById('wednesdayStart').value = settings.wednesdayStart || '09:00';
  if (document.getElementById('wednesdayEnd')) document.getElementById('wednesdayEnd').value = settings.wednesdayEnd || '17:00';
  if (document.getElementById('thursdayStart')) document.getElementById('thursdayStart').value = settings.thursdayStart || '09:00';
  if (document.getElementById('thursdayEnd')) document.getElementById('thursdayEnd').value = settings.thursdayEnd || '17:00';
  if (document.getElementById('fridayStart')) document.getElementById('fridayStart').value = settings.fridayStart || '09:00';
  if (document.getElementById('fridayEnd')) document.getElementById('fridayEnd').value = settings.fridayEnd || '17:00';
  if (document.getElementById('saturdayStart')) document.getElementById('saturdayStart').value = settings.saturdayStart || '10:00';
  if (document.getElementById('saturdayEnd')) document.getElementById('saturdayEnd').value = settings.saturdayEnd || '14:00';
  if (document.getElementById('sundayStart')) document.getElementById('sundayStart').value = settings.sundayStart || '';
  if (document.getElementById('sundayEnd')) document.getElementById('sundayEnd').value = settings.sundayEnd || '';
}

// Configurar abas de configuração
function setupConfigTabs() {
  const tabs = document.querySelectorAll('.config-tab');
  const contents = document.querySelectorAll('.config-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover clase active de todas
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Agregar clase active
      tab.classList.add('active');
      const tabName = tab.dataset.tab;
      document.getElementById(`${tabName}-tab`).classList.add('active');
    });
  });
}

// Configurar formularios
function setupConfigForms() {
  // Formulario Informações Gerais
  const generalForm = document.getElementById('generalConfigForm');
  if (generalForm) {
    generalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveGeneralSettings();
    });
  }

  // Formulario Horários
  const hoursForm = document.getElementById('hoursForm');
  if (hoursForm) {
    hoursForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await saveHours();
    });
  }

  // Formulario Servicios
  const serviceForm = document.getElementById('serviceForm');
  if (serviceForm) {
    serviceForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await createService();
    });
  }
}

// Guardar configuración general
async function saveGeneralSettings() {
  try {
    const data = {
      businessName: document.getElementById('businessName').value || 'Meu Negócio',
      ownerPhone: document.getElementById('ownerPhone').value || '',
      ownerEmail: document.getElementById('ownerEmail').value || '',
    };

    const response = await fetch(`${API_BASE}/config/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Erro ao salvar');
    alert('✅ Configurações salvas com sucesso!');
  } catch (err) {
    alert('❌ Erro ao salvar: ' + err.message);
  }
}

// Guardar horários
async function saveHours() {
  try {
    const data = {
      businessName: document.getElementById('businessName').value || 'Meu Negócio',
      ownerPhone: document.getElementById('ownerPhone').value || '',
      ownerEmail: document.getElementById('ownerEmail').value || '',
      mondayStart: document.getElementById('mondayStart').value,
      mondayEnd: document.getElementById('mondayEnd').value,
      tuesdayStart: document.getElementById('tuesdayStart').value,
      tuesdayEnd: document.getElementById('tuesdayEnd').value,
      wednesdayStart: document.getElementById('wednesdayStart').value,
      wednesdayEnd: document.getElementById('wednesdayEnd').value,
      thursdayStart: document.getElementById('thursdayStart').value,
      thursdayEnd: document.getElementById('thursdayEnd').value,
      fridayStart: document.getElementById('fridayStart').value,
      fridayEnd: document.getElementById('fridayEnd').value,
      saturdayStart: document.getElementById('saturdayStart').value,
      saturdayEnd: document.getElementById('saturdayEnd').value,
      sundayStart: document.getElementById('sundayStart').value,
      sundayEnd: document.getElementById('sundayEnd').value,
    };

    const response = await fetch(`${API_BASE}/config/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Erro ao salvar');
    alert('✅ Horários salvos com sucesso!');
  } catch (err) {
    alert('❌ Erro ao salvar: ' + err.message);
  }
}

// Carregar servicios
async function loadServices() {
  try {
    const response = await fetch(`${API_BASE}/services`);
    if (!response.ok) throw new Error('Erro ao carregar serviços');
    
    const services = await response.json();
    displayServices(services);
  } catch (err) {
    console.error('Erro:', err);
  }
}

// Mostrar servicios
function displayServices(services) {
  const list = document.getElementById('servicesList');
  
  // Si el elemento no existe, salir (tab no está visible aún)
  if (!list) return;
  
  if (!services || services.length === 0) {
    list.innerHTML = '<p class="info-text">Nenhum serviço cadastrado</p>';
    return;
  }

  list.innerHTML = services.map(service => `
    <div class="service-card">
      <div class="service-info">
        <h4>${service.name}</h4>
        <p>⏱ ${service.duration} minutos</p>

      </div>
      <div class="service-actions">
        <button class="btn-delete" onclick="deleteService(${service.id})">🗑 Deletar</button>
      </div>
    </div>
  `).join('');
}

// Crear nuevo servicios
async function createService() {
  try {
    const name = document.getElementById('serviceName').value;
    const duration = document.getElementById('serviceDuration').value;

    if (!name || !duration) {
      alert('❌ Preenchimento todos os campos');
      return;
    }

    const response = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, duration: parseInt(duration) })
    });

    if (!response.ok) throw new Error('Erro ao criar serviço');

    alert('✅ Serviço criado com sucesso!');
    document.getElementById('serviceForm').reset();
    loadServices();
  } catch (err) {
    alert('❌ Erro: ' + err.message);
  }
}

// Deletar servicios
async function deleteService(serviceId) {
  if (!confirm('Tem certeza que deseja deletar este serviço?')) return;

  try {
    const response = await fetch(`${API_BASE}/services/${serviceId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Erro ao deletar');

    alert('✅ Serviço deletado com sucesso!');
    loadServices();
  } catch (err) {
    alert('❌ Erro: ' + err.message);
  }
}

// ==================== LOGOUT ====================

// Função de logout
function logout() {
  // Limpar sesión
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminUsername');
  
  // Redirigir al login
  window.location.href = '/login.html';
}
