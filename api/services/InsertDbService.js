// InsertDbService.js

var nodemailer = require('nodemailer');
var Promise = require('bluebird');
//var mp = require('mongodb-promise');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: sails.config.project.nodemailer.auth
});

module.exports = {
    sendAlertEmail: function () {
        var mailOptions = {
            from: sails.config.project.nodemailer.sender, // sender address
            to: sails.config.project.nodemailer.mailToAlert, // send to self
            subject: 'New order created!', // Subject line
            html: '<p>You have new order.</p> Check your admin panel at <a href="' + sails.config.project.website + '/admin/' + '"></a> ' // html body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) return console.log(err);
            else return console.log('Message sent: ' + info.response);
        });
    },

    test: function () {

        return 'test ok service';
    },


    otherMethod: function(){


        var mongodb = require('mongodb');

        var MongoClient = mongodb.MongoClient;
        var Collection = mongodb.Collection;

        Promise.promisifyAll(Collection.prototype);
        Promise.promisifyAll(MongoClient);


        //Connect to the db
        MongoClient.connect("mongodb://localhost:27017/ymple-commerce").then(function (err, db) {

            if (err) {
                return console.dir(err);
            }

            var collection = db.collection('test');
            var doc1 = {'hello': 'doc1'};
            var doc2 = {'hello': 'doc2'};
            var lotsOfDocs = [{'hello': 'doc3'}, {'hello': 'doc4'}];

            collection.insert(doc1);

            collection.insert(doc2, {w: 1}, function (err, result) {
            });

            collection.insert(lotsOfDocs, {w: 1}, function (err, result) {
            });

            var collectionCounter = db.collection('counter');

            var counter = {
                _id: fieldName,
                id: fieldName,
                seq: 0
            };

            collectionCounter.insert(counter);

            //var ret = collectionCounter.find();
            //var ret2 = collectionCounter.find({_id: fieldName});

            /*.toArray(function(err, docs) {
             //assert.equal(err, null);
             //assert.equal(2, docs.length);
             console.log("Found the following records");
             console.dir(docs);
             //callback(docs);
             });
             */
            //console.log ('ret2', ret2);

            // get new sequence

            collectionCounter.update(
                {_id: fieldName},
                {$inc: {seq: 1}}
            )
            collectionCounter.find({_id: fieldName}).toArray(function (err, docs) {
                //assert.equal(err, null);
                //assert.equal(2, docs.length);
                console.log("Found the following records");
                console.dir(docs);

                console.log('new id', docs[0].seq);

                //return 123;//docs.seq;
            });
        });

        // initCounter():{}
        /* db.counters.insert(
         {
         _id: fieldName,
         seq: 0
         }
         );*/

        //var MongoClient = require('mongodb').MongoClient;

    }
};
