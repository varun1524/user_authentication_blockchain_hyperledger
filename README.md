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
node fabcar.js "--peer.address" "172.23.0.6:7052"
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.3.0
