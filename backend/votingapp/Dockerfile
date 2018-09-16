FROM node:alpine
WORKDIR /app

RUN apk update && apk add python g++ make
COPY ./package.json ./package.json
RUN npm i

COPY ./ ./

CMD [ "npm", "start" ]



