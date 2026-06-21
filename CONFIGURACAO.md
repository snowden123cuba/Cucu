# Guia de Configuração do Sistema

## 📋 Visão Geral

O painel de configuração permite que o proprietário do negócio personalize todos os aspectos do sistema de agendamientos sem precisar editar código.

## ⚙️ Acessar as Configurações

1. Abra o painel de administração: http://localhost:3000/admin.html
2. Clique em **⚙️ Configurações** no menu lateral esquerdo
3. Você verá três abas: **Informações Gerais**, **Serviços** e **Horários**

---

## 1️⃣ Informações Gerais

Nesta aba você pode configurar os dados principais do negócio.

### Campos:
- **Nome do Negócio** (ex: "Barbearia do João")
  - Aparece no painel admin e em notificações
  - Campo obrigatório

- **Telefone do Proprietário** (ex: "+55 11 9999-9999")
  - Telefone de contato do dono
  - Pode ser usado para enviar confirmações (expansão futura)

- **Email do Proprietário** (ex: "proprietario@negocio.com")
  - Email de contato do dono
  - Pode ser usado para notificações

### Como usar:
1. Preencha os campos com as informações do seu negócio
2. Clique em **Salvar Configurações**
3. Você verá uma mensagem de sucesso: ✅ Configurações salvas com sucesso!

---

## 2️⃣ Serviços

Aqui você gerencia os serviços oferecidos pelo seu negócio.

### Criar Novo Serviço:
1. Preencha os três campos:
   - **Nome do Serviço** (ex: "Corte de Cabelo", "Barba", "Coloração")
   - **Duração em minutos** (ex: 30, 20, 45)
   - **Preço em R$** (ex: 25.00, 15.50)

2. Clique em **Adicionar Serviço**
3. O serviço aparecerá na lista abaixo

### Visualizar Serviços:
- Todos os serviços cadastrados aparecem em cards
- Cada card mostra:
  - ✨ Nome do serviço
  - ⏱ Duração em minutos
  - 💰 Preço em reais

### Deletar Serviço:
1. Encontre o serviço que deseja remover
2. Clique no botão **🗑 Deletar**
3. O serviço será removido imediatamente

⚠️ **Aviso**: Ao deletar um serviço, todos os agendamientos associados a ele ainda serão mantidos com a informação do serviço anterior.

---

## 3️⃣ Horários

Configure os horários de funcionamento do seu negócio para cada dia da semana.

### Dias da Semana:
Você pode definir horários diferentes para cada dia:

- **Segunda-feira até Sexta-feira**
  - Padrão: 09:00 até 17:00

- **Sábado**
  - Padrão: 10:00 até 14:00

- **Domingo**
  - Por padrão: Fechado (deixar em branco)
  - Se deixar em branco, o negócio estará fechado neste dia

### Como usar:
1. Para cada dia, defina:
   - Horário de abertura (ex: 09:00)
   - Horário de fechamento (ex: 17:00)

2. Se desejar que o negócio esteja **fechado** em um dia, deixe ambos os campos **em branco**

3. Clique em **Salvar Horários**

4. Você verá: ✅ Horários salvos com sucesso!

### Exemplos:
```
Segunda a Sexta:
  ├─ Início: 09:00
  └─ Fim: 17:00

Sábado:
  ├─ Início: 10:00
  └─ Fim: 14:00

Domingo:
  ├─ Deixar em branco (FECHADO)
```

---

## 🔄 Como os Dados Afetam o Sistema

### Serviços
- Aparecem no **formulário de reservas** do cliente
- O cliente seleciona um serviço para definir a duração e preço
- O horário disponível muda baseado na duração do serviço

### Informações Gerais
- **Nome do Negócio**: Usado em futuros email/SMS de confirmação
- **Telefone do Proprietário**: Pode ser exibido em confirmações
- **Email do Proprietário**: Para enviar notificações de novos agendamientos

### Horários
- Definem **quais datas estão disponíveis** para agendamientos
- Se o negócio estiver fechado em um dia, esse dia não aparecerá como disponível no cliente
- Se alterar para fechar um dia que tinha agendamientos, esses agendamientos permanecem válidos mas novos não poderão ser criados nesse dia

---

## 💾 Salvando as Configurações

Cada aba tem um botão **Salvar** independente:
- Informações Gerais → Salva dados do proprietário
- Horários → Salva os horários de funcionamento
- Serviços → Adiciona/Remove serviços (não precisa salvar a aba inteira)

Todas as configurações são salvas **automaticamente no banco de dados** e persistem mesmo quando o servidor é reiniciado.

---

## ❌ Resetar Configurações

Se precisar voltar aos valores padrão:
1. Delete o banco de dados: `backend/appointments.db`
2. Reinicie o servidor
3. Um novo banco de dados será criado com valores padrão

Valores padrão:
- Nome: "Meu Negócio"
- Telefone: vazio
- Email: vazio
- Serviços: 3 serviços pré-cadastrados (Corte, Barba, Corte+Barba)
- Horários: 09:00-17:00 de seg-sex, 10:00-14:00 sábado, domingo fechado

---

## 📞 Suporte

Se tiver dúvidas sobre como usar o painel de configuração:
1. Verifique se o servidor está rodando (http://localhost:3000)
2. Certifique-se de estar acessando o painel admin (http://localhost:3000/admin.html)
3. Tente recarregar a página (F5)
4. Verifique o console do navegador para mensagens de erro (F12)
