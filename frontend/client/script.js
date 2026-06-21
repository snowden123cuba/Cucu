const API_BASE = '/api/appointments';

// Elementos do formulário
const form = document.getElementById('appointmentForm');
const clientNameInput = document.getElementById('clientName');
const clientPhoneInput = document.getElementById('clientPhone');
const clientEmailInput = document.getElementById('clientEmail');
const serviceSelect = document.getElementById('service');
const dateInput = document.getElementById('appointmentDate');
const timeGrid = document.getElementById('timeGrid');
const appointmentTimeInput = document.getElementById('appointmentTime');
const notesInput = document.getElementById('notes');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

// Variáveis
let services = [];
let selectedTime = null;

// Inicializar
document.addEventListener('DOMContentLoaded', async () => {
  // Estabelecer data mínima como hoje
  const today = new Date();
  today.setDate(today.getDate());
  dateInput.min = today.toISOString().split('T')[0];
  
  // Carregar serviços
  await loadServices();
  
  // Event listeners
  serviceSelect.addEventListener('change', handleServiceChange);
  dateInput.addEventListener('change', handleDateChange);
  form.addEventListener('submit', handleFormSubmit);
  
  // Atualizar resumo quando o formulário muda
  [clientNameInput, clientPhoneInput, serviceSelect, dateInput, appointmentTimeInput].forEach(el => {
    el.addEventListener('change', updateSummary);
  });
});

// Carregar serviços desde API
async function loadServices() {
  try {
    const response = await fetch(`${API_BASE}/services`);
    services = await response.json();
    
    // Preencher seleção de serviços
    services.forEach(service => {
      const option = document.createElement('option');
      option.value = service.name;
      option.textContent = `${service.name}`;
      option.dataset.duration = service.duration;
      serviceSelect.appendChild(option);
    });
  } catch (err) {
    showMessage('Erro ao carregar serviços', 'error');
    console.error(err);
  }
}

// Manejar cambio de servicio
function handleServiceChange(e) {
  const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
  
  if (selectedOption.value) {
    const duration = selectedOption.dataset.duration;
    const price = selectedOption.dataset.price;
    
    document.getElementById('serviceDuration').textContent = duration;
    document.getElementById('servicePrice').textContent = `R$ ${parseFloat(price).toFixed(2)}`;
    document.getElementById('serviceDetails').style.display = 'block';
  } else {
    document.getElementById('serviceDetails').style.display = 'none';
  }
  
  updateSummary();
}

// Manejar cambio de fecha
async function handleDateChange(e) {
  const selectedDate = dateInput.value;
  selectedTime = null;
  appointmentTimeInput.value = '';
  
  if (!selectedDate) {
    timeGrid.innerHTML = '<p class="info-text">Selecione uma data válida</p>';
    return;
  }
  
  try {
    const response = await fetch(`${API_BASE}/available/${selectedDate}`);
    const availableTimes = await response.json();
    
    timeGrid.innerHTML = '';
    
    availableTimes.forEach(slot => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `time-slot ${slot.available ? 'available' : 'disabled'}`;
      button.textContent = slot.time;
      button.disabled = !slot.available;
      
      if (slot.available) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          selectTime(button, slot.time);
        });
      }
      
      timeGrid.appendChild(button);
    });
  } catch (err) {
    timeGrid.innerHTML = '<p class="info-text">Erro ao carregar horários</p>';
    console.error(err);
  }
  
  updateSummary();
}

// Seleccionar hora
function selectTime(button, time) {
  // Remover seleção anterior
  document.querySelectorAll('.time-slot.selected').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Seleccionar nova hora
  button.classList.add('selected');
  selectedTime = time;
  appointmentTimeInput.value = time;
  
  updateSummary();
}

// Atualizar resumo
function updateSummary() {
  const summary = document.getElementById('reservationSummary');
  
  let html = '<strong>Seu Agendamento:</strong><br>';
  
  if (clientNameInput.value) {
    html += `👤 ${clientNameInput.value}<br>`;
  }
  
  if (clientPhoneInput.value) {
    html += `📱 ${clientPhoneInput.value}<br>`;
  }
  
  if (serviceSelect.value) {
    const selected = serviceSelect.options[serviceSelect.selectedIndex];
    html += `✨ ${serviceSelect.value}<br>`;
  }
  
  if (dateInput.value) {
    html += `📅 ${new Date(dateInput.value).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>`;
  }
  
  if (selectedTime) {
    html += `⏰ ${selectedTime}<br>`;
  }
  
  if (html === '<strong>Seu Agendamento:</strong><br>') {
    html = 'Por favor, preencha o formulário acima';
  }
  
  summary.innerHTML = html;
}

// Manejar envío del formulario
async function handleFormSubmit(e) {
  e.preventDefault();
  
  // Validaciones
  if (!clientNameInput.value || !clientPhoneInput.value || !serviceSelect.value || !dateInput.value || !selectedTime) {
    showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processando...';
  
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clientName: clientNameInput.value,
        clientPhone: clientPhoneInput.value,
        clientEmail: clientEmailInput.value || null,
        service: serviceSelect.value,
        appointmentDate: dateInput.value,
        appointmentTime: selectedTime,
        notes: notesInput.value || ''
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage(`✅ Consulta agendada com sucesso! ID: ${data.appointmentId}`, 'success');
      form.reset();
      timeGrid.innerHTML = '<p class="info-text">Selecione uma data</p>';
      document.getElementById('serviceDetails').style.display = 'none';
      selectedTime = null;
      updateSummary();
      
      // Descer para ver a mensagem
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showMessage(`❌ ${data.error || 'Erro ao agendar consulta'}`, 'error');
    }
  } catch (err) {
    showMessage('Erro ao processar a solicitação', 'error');
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Agendar Consulta';
  }
}

// Mostrar mensaje
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  
  // Ocultar automáticamente después de 5 segundos
  setTimeout(() => {
    if (type === 'success') {
      messageDiv.className = 'message';
    }
  }, 5000);
}
