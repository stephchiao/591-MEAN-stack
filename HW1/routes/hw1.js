/**
 * Created by chiao on 6/6/2017.
 */



var express = require('express');
var router = express.Router();
// var app = express();

// configure body parser
// var bodyParser = require('body-parser');
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



/* GET hw1 */
router.get('/', function(req, res, next) {
    res.render('hw1', { title: 'HOMEWORK 1' });
});

// GET method using named parameter
router.get('/:mystring', function(req, res, next) {
    let mystring = req.params.mystring;
    res.json({"string": mystring, "length": mystring.length} );
});

//POST method that gets parameter from request body
router.post('/',  function(req, res, next) {
    let mystring = req.body.mystring;
    res.json({"string":mystring, "length": mystring.length});
});



module.exports = router;