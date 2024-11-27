# Shopper Fullstack

Este é o projeto **Shopper Fullstack**, composto por duas partes: o frontend (em React/Next) e o backend (em Node.js com Nest.js). O projeto também utiliza Docker para facilitar a configuração e a execução do ambiente.

## Pré-requisitos

Certifique-se de que você tenha o Docker instalado e em execução na sua máquina. Caso não tenha, siga as instruções de instalação do [Docker](https://docs.docker.com/get-docker/).

## Passos para Iniciar

### 1. Instalar Dependências do Frontend

1. Acesse a pasta `shopper-frontend`:

    ```bash
    cd shopper-frontend
    ```

2. Instale as dependências do frontend:

    ```bash
    npm install
    ```

### 2. Instalar Dependências do Backend

1. Acesse a pasta `shopper-backend`:

    ```bash
    cd shopper-backend
    ```

2. Instale as dependências do backend:

    ```bash
    npm install
    ```

### 3. Criar arquivo .env

1. Na pasta raiz do projeto (`shopper-fullstack`), crie um arquivo .env.

2. Informe a sua **Google Api Key**, exemplo:
```dotenv
GOOGLE_API_KEY=<chave da API>

```


### 4. Configurar o Docker

1. Na pasta raiz do projeto (`shopper-fullstack`), onde o arquivo `docker-compose.yml` está localizado, execute o comando para iniciar os containers:

    ```bash
    docker-compose up
    ```



Se você tiver algum problema durante a instalação, verifique se o Docker está em execução corretamente e se todas as dependências foram instaladas nas pastas correspondentes.

