FROM node:10.15.3

WORKDIR /app

COPY . /app

RUN npm install

#ENV PEER0
#ENV ORDERER

CMD npm start

EXPOSE 8081

