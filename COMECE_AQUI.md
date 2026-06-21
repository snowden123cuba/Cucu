# 🚀 COMECE AQUI - Sistema de Agendamentos para Brasil

Bem-vindo! Este é um sistema completo de agendamentos online. Siga os passos abaixo para começar.

## ⚡ Instalação Rápida (3 passos)

### 1️⃣ Instale Node.js
- Baixe em: **https://nodejs.org/** (versão LTS recomendada)
- Instale e reinicie seu computador

### 2️⃣ Instale as dependências
Abra **Command Prompt** (ou PowerShell) e execute:

```bash
cd C:\Users\yuli\Documents\Cucu\backend
npm install
```

Ou clique duplo em **`instalar-dependencias.bat`** na pasta Cucu/

### 3️⃣ Inicie o servidor
```bash
npm start
```

Ou clique duplo em **`iniciar-servidor.bat`** na pasta Cucu/

## 🌐 Acesse o Sistema

Após ver "Servidor executando em http://localhost:3000", abra seu navegador:

| Quem | Link | O que faz |
|-----|------|-----------|
| **Cliente** | http://localhost:3000 | Agendar Consulta |
| **Admin** | http://localhost:3000/admin.html | Ver Agenda |

## ❓ Problemas Comuns

**P: Dá erro "npm não encontrado"**
- A: Você esqueceu de instalar Node.js. Faça download em https://nodejs.org/ e reinicie o PC.

**P: Porta 3000 já em uso**
- A: Abra outro Command Prompt e execute `netstat -ano | findstr :3000` para encontrar o processo

**P: Não consegue clicar em um agendamento no admin**
- A: Primeiro, crie um agendamento na página do cliente para ter dados

## 📖 Documentação Completa

- **Guia Detalhado**: Veja [INSTALACION.md](INSTALACION.md)
- **Descrição Técnica**: Veja [README.md](README.md)

## 🎯 Principais Funcionalidades

✅ Clientes podem agendar consultas
✅ Escolher serviço, data e hora
✅ Painel admin para gerenciar agendamentos  
✅ Cancelar ou alterar status de agendamentos
✅ Buscar clientes por nome, email ou telefone
✅ Responsive (funciona em celulares e tablets)

## 🛠️ Personalização

### Alterar Serviços
Abra `backend/src/db/init.js` e procure por:
```javascript
await dbRun(`INSERT INTO services (name, duration, price) VALUES (?, ?, ?)`, 
  ['Corte de Cabelo', 30, 15.00]
);
```

Adicione seus próprios serviços seguindo este padrão.

### Alterar Cores
- Cliente: Edite `frontend/client/style.css`
- Admin: Edite `frontend/admin/admin.css`

### Alterar Horários
Em `backend/src/routes/appointments.js`, procure por `for (let hour = 9; hour < 17; hour++)` e altere os horários.

## 💾 Seus Dados

Os agendamentos são salvos em `backend/appointments.db`

## 🆘 Precisa de Ajuda?

1. Verifique se Node.js está instalado: `node --version`
2. Verifique se npm está instalado: `npm install`
3. Procure mais detalhes em [INSTALACION.md](INSTALACION.md)

---

**Pronto para começar?** Execute `npm install` na pasta backend e depois `npm start`! 🚀
