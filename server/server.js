const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(url, function (err, db) {
    const database = db.db('flashcards');

    app.post('/api/sets/:name', (req, res) => {
        const collection = database.collection('sets');
        const setName = req.params.name;
        if (setName === undefined) {
            res.status(400).json({message: "Set name not specified!"});
            return;
        }
        collection.insertOne({name: setName, userId: 1}, function (err, r) {
            if (err) {
                console.log("An error occured");
            } else {
                res.status(201).json({message: "Set created"});
            }
        });
    });

    app.get('/api/sets', (req, res) => {
        const collection = database.collection('sets');
        collection.find({userId: 1}).toArray(function (err, results) {
            if (err) {
                console.log("An error occured");
            } else {
                res.status(200).json({results: results});
            }
        });
    });

    app.delete('/api/sets/:id', (req, res) => {
        const collection = database.collection('sets');
        collection.deleteOne({"_id": req.params.id}, function (err, result) {
            if (err) {
                console.log("An error occured");
                res.status(400);
            } else {
                res.status(200).json({message: "Set deleted"});
            }
        });
    });
});

app.listen(port);
console.log(`Server started at http://localhost:${port}...`);