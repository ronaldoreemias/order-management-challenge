<h1>Projeto para o proccesso seletivo<h1>
<p>Ronaldo <p>
<br/>

<h2> Dependências instaladas</h2>

<ul>
  <li><b>bcrypt</b> → criptografia de senhas (hash)</li>
  <li><b>jsonwebtoken</b> → autenticação via JWT</li>
  <li><b>mongoose</b> → conexão e modelagem com MongoDB Atlas</li>
  <li><b>express</b> → framework web para rotas e middlewares</li>
  <li><b>cors</b> → habilitar requisições externas (CORS)</li>
  <li><b>dotenv</b> → gerenciamento de variáveis de ambiente</li>
</ul>
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
