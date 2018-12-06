/*
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

let Chaincode = class {

    // The Init method is called when the Smart Contract 'userchain' is instantiated by the blockchain network
    // Best practice is to have any Ledger initialization in separate function -- see initLedger()
    async Init(stub) {
        console.info('=========== Instantiated userchain chaincode ===========');
        return shim.success();
    }

    // The Invoke method is called as a result of an application request to run the Smart Contract
    // 'userchain'. The calling application program has also specified the particular smart contract
    // function to be called, with arguments
    async Invoke(stub) {
        let ret = stub.getFunctionAndParameters();
        console.info(ret);

        let method = this[ret.fcn];
        if (!method) {
            console.error('no function of name:' + ret.fcn + ' found');
            throw new Error('Received unknown function ' + ret.fcn + ' invocation');
        }
        try {
            let payload = await method(stub, ret.params);
            return shim.success(payload);
        } catch (err) {
            console.log(err);
            return shim.error(err);
        }
    }

    async queryUser(stub, args) {
        if (args.length !== 1) {
            throw new Error('Incorrect number of arguments. Expecting CarNumber ex: CAR01');
        }
        let userHash = args[0];

        let userAsBytes = await stub.getState(userHash); //get the car from chaincode state
        if (!userAsBytes || userAsBytes.toString().length <= 0) {
            throw new Error(userHash + ' does not exist: ');
        }
        console.log(userAsBytes.toString());
        return userAsBytes;
    }

    async initLedger(stub, args) {
        console.info('============= START : Initialize Ledger ===========');
        let users = [];
        users.push({
            email:'varun_shah1993@yahoo.com',
            role:'software engineer intern',
            company:'DreamWorks Animation',
            duration:'May 2018 - Aug 2018',
            technologies:'python, java',
            highlights:'brilliant intern'
        });
        users.push({
            email:'divyang8842@gmail.com',
            role:'software engineer intern',
            company:'LaceWork',
            duration:'May 2018 - Present',
            technologies:'python, java, GO',
            highlights:'experienced intern'
        });
        users.push({
            email:'baraiyaraj@gmail.com',
            role:'software engineer intern',
            company:'Varian',
            duration:'May 2018 - Present',
            technologies:'.NET, java, GO',
            highlights:'smart intern'
        });
        users.push({
            email:'nehajethani@gmail.com',
            role:'software engineer intern',
            company:'Juniper Networks',
            duration:'May 2018 - Present',
            technologies:'Python',
            highlights:'studious intern'
        });

        for (let i = 0; i < users.length; i++) {
            users[i].docType = 'userblock';
            await stub.putState('user' + i, Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async addUserBlock(stub, args) {
        console.info('============= START : Create User ===========');
        console.log("addUserBlock args: ", args);
        // if (args.length !== 8) {
        //   throw new Error('Incorrect number of arguments. Expecting 5');
        // }
        let userBlock = {
            docType: 'userblock',
            email:args[1],
            role:args[2],
            company:args[3],
            duration:args[4],
            technologies:args[5],
            highlights:args[6]
        };

        await stub.putState(args[0], Buffer.from(JSON.stringify(userBlock)));
        console.info('============= END : Create User Block ===========');
    }

    // async queryAllUserBlocks(stub, args) {
    //
    //     let startKey = 'CAR0';
    //     let endKey = 'CAR999';
    //
    //     let iterator = await stub.getStateByRange(startKey, endKey);
    //
    //     let allResults = [];
    //     while (true) {
    //         let res = await iterator.next();
    //
    //         if (res.value && res.value.value.toString()) {
    //             let jsonRes = {};
    //             console.log(res.value.value.toString('utf8'));
    //
    //             jsonRes.Key = res.value.key;
    //             try {
    //                 jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
    //             } catch (err) {
    //                 console.log(err);
    //                 jsonRes.Record = res.value.value.toString('utf8');
    //             }
    //             allResults.push(jsonRes);
    //         }
    //         if (res.done) {
    //             console.log('end of data');
    //             await iterator.close();
    //             console.info(allResults);
    //             return Buffer.from(JSON.stringify(allResults));
    //         }
    //     }
    // }

    // async updateUserBlock(stub, args) {
    //     console.info('============= START : changeCarOwner ===========');
    //     if (args.length != 2) {
    //         throw new Error('Incorrect number of arguments. Expecting 2');
    //     }
    //
    //     let carAsBytes = await stub.getState(args[0]);
    //     let car = JSON.parse(carAsBytes);
    //     car.owner = args[1];
    //
    //     await stub.putState(args[0], Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }
};

shim.start(new Chaincode());
