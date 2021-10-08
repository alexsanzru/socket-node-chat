FROM node:16

RUN mkdir -p /usr/scr/socketchat-receptor

WORKDIR /usr/scr/socketchat-receptor

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 6001

CMD ["npm","start"]
