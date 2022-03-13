const mongoose = require("mongoose");
const www= {usr: diki,
pss:1234}
//const url = `mongodb://${www.usr}:${www.pss}@localhost:27017/latihan?authSource=admin`;
const url =`mongodb+srv://${www.usr}:${www.pss}@belajarmongodbatlas.jwcyd.mongodb.net/sampleService?retryWrites=true&w=majority`;
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
