// declare dependencies- express, dotenv, pg, 
const express = require('express');
const app= express();
const port = 3005;
//declare middleware

//config dotenv

//config pool

//create routes
app.get("/", (req, res) => {
    res.send("working express");
})

//add listener
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})