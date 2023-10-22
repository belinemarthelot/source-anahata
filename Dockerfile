FROM node

RUN apt update -y
RUN apt upgrade -y

WORKDIR /frontend