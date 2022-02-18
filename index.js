const express = require("express");
const app = express();
const port = 5000;
const path = require("path");

const compression = require("compression");
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

//mendeklarasikan body-parser terlebih dahulu sebelum routing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// public file
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

const cors = require("cors");
var corsoptions = {
  origin: "http://localhost",
};
app.use(cors(corsoptions));
app.use(compression())
// routers
const routers = require("./routers");
app.use(routers);

// middleware log
const log = (req, res, next) => {
  console.log(Date.now() + " " + req.ip + " " + req.originalUrl);
  next();
};
app.use(log);
app.use((req, res, next) => {
  // res.json({
  //   status: "500",
  //   Message: "Tidak ditemukan",
  // });
  const notFound = "error/error.html";
  res.status(404).sendFile(path.join(__dirname, notFound));
});
