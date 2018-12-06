# Install Binaries, Sample Project and Docker Images
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.3.0

# Cleanup if already setup an environment
- ./byfn.sh down
- docker rm -f $(docker ps -aq)
- docker network prune
- docker rmi dev-peer0.org1.example.com-fabcar-1.0-5c906e402ed29f20260ae42283216aa75549c571e2e380f3615826365d8269ba

# Setup Environment
1) https://hyperledger-fabric.readthedocs.io/en/latest/build_network.html
2) https://hyperledger-fabric.readthedocs.io/en/latest/install.html
3) https://hyperledger-fabric.readthedocs.io/en/latest/write_first_app.html


SDK Documentation: https://fabric-sdk-node.github.io/release-1.3/index.html

## Miscellaneous:
node fabcar.js "--peer.address" "172.23.0.6:7052"
