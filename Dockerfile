FROM node:10.15.3

WORKDIR /app

COPY . /app

ENV PEER0="peer0.org1.example.com"
ENV ORDERER="orderer.example.com"

RUN npm install

CMD npm start

EXPOSE 8081

