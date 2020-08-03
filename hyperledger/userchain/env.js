let peer0 = process.env.PEER0 ? process.env.PEER0 : "localhost";
let orderer = process.env.ORDERER ? process.env.ORDERER : "localhost";

console.log("peer0: ", peer0);
console.log("orderer: ", orderer);

exports.peer0 = peer0;
exports.orderer = orderer;