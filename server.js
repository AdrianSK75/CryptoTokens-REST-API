require("dotenv").config();

const port = process.env.PORT || 5000;
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const logger = require("logger");
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => app.listen(port, () => {console.log(`Starting the server with port: ${port}`)}))
      .catch((err) => console.log(err));
app.use(express.json())
app.use(logger("dev"))
app.use(bodyParser.json())

const tokensRouter = require("./routes/tokens")
app.use("/tokens", tokensRouter);