FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build contracts-service

CMD ["node", "dist/apps/contracts-service/main"]