# Cleanup if already setup an environment
- docker rm $(docker ps -aq)
- docker network prune
- docker rmi $(docker images dev-* -q)

# Setup Environment
1) https://hyperledger-fabric.readthedocs.io/en/latest/build_network.html
2) https://hyperledger-fabric.readthedocs.io/en/latest/install.html
3) https://hyperledger-fabric.readthedocs.io/en/latest/write_first_app.html


SDK Documentation: https://fabric-sdk-node.github.io/release-1.3/index.html

## Miscellaneous:
node userchain.js "--peer.address" "172.23.0.6:7052"
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.3.0


# Project Dependancies

This project contains Front End part of project "User Authentication Using Blockchain Technology".

The whole project is divided in 3 parts
1) [User Interface](https://github.com/varun1524/user_authentication_blockchain_ui)
2) [Back End Server](https://github.com/divyang8842/User-Authentication-using-blockchain-technology)
3) [Blockchain Network](https://github.com/varun1524/user_authentication_blockchain_hyperledger)

In order to run the application, we need to have all 3 part of application running in the system.
