const mongoose = require("mongoose");
const url = "mongodb://diki:1234@localhost:27017/latihan?authSource=admin";
// const url ="mongodb+srv://diki:1234@belajarmongodbatlas.jwcyd.mongodb.net/sampleService?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("server database connect");
});
