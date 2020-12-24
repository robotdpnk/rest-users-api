FROM node:15.5.0-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5151

CMD ["npm", "run dev"]
