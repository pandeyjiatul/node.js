const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();

const playerRoutes = require("./routes/player.routes");
const homeRoutes = require("./routes/index.routes");
const port = 2000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "socka",
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});
global.db = db;

app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// routes for the app
app.use("/", homeRoutes);
app.use("/player", playerRoutes);
app.get("*", function (req, res, next) {
  res.status(404);

  res.render("404.ejs", {
    title: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
