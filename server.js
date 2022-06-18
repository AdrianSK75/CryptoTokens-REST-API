require("dotenv").config();

const port = 3000;
const express = require('express');
const app = express();
const mongoose = require("mongoose")

const dbURL = "mongodb+srv://Rares:parola12345@cluster0.jxvkaa4.mongodb.net/crypto?retryWrites=true&w=majority"
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => app.listen(port, () => {console.log(`Starting the server with port: ${port}`)}))
      .catch((err) => console.log(err));

app.use(express.json())

const tokensRouter = require("./routes/tokens")
app.use("/tokens", tokensRouter);