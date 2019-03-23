let express = require('express');
let router = express.Router();
let queryObj = require('../hyperledger/userchain/query');
let invokeObj = require('../hyperledger/userchain/invoke');
let uuidv4 = require('uuid/v4');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).send({'user status':'user api success'});
});

router.get('/fetchblock', function(req, res, next) {
    try{
        console.log("FetchBlock request params: ", req.body);
        queryObj.findBlock(req.body.block_hash, function (err, query_res) {
            if(err){
                res.status(404).send({'msg':'Error while fetching block' + err});
            }
            console.log("findBlock: ", query_res);
            if(query_res){
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
    console.log("addblock request params: ", req.body);
    let body = [
        uuidv4(),
        req.body['email'],
        req.body['role'],
        req.body['company'],
        req.body['duration'],
        req.body['technologies'],
        req.body['highlights']
    ];
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

module.exports = router;
