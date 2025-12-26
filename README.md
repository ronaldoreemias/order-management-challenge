<h1>Projeto para o processo seletivo<h1>
<p>Ronaldo <p>
<br/>
---
<h2> Dependências instaladas</h2>

<ul>
  <li><b>bcrypt</b> → criptografia de senhas (hash)</li>
  <li><b>jsonwebtoken</b> → autenticação via JWT</li>
  <li><b>mongoose</b> → conexão e modelagem com MongoDB Atlas</li>
  <li><b>express</b> → framework web para rotas e middlewares</li>
  <li><b>cors</b> → habilitar requisições externas (CORS)</li>
  <li><b>dotenv</b> → gerenciamento de variáveis de ambiente</li>
</ul>
---
<br/>
<h2> Estrutura de pastas</h2>

<ul>
  <li><b>src/</b> → código fonte principal
    <ul>
      <li><b>models/</b> → Schemas do Mongoose (User.ts, Order.ts)</li>
      <li><b>routes/</b> → Rotas da API (auth.ts, orders.ts)</li>
      <li><b>middlewares/</b> → Middlewares (auth.ts para validar JWT)</li>
      <li><b>services/</b> → Regras de negócio (orderService.ts)</li>
      <li><b>utils/</b> → Funções auxiliares (jwt.ts)</li>
      <li><b>app.ts</b> → configuração principal do Express e MongoDB</li>
    </ul>
  </li>
  <li><b>tests/</b> → testes unitários com Vitest (orderState.test.ts)</li>
  <li><b>.env</b> → variáveis de ambiente (PORT, MONGO_URI, JWT_SECRET)</li>
  <li><b>tsconfig.json</b> → configuração do TypeScript</li>
  <li><b>package.json</b> → dependências e scripts</li>
  <li><b>README.md</b> → documentação do projeto</li>
</ul>

<h2> Lógica de segurança nas verificações</h2>

pensei em criar um array simples para verificar cada entrada : 
 <br/>

 <p> const suspeita = [ '$', '!', '{', '[', '/', '%', '(', ')', '<', '&', '?']; <p>

 <br/>
eu defino em outro array as váriaveis que quero
 const campos = [ email, password];

<br/>
ai eu uso o for para verificar
    for (const campo of campos) {
    //se achar algo 
        if (suspeita.some(char => campo.includes(char))) {
        //retorna o status
        return res.status(400).json({ 
            mensagem: "Entrada suspeita detectada" 
        });
    }
    }
<br/>

<h3>O que isso garante as minhas seguranças ?<h3>

Bloqueia tentativas de injeção simples (SQL/NoSQL injection, XSS).

Fácil de expandir: basta adicionar novos caracteres ao array suspeita.

---
<h2>Como rodar o projeto<h2>

1- Clonar o repositório

git clone <link-do-repositorio> cd backend-2-ts

<br/>

2- Instalar dependências

npm install

<br/>

3- Configurar variáveis de ambiente


PORT=4000    MONGO_URI=sua_string_de_conexao_do_mongodb_atlas    JWT_SECRET=um_segredo_seguro


<br/>

<h2>Fluxo da API<h2>

<br/>

<ul>
    <li><b>POST /auth/cadastro</b> → cadastro de usuário</li>
    <li><b>POST /auth/login</b> → login e retorno de JWT</li>
    <li><b>POST /orders</b> → criação de pedido (protegido por JWT)</li>
    <li><b>GET /orders</b> → listagem com paginação e filtro por state</li>
    <li><b>PATCH /orders/:id/advance</b> → avançar estado do pedido (CREATED → ANALYSIS → COMPLETED)</li>
<ul>