const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




require('./config/config');

app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/rutas'))


mongoose.connect('mongodb://localhost:27017/test', (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log("Escucuando puerto 3000");
})