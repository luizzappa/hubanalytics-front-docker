# MVP Sprint PUC-Rio - Engenharia de Software

Esse repositório contém o `frontend` do terceiro MVP para a pós-graduação em Engenharia de Software da PUC-Rio. Ele foi desenvolvindo em `Typescript` utilizando a biblioteca `React` e `Bootstrap` para o layout.

Nesse projeto criei um catálogo de dashboards, utilizando a técnica de infinite scroll para que todos os itens não sejam carregados ao mesmo tempo, prejudicando a performance e o tempo de abertura da página. Ao chegar ao final da página, uma nova requisição ao `backend` retorna mais itens e assim por diante.

![hub-puc](https://user-images.githubusercontent.com/65685842/236071055-67ba59d8-54dc-4ec8-93b5-ab27e7d74f07.gif)

## Arquitetura

Nesse projeto utilizo a componentização em que cada microserviço é uma componente separada, o que permite ser escalada, implantada e desenvolvida de maneira independente.

Foram utilizados três componentes denominados A, B e C. Sendo que:

![image](https://github.com/luizzappa/hubanalytics-front-docker/assets/65685842/225f416e-108b-426f-99c3-3495d96f31bd)

**Componente A**: frontend da aplicação desenvolvido em react. É o código desse projeto.

**Componente B**: API do [TextRazor](https://www.textrazor.com/) para extração de palavras-chaves de um texto. Esse serviço foi utilizado para que o usuário ao descrever o seu dashboard, possa gerar automaticamente `tags` com base na descrição.

**Componente C**: backend da aplicação desenvolvido em Django. O código está nesse [repositório](https://github.com/luizzappa/hubanalytics-back-docker)

Os componentes A e C estão em containers docker. O componente B, por se tratar de uma API externa, é consumido pelo componente C (backend) em que é implementada uma rota que chama essa API externa passando a autenticação de forma segura e não expondo a API key para o frontend, retornando apenas o resultado da chamada a API externa.

## Como instalar

Clone o repositório localmente.

As URL's do backend estão parametrizadas no arquivo `env.ts` para facilitar sua alteração.

Dentro do respositório local, realize o build da imagem do docker com o seguinte comando:

```bash
docker build -t front .
```

## Como executar

Após completar o build da imagem do docker, execute-o com o seguinte comando:

```bash
docker run -p 3000:3000 front
```

O servidor irá iniciar na porta `3000`. Ao finalizar a incialização do servidor, automaticamente uma janela do browser irá se abrir. Caso isso não ocorra, a página pode ser acessada através do endereço: [http://localhost:3000](http://localhost:3000).

**Atenção**: esse repositório contempla apenas o `frontend`, para que a página retorne os itens cadastrados, é necessário também iniciar o `backend` para que a API esteja disponível. O `backend` encontra-se nesse [repositório](https://github.com/luizzappa/hubanalytics-back-docker).
