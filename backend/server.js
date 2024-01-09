const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

const DataRoute = require("./router/DataRoute");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api", DataRoute);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is runing on: ${PORT}`);   
}); 

