FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install sqlite3
COPY . .
EXPOSE 5001
CMD ["node", "playerRoutes.js"]