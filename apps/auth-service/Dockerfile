FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build auth-service

CMD ["node", "dist/apps/auth-service/main"]