FROM node:alpine
WORKDIR /app

RUN apk update
#&& apk add python g++
COPY ./package.json ./package.json
RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]



