var express = require('express');
var router = express.Router();
let query = require('./../hyperledger/fabcar/query');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).send({'user status':'user api success'});
});

router.get('/fetchblock', function(req, res, next) {
    try{
        console.log("FetchBlock request params: ", req.body);
        query.findBlock(req.body.block_hash, function (query_res) {
           console.log("findBlock: ", query_res);
            let res_body = {
                'data': query_res
            };
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

router.post('/addblock', function(req, res, next) {
    console.log("addblock request params: ", req.body);
    // role:
    // company:
    // duration:
    // highlights:
    res.status(200).send('respond with a resource');
});

module.exports = router;
