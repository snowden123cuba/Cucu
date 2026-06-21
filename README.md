# 📅 Sistema de Controle de Agendamentos

Um sistema web completo para gestão de reservas de agendamentos em barbearias, centros de estética, consultórios médicos ou oficinas mecânicas.

## 🎯 Características

### 👤 Para Clientes
- ✅ Interface intuitiva para ver disponibilidade de agendamentos
- ✅ Agendamento de consultas com seleção de data e hora
- ✅ Múltiplos serviços disponíveis com preços
- ✅ Sistema de confirmação automática
- ✅ Responsivo em dispositivos móveis

### 📊 Para Administradores
- ✅ Painel de controle com visualização de agendamentos do dia
- ✅ Visualização de todos os agendamentos registrados
- ✅ Busca avançada de clientes
- ✅ Gerenciamento de status de agendamentos (confirmado, concluído, cancelado)
- ✅ Estatísticas em tempo real
- ✅ Cancelamento de agendamentos

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Backend**: Node.js, Express.js
- **Base de Dados**: SQLite3
- **Gerenciamento de Dependências**: npm

## 📁 Estrutura do Projeto

```
Cucu/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── init.js              # Inicialização de BD
│   │   ├── routes/
│   │   │   └── appointments.js      # APIs de agendamentos
│   │   └── app.js                   # Configuração Express
│   ├── package.json
│   └── server.js                    # Ponto de entrada
├── frontend/
│   ├── client/
│   │   ├── index.html               # Página de agendamentos
│   │   ├── style.css                # Estilos cliente
│   │   └── script.js                # Lógica cliente
│   └── admin/
│       ├── admin.html               # Painel administrador
│       ├── admin.css                # Estilos admin
│       └── admin.js                 # Lógica admin
├── README.md
└── .github/
    └── copilot-instructions.md
```

## 🚀 Instalação e Configuração

### Requisitos Prévios
- Node.js 14+ instalado
- npm ou yarn

### Passos de Instalação

1. **Navegue para a pasta do backend**
```bash
cd backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor**
```bash
npm start
```

O servidor será executado em `http://localhost:3000`

## 📝 Uso do Sistema

### 🌐 Página de Agendamentos (Cliente)
- **URL**: http://localhost:3000/
- **Ações**:
  1. Preencha o formulário com seus dados pessoais
  2. Selecione o serviço desejado
  3. Escolha a data (a partir de hoje)
  4. Selecione a hora disponível
  5. Adicione observações opcionais
  6. Confirme o agendamento

### 📊 Painel de Administração
- **URL**: http://localhost:3000/admin.html
- **Funcionalidades**:
  - **Agendamentos de Hoje**: Ver todos os agendamentos programados para o dia atual
  - **Todos os Agendamentos**: Filtrar por data e status
  - **Buscar Agendamento**: Buscar por nome, telefone ou email do cliente
  - **Atualizar Status**: Alterar status do agendamento (confirmado, concluído, cancelado)
  - **Cancelar Agendamento**: Eliminar um agendamento do sistema

## 🔌 API RESTful

### Endpoints Disponíveis

#### Obter todos os agendamentos
```
GET /api/appointments
```

#### Obter agendamentos de um dia específico
```
GET /api/appointments/day/:date
```

#### Criar novo agendamento
```
POST /api/appointments
Content-Type: application/json

{
  "clientName": "João Silva",
  "clientPhone": "+55 11 99999-9999",
  "clientEmail": "joao@exemplo.com",
  "service": "Corte de Cabelo",
  "appointmentDate": "2024-12-25",
  "appointmentTime": "10:00",
  "notes": "Preferência de corte"
}
```

#### Obter serviços disponíveis
```
GET /api/appointments/services
```

#### Obter horários disponíveis
```
GET /api/appointments/available/:date
```

#### Atualizar status de agendamento
```
PUT /api/appointments/:id
Content-Type: application/json

{
  "status": "concluído"
}
```

#### Cancelar agendamento
```
DELETE /api/appointments/:id
```

## 🎨 Personalização

### Alterar Serviços
Os serviços estão em `backend/src/db/init.js`. Modifique a função `init()` para adicionar seus próprios serviços:

```javascript
await dbRun(`INSERT INTO services (name, duration, price) VALUES (?, ?, ?)`, 
  ['Seu Serviço', 30, 25.00]
);
```

### Personalizar Horários
Em `backend/src/routes/appointments.js`, modifique a rota `/available/:date` para alterar os horários disponíveis (atualmente 9:00-17:00).

### Alterar Estilo e Cores
- **Cliente**: Edite frontend/client/style.css
- **Admin**: Edite frontend/admin/admin.css

## 🐛 Solução de Problemas

### O servidor não inicia
- Verifique se Node.js está instalado: `node --version`
- Verifique se todas as dependências estão instaladas: `npm install` na pasta backend
- Certifique-se de que a porta 3000 não está em uso

### Os agendamentos não são salvos
- Verifique se SQLite3 está corretamente instalado
- Verifique se há permissões de escrita na pasta backend
- Revise o console do servidor para mensagens de erro

### Frontend não carrega estilos
- Limpe o cache do navegador (Ctrl+F5 ou Cmd+Shift+R)
- Verifique se os arquivos CSS estão nos caminhos corretos

## 📈 Funcionalidades Futuras

- [ ] Autenticação de administrador
- [ ] Notificações por email ou SMS
- [ ] Histórico de clientes
- [ ] Sistema de comentários e avaliações
- [ ] Sincronização com calendário (Google Calendar, Outlook)
- [ ] Exportar relatório de agendamentos em PDF
- [ ] Sistema de pagamentos integrado

## 📄 Licença

MIT License - Livre para usar e modificar

## 👨‍💻 Autor

Desenvolvido como solução web para gestão de agendamentos.

## 📞 Suporte

Para relatar erros ou sugestões, revise a documentação ou entre em contato com a equipe de desenvolvimento.

---

**Obrigado por usar o Sistema de Controle de Agendamentos!** 🎉
