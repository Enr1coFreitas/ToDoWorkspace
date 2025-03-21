# ToDo Workspace

Um aplicativo web para gerenciamento de tarefas, onde os usuários podem criar, organizar e acompanhar suas atividades diárias.

## ✨ Funcionalidades Principais

- **Gerenciamento Completo de Tarefas:**
  - Listagem de todas as tarefas
  - Criação de novas tarefas
  - Edição de tarefas existentes
  - Exclusão de tarefas
  - Adição de descrições detalhadas
  - Definição de datas de vencimento

- **Recursos Especiais:**
  - Frases motivacionais personalizadas de acordo com o dia da semana
  - GIFs temáticos relacionados (integração com API do Giphy)

## 🔗 Acesso ao Projeto

O projeto está disponível em: [ToDo Workspace](https://to-do-workspace.vercel.app/login)

## 🚀 Tecnologias Utilizadas

### Frontend
- React.js (v19.0.0)
- React Router DOM para navegação
- Bootstrap 5 para estilização
- Axios para requisições HTTP
- Date-fns para manipulação de datas
- Crypto-js para criptografia

### Backend
- Laravel (v8.75)
- PHP (^7.3|^8.0)
- Laravel Sanctum para autenticação
- Laravel CORS para gerenciamento de Cross-Origin Resource Sharing

## 💻 Infraestrutura
- Frontend hospedado na Vercel
- Backend hospedado no Heroku

## 🌟 Ambiente de Produção

O projeto está em produção e pode ser acessado diretamente através do Vercel, sem necessidade de configuração local:
- Frontend: [ToDo Workspace](https://to-do-workspace.vercel.app/login)
- Backend: Hospedado no Heroku

## 🛠️ Ambiente de Desenvolvimento:

O projeto foi desenvolvido utilizando:
- Linux (Ubuntu)
- Terminal Warp
- Docker

## 🔧 Configuração do Projeto

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
composer install
php artisan serve
```

## 🌐 Variáveis de Ambiente

### Frontend (.env)
```
REACT_APP_API_URL=url_do_backend
```

### Backend (.env)
```
DB_CONNECTION=mysql
DB_HOST=seu_host
DB_PORT=3306
DB_DATABASE=seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

CORS_ALLOWED_ORIGINS=url_do_frontend
```
