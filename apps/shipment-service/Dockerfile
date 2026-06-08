FROM node:22-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build shipment-service

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/apps/shipment-service/main"]
