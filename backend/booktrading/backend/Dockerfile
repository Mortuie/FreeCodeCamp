FROM node:alpine

WORKDIR /app

# RUN apk update
COPY ./package.json .
RUN npm install

COPY . .

CMD [ "npm", "start" ]