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
    const collection = database.collection('flashcards');
    app.get('/', (req, res) => {
        collection.insertOne({ user: 'test' }, function (err, r) {
            if (err) {
                res.send("An error occured");
            } else {
                res.send("All well");
            }
        });
    }); 
});

app.listen(port);
console.log(`Server started at http://localhost:${port}...`);