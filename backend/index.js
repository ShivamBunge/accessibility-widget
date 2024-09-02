const express = require('express');
const bodyParser = require('body-parser');
const { daltonizeColor } = require('./daltonization');
const cors = require('cors');
const { request } = require('express');
const app = express();
const port = 5000;

app.use(bodyParser.json());


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], // Specify allowed methods if needed
    allowedHeaders: ['Content-Type'] // Specify allowed headers if needed
}));

app.use(express.json()); // To parse JSON bodies


// Endpoint for daltonization
app.post('/daltonize', (req, res) => {
    const { r, g, b } = req.body;
    const daltonizedColor = daltonizeColor(rgb =[r, g, b]);
    res.send({ originalColor: rgb, daltonizedColor });
});


app.listen(port, () => {
    console.log(`Daltonization service listening at http://localhost:${port}`);
});




