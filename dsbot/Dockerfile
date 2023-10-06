FROM node:18
ENV DB_CONNECTION="${DB_CONNECTION}"
ENV POLL_TIME="${POLL_TIME}"
ENV TOKEN="${TOKEN}"
ENV CHALLENGE="${CHALLENGE}"
ENV CLIENT_ID="${CLIENT_ID}"
ENV SECRET_IV="${SECRET_IV}"
WORKDIR /sheldon
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
RUN touch empty.ts
COPY ./src/ ./src/
CMD ["npm", "start"]
