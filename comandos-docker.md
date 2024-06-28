# Principais comandos Docker


### 🔹 Listar containers 
  ```bash
    docker ps -a
 ```
   
### 🔹 Remover containers 

    docker rm <nome container> -f

### 🔹 Container e colocando um nome (--name) 

    docker run --name meu_container -d -p 8080:80 nginx  

### 🔹 Executando comando no container ***

    docker exec <meu_container> <comando: "ls">

### 🔹 Acessando o Bash (terminal dentro do container) 

    docker exec -it <meu_container> bash

### 🔹 Criando volumes (bind mounts), no container 

    docker run -d --name <meu_container> -p 8080:80 -v   <caminho do arquivo: "~/Projetos/Fullcycle/Docker/html/:/usr/share/nginx/html"> nginx

### 🔹 Comando atalho do diretorio

    echo $(pwd)

### 🔹 Criando volumes (bind mounts), no container, usando o comando "--mount", devo estar dentro da pasta que quero montar o volume!!! 

    docker run -d --name meucontainer -p 8080:80 --mount type=bind,source="$(pwd)"/html,target=/usr/share/nginx/html nginx

### 🔹 Trabalhando com volume 

     docker volume create <nome volume>

### 🔹 Incluindo no container (Nginx) 

    docker run --name <meucontainer> -d --mount type=volume,source=<meuvolume>, target=/app nginx


### 🔹 Incluindo no container (Nginx) com comando --v 

    docker run --name <meucontainer> -d -v 
    <meuvolume>:/app nginx


### 🔹 Criando Imagem 

    docker build -t AngeloSouza1/nginx-com-vim:latest .
                    (usuarioGithub/nomedaimagem)
                    "." refere-se à pasta atual

    docker run --rm AngeloSouza1/Hello        [rodar a imagem]

### 🔹 Apagando Imagens 

    docker images


### 🔹 Apagando Imagens 
 
    docker rmi <imagem>

### 🔹 Estrutura arquivo DOCKERFILE

    FROM nginx:latest

    #CRIACAO DE UMA IMAGEM (EXEMPLO)
    # RUN apt-get update
    # RUN apt-get install vim -y

    WORKDIR /app

    RUN apt-get update && \
    apt-get install -y

    COPY html /usr/share/nginx 

### 🔹 Excluindo todos os containers de uma vez, atraves de uma lista

     docker rm $(docker ps -a -q) -f


### 🔹 Alterando comandos do Dockerfile

     docker run --rm AngeloSouza1/olamundo   echo "Fala Ai"

### 🔹 ENTRYPOINT
     Comando fixo(valor padrão)
     CMD - Comando Variavel(parametro)

        FROM ubuntu:latest
        ENTRYPOINT ["echo", "Hello "]
        CMD [ "World!" ]

### 🔹Publicando imagem no Dockerhub

        FROM nginx:latest
        COPY html /usr/share/nginx/html
        ENTRYPOINT ["/docker-entrypoint.sh"]
        CMD ["nginx", "-g", "daemon off;"]

       #comandos para criar e gerar imagem exemplo 
       docker build -t AngeloSouza1/nginx-fullcycle .  (ponto indica esta na mesma pasta) 
       docker run --rm -d -p 8080:80  AngeloSouza1/nginx-fullcycle



















