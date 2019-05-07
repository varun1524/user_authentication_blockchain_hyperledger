#!/usr/bin/env bash

docker rm uabt-hyperledger-server --force || true

docker build -t uabt-hyperledger-server:1.0.0 .

cd hyperledger/userchain/
./startFabric.sh

#docker run -itd --name hyperledger-server --network=net_basic -p 80:8081 hyperledger-server:1.0.0