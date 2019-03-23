var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Status Check Success");
  res.status(200).send({'status':'ledger status check success'});
});

router.get('/status', function(req, res, next) {
    console.log("Status Check Success");
    res.status(200).send({'status':'ledger status check success'});
});

module.exports = router;
