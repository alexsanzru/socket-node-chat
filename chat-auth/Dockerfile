FROM node:16

RUN mkdir -p /usr/scr/socketchat-auth

WORKDIR /usr/scr/socketchat-auth

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
