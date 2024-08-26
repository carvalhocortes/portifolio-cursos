FROM node:latest

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

COPY . .

EXPOSE 5000

CMD ["node", "build/server.js"]
