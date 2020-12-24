# FROM node:15.5.0-buster-slim
FROM node:15.5.0-buster

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5151

CMD ["npm", "run dev"]
