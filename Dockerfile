FROM node

RUN apt update -y
RUN apt upgrade -y

RUN yarn install

WORKDIR /frontend

ENTRYPOINT ["yarn", "start"]