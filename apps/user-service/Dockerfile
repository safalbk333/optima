FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build user-service

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/apps/user-service/main"]
