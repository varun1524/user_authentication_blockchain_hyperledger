let express = require('express');
let router = express.Router();
let queryObj = require('../hyperledger/userchain/query');
let invokeObj = require('../hyperledger/userchain/invoke');
let updateObj = require('../hyperledger/userchain/updateUser');
let uuidv4 = require('uuid/v4');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).send({'user status':'user api success'});
});

router.get('/fetch', function(req, res, next) {
    try{
        console.log("FetchBlock request params: ", req.query);
        queryObj.findBlock(req.query._id.toString(), function (err, query_res) {
            if(err){
                res.status(404).send({'msg':'Error while fetching block' + err});
            }

            if(query_res){
                query_res = JSON.parse(query_res);
                if(req.query.hasOwnProperty('block_id') && req.query.block_id){
                    query_res['block_data'] = query_res['block_data'].filter((block)=>{
                        return (block['block_id'].toString() === req.query.block_id.toString());
                    });
                }
                if(req.query.hasOwnProperty('block_type') && req.query.block_type){

                    query_res['block_data'] = query_res['block_data'].filter((block)=>{
                        return (block['block_type'].toString() === req.query.block_type.toString());
                    });
                }

                console.log("Query Response : ", query_res);

                res.status(200).send(query_res);
            }
            else {
                res.status(404).send({});
            }
        });
    }
    catch (e) {
        console.error("Error in FetchBlock: ", e);
        return res.status(404).send({'msg': 'Error in FetchBlock'})
    }
});

router.post('/insertdata', function(req, res, next) {
    console.log("add block request params: ", req.body);


    // let req_body = {
    //     "_id": "",
    //     "block_data": {
    //         "data": {},
    //         "operation_type": "",
    //         "creation_date": "",
    //         "block_type": "",
    //         "org_id": "",
    //         "user_id": ""
    //     }
    // };

    let req_body = {
        "_id": req.body._id.toString(),
        "block_data": []
    };

    let body = [req_body['_id'], JSON.stringify(req_body['block_data'])];

    invokeObj.invokeBlock(body, function (err, result) {
        if(err){
            res.status(404).send({'msg':'Error while adding block' + err});
        }
        if(result){
            res.status(200).send({'msg':'success'});
        }
        else {
            res.status(404).send({'msg':'failure'});
        }
    });
});

router.put('/insertdata', function(req, res, next) {
    console.log("update block request params: ", req.body);
    // let req_body = {
    //     "_id": "",
    //     "block_data": {
    //         "data": {},
    //         "operation_type": "",
    //         "creation_date": "",
    //         "block_type": "",
    //         "org_id": "",
    //         "user_id": ""
    //     }
    // };

    let req_body = {
        "_id": req.body._id.toString(),
        "block_data": {
            ...req.body.block_data,
            'block_id': uuidv4(),
            'creation_date': Date.now()
        }
    };

    let body = [req_body['_id'], JSON.stringify(req_body['block_data'])];

    // let body = [
    //     "user0",
    //     req.body['email'],
    //     req.body['role'],
    //     req.body['company'],
    //     req.body['duration'],
    //     req.body['technologies'],
    //     req.body['highlights']
    // ];

    updateObj.updateUserBlock(body, function (err, result) {
        if(err){
            res.status(404).send({'msg':'Error while adding block' + err});
        }
        if(result){
            res.status(200).send({'msg':'success'});
        }
        else {
            res.status(404).send({'msg':'failure'});
        }
    });
});

module.exports = router;
