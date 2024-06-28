#FROM nginx:latest

#CRIACAO DE UMA IMAGEM (EXEMPLO)
# RUN apt-get update
# RUN apt-get install vim -y

#WORKDIR /app

#RUN apt-get update && \
#    apt-get install vim -y

#COPY html/ /usr/share/nginx/html 

#-------------------------------------------------------

#FROM ubuntu:latest
#
#CMD [ "echo",  "Hello World!" ]
#

#-------------------------------------------------------

FROM ubuntu:latest

ENTRYPOINT ["echo", "Hello "]

CMD [ "World!" ]



    
