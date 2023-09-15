# Define a imagem base
FROM node:18.12.1

# Expõem a porta 3000
EXPOSE 3000

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de requisitos para o diretório de trabalho
COPY package.json /app
COPY package-lock.json /app

# Instala as dependências do projeto
RUN npm install

# Copia o código-fonte para o diretório de trabalho
COPY . /app

# Define o comando de execução do front
CMD ["npm", "run", "start"]