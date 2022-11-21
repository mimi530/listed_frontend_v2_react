FROM node:alpine as development
WORKDIR '/app'
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .