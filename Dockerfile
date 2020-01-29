FROM node:lts-alpine

RUN set -x && apk --update upgrade && apk add git

COPY . /code
WORKDIR /code

RUN npm install

CMD [ "node", "/code/start.js" ]