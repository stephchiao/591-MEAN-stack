/**
 * Created by chiao on 6/13/2017.
 */



var express = require('express');
var router = express.Router();

// require mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hw2db');
const db = mongoose.connection;
db.once('open', function () {
    console.log('Connection successful.')
});

// define a schema
const Schema = mongoose.Schema;
const stringSchema = new Schema({
    string: String,
    length: Number
});
// compile model from schema
const stringModel = mongoose.model('stringModel', stringSchema);



// GET method using named parameter
// look in database to see if string is already present.
// if it is, return string and it's length from database.
// if it isn't, compute length, stor string and length in database,
// and return both to client.
router.get('/db/:_longstring', function(req, res, next) {
    // let longstring = req.params.longstring;
    // res.json({"string": longstring, "length": longstring.length} );
    // stringModel.findByIdAndUpdate(req.params._longstring, req.params, {string: req.params._longstring, length: req.params._longstring.length}, function (err, results) {
    stringModel.find({string:req.params._longstring}, function (err, results) {
        if (err) {
            // update database
            // store string and length in database

            let longstring = req.params._longstring
            let length = req.params._longstring.length
            const newString = new stringModel ( {string: longstring, length:length})
            // const newString = new stringModel(
            //     req.params
            // )

            newString.save(function(err) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(newString)
                }
            })
        }
        else {
            console.log('updated');
            res.json(results);
        }
    });
});


// if no parameter is passed on the URI,
// return all strings currently stored in the database
router.get('/db', function(req, res, next) {
    // res.render('hw2', { title: 'HOMEWORK 2' });
    stringModel.find({}, function (err, results) {
        res.json(results);
    })
});

// POST
// look in database to see if string is already present.
// if it is, return string and length from database.
// if it isn't, compute length, store string and length in database,
// and return to client.
router.post('/db', function(req, res, next) {

    // if it's in database, return string and length from database
    stringModel.find({string: req.body.longstring}, function (err, results) {
        if (err) {
            // store string and length in database

            let longstring = req.body.longstring
            let length = req.body.longstring.length
            const newString = new stringModel ( {string: longstring, length:length})
            // const newString = new stringModel(
            //     req.body
            // )

            newString.save(function(err) {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send(newString)
                }
            })
        }
        else {
            res.json(results)
        }
    })
})



// If no string is passed, return a message in JSON format
// prompting the user to provide a string.
router.post('/db',  function(req, res, next) {
    stringModel.find({string: req.body.longstring}, function (err, results) {

        res.json({message:'Please provide a string'})
    })

    // let mystring = req.body.mystring;
    // res.json({"string":mystring, "length": mystring.length});
});

// DELETE
router.delete('/db/:_longstring', function (req, res, next) {
    stringModel.findByIdAndRemove(req.params._longstring, function (err, result) {
        if (err) {
            res.json({message: 'String not found'});
        }
        else {
            res.json({message: 'Success'});
        }
    })
})



module.exports = router;
