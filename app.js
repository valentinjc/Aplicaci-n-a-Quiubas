const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

const unirest = require("unirest");

const req = unirest("POST", "https://api.quiubas.com/sms");

req.headers({
    "Cache-Control": "no-cache",
    "Authorization": "Basic MGJjZmY3NWE3MzI2YzYwZWZlNmI3OTE4ODMzMzY0MDI1NWExMjc3Yjo1ZTA5YzJjYTNhNTBjNmQyZTBjMmQyN2JlZjRmZjMzM2U5MzFlOWE5",
    "Content-Type": "application/json,application/json"
});
req.type("json");
req.send({ to_number: "522381209706", message: "Test Api Quiubas" });

req.end(function(res) {
    if (res.error) throw new Error(res.error);

    console.log(res.body);
    console.log(`Mensaje enviado a ${res.body.number} ${res.body.network}`);
});


app.listen(3000);