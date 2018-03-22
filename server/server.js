const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017/";

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MongoClient.connect(url, function (err, db) {
    const database = db.db('flashcards');

    app.post('/api/sets', (req, res) => {
        const collection = database.collection('sets');
        const setName = req.body.name;
        if (setName === undefined) {
            res.status(400).json({message: "Set name not specified!"});
            return;
        }

        const objectToInsert = {name: setName, userId: 1};
        collection.insertOne(objectToInsert, function (err, r) {
            if (err) {
                console.log("An error occured");
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(201).json({message: "Set created", lastSetId: objectToInsert._id});
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
        collection.deleteOne({"_id": ObjectId(req.params.id)}, function (err, result) {
            if (err) {
                console.log("An error occured");
                res.status(400);
            } else {
                res.status(200).json({message: "Set deleted"});
            }
        });
    });

    app.get('/api/sets/:id', (req, res) => {
        const collection = database.collection('sets');
        collection.findOne({_id: ObjectId(req.params.id), userId: 1}, function (err, r) {
            if (err) {
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(200).json({message: "Set found", set: r});
            }
        });
    });

    app.put('/api/sets/:id', (req, res) => {
        const collection = database.collection('sets');
        collection.updateOne({_id: ObjectId(req.params.id), userId: 1}, {$set: {name: req.body.name}}, function (err, r) {
            if (err) {
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(201).json({message: "Set updated", set: r});
            }
        });
    });

    app.post('/api/sets/:id/words', (req, res) => {
        const collection = database.collection('words');
        const setId = req.params.id;
        const word = req.body.word;
        if (setId === undefined || word === undefined) {
            res.status(400).json({message: "Set id not specified!"});
            return;
        }

        const objectToInsert = {definition: word.definition, explanation: word.explanation, setId: setId};
        collection.insertOne(objectToInsert, function (err, r) {
            if (err) {
                console.log("An error occured");
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(201).json({message: "Word added", lastSetId: objectToInsert._id});
            }
        });
    });

    app.get('/api/sets/:id/words', (req, res) => {
        const collection = database.collection('words');
        const setId = req.params.id;
        if (setId === undefined) {
            res.status(400).json({message: "Set id not specified!"});
            return;
        }

        collection.find({setId: setId}).toArray(function (err, r) {
            if (err) {
                console.log("An error occured");
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(200).json({words: r});
            }
        });
    });

    app.delete('/api/sets/:id/words/:word', (req, res) => {
        const collection = database.collection('words');
        const setId = req.params.id;
        const wordId = req.params.word;
        if (setId === undefined || wordId === undefined) {
            res.status(400).json({message: "Set id or word id not specified!"});
            return;
        }

        collection.deleteOne({setId: setId, _id: ObjectId(wordId)}, function (err, r) {
            if (err) {
                console.log("An error occured");
                res.status(400).json({message: "An error occurred"});
            } else {
                res.status(200).json({mesage: "Word has been deleted"});
            }
        });
    });
});

app.listen(port);
console.log(`Server started at http://localhost:${port}...`);
