FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build request-service

EXPOSE 3007

CMD ["node", "dist/apps/request-service/main"]
