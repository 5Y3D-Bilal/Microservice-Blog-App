#Base image
FROM node:14-alpine

#Unfortunately, create-react-app currently has two bugs that prevent it from running correctly in a docker container:
# thats why we added theses 2 variables
ENV CI=true
ENV WDS_SOCKET_PORT=0

#Setting up a working dir
WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./


CMD ["npm", "start"]