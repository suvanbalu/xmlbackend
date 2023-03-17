const { Schema, model } = require("mongoose");

const schema = new Schema({
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  }
});

module.exports = model("User", schema);