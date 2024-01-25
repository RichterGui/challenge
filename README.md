# Desafio

- Passos para rodar as aplicações

- 1 passo, entrar no diretório back, que refere-se a api Nest, partindo do root, podemos usar o comando unix, `cd back`, para entrar no diretório, e então `npm install` para instalarmos os pacotes do node, após isso podemos rodar a aplicação com o comando `npm start` ou `npm run start`, o mesmo deverá rodar na porta 3000. MUITO IMPORTANTE, DEVE SE MODIFICAR O ARQUIVO EXAMPLE.ENV PARA COM UM LINK VALIDO DE CONEXÃO DE UM BANCO MONGO DB, CASO CONTRÁRIO A APLICAÇÃO NÃO IRÁ FUNCIONAR, APÓS INSERIR UM LINK VÁLIDO, O ARQUIVO DEVE SER RENOMEADO PARA .ENV SOMENTE.

- 2 passo, novamente no diretório root (caso esteja em outro diretório rodamos o comando `cd ..` para voltarmos um level), usamos o comando `cd data-process` para entrarmos no diretório do script golang que seria o scrapper, porém também tem uma api para comunicação com os outros serviços, no diretório data-process, rodamos o comando `go mod tidy` para baixar os pacotes necessários e após completo, rodamos o comando `go run main.go` para inicializarmos a api, a mesma deverá rodar na porta 8080.

- 3 por fim, partindo da pasta root, usamos o comando `cd front` para acessarmos o diretório do client side do nosso projeto, e então rodamos o comando `npm install`, e depois podemos rodar o comando `npm start` para inicializar o projeto, o mesmo deverá rodar na porta 3005.

- Após esses 3 passos, o usuário poderá preencher o formulario, que irá ativar o scrapper, que por sua vez enviará os dados para o backend que os salvará no banco de dados, assim alimentando o frontend com dados, se nada mudar na página, pode dar um f5 que os dados irão aparecer no seu determinado componente.

- obs\* Ao desenvolver o scrapper no google.com, tive meu ip bloqueado, o que é um tanto quando normal quando se trabalha com tal prática, porém devido as regras da plataforma decidi não continuar com o scrapper no google, pois vai de contra as regras impostas pela plataforma. porém para meios de curiosidade, tais eventos poderiam ser remediados com proxys, tanto com alguma estratégia no código, quando também usando aluns serviços disponíveis na web, como o scrapping ant, por exemplo, e outros frameworks para scrapping oferecem algumas alternativas e subterfúgios para tal, como o caso do puppeteer stealth, que é um plugin do puppeteer (javascript). Por dadas rasões encontrei um site no qual o propósito é o scrapping, e dele que pego os dados para tal, foi minha maneira de concluir o desafio após minha decisão de não continuar com a automação no goole.
