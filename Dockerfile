FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN mkdir -p data && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm", "start"]
