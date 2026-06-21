# 🚀 Guia de Instalação e Execução

## ⚠️ Requisitos Prévios

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 14 ou superior)
   - Baixe em: https://nodejs.org/
   - Verifique a instalação: `node --version` e `npm --version`

2. **Git** (opcional, mas recomendado)
   - Baixe em: https://git-scm.com/

## 📦 Instalação no Windows

### Opção 1: Usando o arquivo batch (Recomendado para Windows)

1. **Abra o Explorador de Arquivos**
2. **Navegue até a pasta do projeto** (Cucu/)
3. **Clique duplo em `instalar-dependencias.bat`**
4. Aguarde o término da instalação (será fechado automaticamente ou pressione uma tecla)

### Opção 2: Usando Command Prompt manualmente

1. **Abra Command Prompt (cmd.exe)**
2. **Navegue até a pasta do projeto:**
```cmd
cd C:\Users\yuli\Documents\Cucu\backend
```

3. **Instale as dependências:**
```cmd
npm install
```

### Opção 3: Usando PowerShell

1. **Abra PowerShell**
2. **Navegue até a pasta:**
```powershell
cd "C:\Users\yuli\Documents\Cucu\backend"
```

3. **Instale as dependências:**
```powershell
npm install
```

## 🎬 Executar o Servidor

### Opção 1: Usando o arquivo batch (Windows)

1. **Navegue até a pasta Cucu/**
2. **Clique duplo em `iniciar-servidor.bat`**
3. Você deverá ver uma mensagem como:
```
✅ Servidor executando em http://localhost:3000
📅 Painel de Admin: http://localhost:3000/admin.html
👤 Agendar Consulta: http://localhost:3000/index.html
```

### Opção 2: Manualmente pelo Command Prompt

1. **Abra Command Prompt**
2. **Navegue até a pasta backend:**
```cmd
cd C:\Users\yuli\Documents\Cucu\backend
```

3. **Inicie o servidor:**
```cmd
npm start
```

### Opção 3: Do VS Code

1. **Abra o VS Code na pasta Cucu**
2. **Abra um Terminal integrado** (Ctrl + `)
3. **Navegue até o backend:**
```bash
cd backend
```

4. **Instale as dependências (se não tiver instalado):**
```bash
npm install
```

5. **Inicie o servidor:**
```bash
npm start
```

## 🌐 Acessar o Sistema

Após o servidor estar em execução, abra seu navegador em:

### 📝 Para Clientes - Agendar Consulta
```
http://localhost:3000/
```
Ou
```
http://localhost:3000/index.html
```

### 📊 Para Administradores - Ver Agenda
```
http://localhost:3000/admin.html
```

## 🔧 Solução de Problemas

### ❌ "npm não é reconhecido como comando interno"
**Solução**: Node.js não está instalado corretamente
1. Desinstale Node.js completamente
2. Baixe e instale a versão LTS em https://nodejs.org/
3. Reinicie seu computador
4. Tente novamente

### ❌ "Porta 3000 já está em uso"
**Solução**: Outro programa está usando a porta 3000
- Opção 1: Feche o outro programa
- Opção 2: Modifique a porta em `backend/server.js` (procure por `PORT = 3000`)

### ❌ "Erro: Não é possível encontrar o módulo 'express'"
**Solução**: As dependências não foram instaladas corretamente
```cmd
cd backend
npm install
```

### ❌ "Erro ao conectar ao SQLite"
**Solução**: Problema de permissões
1. Tente executar Command Prompt como administrador
2. Navegue até a pasta backend
3. Execute `npm install` novamente

## ✅ Verificar que tudo funciona

1. Abra seu navegador em `http://localhost:3000`
2. Você deverá ver a página "Agende Sua Consulta"
3. Preencha um formulário de teste
4. Clique em "Agendar Consulta"
5. Navegue até `http://localhost:3000/admin.html`
6. Você deverá ver seu agendamento no painel de administração

## 🛑 Parar o Servidor

- **No Windows (batch)**: Feche a janela ou pressione `Ctrl + C`
- **No Command Prompt/PowerShell**: Pressione `Ctrl + C` e confirme com `Y`
- **No VS Code**: Pressione `Ctrl + C` no terminal integrado

## 📚 Documentação Adicional

Para mais detalhes sobre o projeto, consulte:
- [README.md](README.md) - Descrição geral do projeto
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Instruções técnicas

## 💡 Dicas Úteis

1. **Acesso rápido**: Salve os URLs em seus favoritos do navegador
2. **Testes**: A página do cliente e o painel do admin compartilham o mesmo banco de dados
3. **Desenvolvimento**: Se editar código em JavaScript, atualize o navegador para ver as mudanças
4. **Dados**: Os agendamentos são salvos em `backend/appointments.db`

## 🆘 Se ainda tiver problemas

1. Verifique se Node.js e npm estão corretamente instalados
2. Certifique-se de estar na pasta correta
3. Tente remover a pasta `node_modules` e execute `npm install` novamente
4. Reinicie seu computador
5. Verifique se não há erros de digitação nos comandos

---

Aproveite o sistema de gestão de agendamentos! 🎉
