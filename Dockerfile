FROM node:18.0.0-alpine3.15

WORKDIR /opt/frontend
COPY . .
RUN npm install
RUN npm run build
RUN useradd -u 8877 useless-user
USER useless-user

EXPOSE 3000
ENTRYPOINT npm run dev
