FROM node:18
WORKDIR /sheldon
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN touch empty.ts
COPY ./src/ ./src/
RUN npm run compile
CMD ["npm", "start"]
