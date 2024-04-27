#Base image
FROM node:14-alpine

#Setting up a working dir
WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./


CMD ["npm", "start"]