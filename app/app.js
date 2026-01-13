const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("App running on port 3000");
});
