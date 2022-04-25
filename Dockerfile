FROM node:18.0.0-alpine3.15

WORKDIR /opt/frontend
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
ENTRYPOINT npm run dev
