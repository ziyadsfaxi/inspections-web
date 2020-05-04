/* eslint-disable @typescript-eslint/no-var-requires */
// server.js
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist/")));
const port = process.env.PORT || 4000;
app.listen(port);
console.log("server started " + port);
