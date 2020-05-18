# Dockerfile
FROM node:latest

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY ./package.json /app
COPY ./webpack.config.js /app
RUN npm install

# Bundle app source
COPY src/. /app/src

# Build and optimize frontend application
RUN npm run build

CMD [ "npm", "run", "start" ]
