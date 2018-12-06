var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.status(200).send({'user status':'user api success'});
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
