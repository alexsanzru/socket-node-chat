FROM node:16

RUN mkdir -p /usr/scr/socketchat-interface

WORKDIR /usr/scr/socketchat-interface

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

RUN npm install -g forever

# Bundle app source
COPY . .