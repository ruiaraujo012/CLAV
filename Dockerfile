FROM node:8

RUN apt-get update
WORKDIR /usr/src/app

COPY server/ ./

RUN npm install

COPY . ./

EXPOSE 8000
CMD ["npm", "start"]
