const mongoose = require("mongoose");

const URLDB = "mongodb://127.0.0.1:27017/mern-stacks"

mongoose.connect(URLDB)
  .then(db => console.log("DB is connected"))
  .catch(err => console.log(err));

  module.exports = mongoose;