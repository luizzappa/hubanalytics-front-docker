# MVP Sprint PUC-Rio - Engenharia de Software

Esse repositório contém o `frontend` do primeiro MVP para a pós-graduação em Engenharia de Software da PUC-Rio. Ele foi desenvolvindo em `Typescript` utilizando a biblioteca `React` e `Bootstrap` para o layout.

Nesse projeto criei um catálogo de dashboards, utilizando a técnica de infinite scroll para que todos os itens não sejam carregados ao mesmo tempo, prejudicando a performance e o tempo de abertura da página. Ao chegar ao final da página, uma nova requisição ao `backend` retorna mais itens e assim por diante.

## Como instalar

Clone o repositório e instale localmente as bibliotecas utlizando o comando:

```
npm install
```

As URL's da API estão parametrizadas no arquivo `env.ts` para facilitar sua alteração.

## Como executar

Após a instalção das bibliotecas, no terminal execute o comando:

```
npm run start
```

O servidor irá iniciar na porta 3000. Ao finalizar a incialização do servidor, automaticamente uma janela do browser irá se abrir. Caso isso não ocorra, a página pode ser acessada através do endereço: [http://localhost:3000](http://localhost:3000).

**Atenção**: esse repositório contempla apenas o `frontend`, para que a página retorne os itens cadastrados, é necessário também iniciar o `backend` para que a API esteja disponível. O `backend` encontra-se nesse [repositório](https://github.com/luizzappa/hubanalytics-back).