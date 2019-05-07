#!/usr/bin/env bash

docker rm hyperledger-server --force || true

docker build -t hyperledger-server:1.0.0 .

cd hyperledger/userchain/
./startFabric.sh

#cd ../..

docker run -itd --name hyperledger-server --network=net_basic -p 80:8081 hyperledger-server:1.0.0