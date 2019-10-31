const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

const unirest = require("unirest");

const req = unirest("GET", "https://api.quiubas.com/balance");

req.headers({
    "Cache-Control": "no-cache",
    "Authorization": "Basic MGJjZmY3NWE3MzI2YzYwZWZlNmI3OTE4ODMzMzY0MDI1NWExMjc3Yjo1ZTA5YzJjYTNhNTBjNmQyZTBjMmQyN2JlZjRmZjMzM2U5MzFlOWE5",
    "Content-Type": "application/json,application/json"
});

req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(`El balance es de ${res.body.balance} ${res.body.currency}`);
});

app.listen(3000);