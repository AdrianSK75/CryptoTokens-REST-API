require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require("mongoose")
const port = 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("MongoDB Party!"))

app.use(express.json())

const tokensRouter = require("./routes/tokens")
app.use("/tokens", tokensRouter);


app.listen(port, () => {
  console.log(`Starting the server with port: ${port}`)
})