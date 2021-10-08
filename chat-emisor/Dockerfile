FROM node:16

RUN mkdir -p /usr/scr/socketchat-emisor

WORKDIR /usr/scr/socketchat-emisor

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6002

CMD ["npm","start"]
