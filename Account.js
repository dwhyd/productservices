const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true,
  },
  pwd: {
    type: String,
    require: true,
  },
});
const Account = new mongoose.model("Account", accountSchema);
module.exports = Account;
