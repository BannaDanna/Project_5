const express = require('express');

const app = express();

app.listen(3000, () => console.log('listening to 3000'));

app.use(express.static('public'));

app.use(express.json({ limit: '1mb'}));

const datastore = require('nedb');
const database = new datastore('database.db');
database.loadDatabase();

app.post('/api', (request, response) => {
    console.log("I got a request");
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    response.json(data);
})

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    });
});