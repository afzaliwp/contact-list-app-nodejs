FROM node:20.10.0-alpine
LABEL authors="Mohammad Afzali"

WORKDIR usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run server"]