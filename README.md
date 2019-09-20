# dccTalks

<h3>Equipe</h3>

Diego Barros</br>
Marcel Henrique</br>
Pedro Thomas</br>
Rafael Pardini</br></br>

<h3>Descrição:</h3>
O objetivo do grupo é construir um chat para membros do DCC. A aplicação terá uma interface web, na qual qualquer pessoa com uma conta no DCC poderá fazer login de forma segura e utilizar o canal principal (aberto) para conversar sobre o que desejar, se informar sobre os mais recentes eventos do departamento ou sobre novas vagas de estágio. Além disso, será possível formar grupos privados, facilitando por exemplo a discussão de trabalhos práticos em grupo, o compartilhamento de materiais de estudo e, é claro, as conversas cotidianas com os colegas. O chat terá as funcionalidades de enviar e deletar mensagens de texto, enviar e deletar arquivos, criar e deletar canais privados, adicionar e deletar membros aos canais, editar o "apelido" do usuário, a foto de perfil e a biografia.

<h3>Tecnologias:</h3>
<ul>
<li>Backend - Node.js</li>
<li>Frontend - React</li>
<li>Dados dos usuários - banco SQL</li>
<li>Dados dos chats - a decidir</li>
</ul>

<h3>Estórias:</h3>
<ul>
<li>Fazer interface web - 3 story points</li>
<li>Fazer backend do servidor - 5 story points</li>
<li>Fazer backend do cliente - 5 story points</li>
<li>Autenticar com o servidor do DCC (ldap.dcc.ufmg.br) - 3 story points</li>
<li>Adicionar Funcionalidades para os usuários</li>
</ul>

<h3>Tarefas:</h3>
<ul>
<li>Autenticar com o servidor do DCC (ldap.dcc.ufmg.br) - Rafael Pardini</li>
<ul>
<li>Escolher dentre os módulos de autenticação disponíveis, qual será utilizado</li>
<li>Estudar a documentação do módulo</li>
<li>Escrever um código muito simples que utilize a autenticação para testes</li>
<li>Ajustar o código e colocar em produção</li>
</ul></br>
<li>Backend do Servior - Marcel Mendes</li>
<ul>
<li>Criar servidor http e definir os caminhos que serão acessados pelo cliente.</li>
<li>Criar módulo de recebimento de mensagens</li>
<li>Criar módulo de repasse de mensagem (via broadcast)</li>
<li>Atualizar lista de usuários</li>
<li>Armazenar mensagens</li>
<li>Adicionar suporte para nicknames</li>
<li>Integrar/sincronizar servidor a outros módulos da aplicação </li>
</ul></br>
<li>Fazer backend do cliente - Pedro Thomas</li>
<ul>
<li>Criar interface para o módulo de autenticação.</li>
<li>Armazenar sessão.</li>
<li>Criar módulo para comunicação com o backend do servidor.</li>
<li>Fazer o carregamento de componentes da interface web dinamicamente.</li>
<li>Integrar com os outros módulos da aplicação.</li>
</ul>
</ul>

<h3>Planilha de horas trabalhadas:</h3>
https://docs.google.com/spreadsheets/d/1LkTBOFhggMkR51647JvbGOqAns9imvd4gFM-OkqZy5I/edit?usp=sharing</br>
