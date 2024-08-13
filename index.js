const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const userrouter = require("./route/userrouter");
const cors = require("cors");

app.use(cors({ orgin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true, limit: "50mb" }));

app.use("/user", userrouter);

const port = process.env.PORT;

mongoose
  .connect(process.env.URI)
  .then((res) => {
    app.listen(port, () => {
      console.log("app connected to port", port);
    });
  })
  .catch((error) => console.log(error));
