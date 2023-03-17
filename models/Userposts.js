const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  post_headline:{
    type: String,
    required: true,
  },
  post_description: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
    required: true,
    unique: true,
  },
  event_count: {
    type: String,
  },
  bids: [
    {
      caterer: {
        type: "String",
        required: true,
      },
      amount: {
        type: Number,
      },
      pitch: {
        type: String,
      },
      date : {
        type: Date,
        default: Date.now,
      }
    },
  ],
  selected:{
    type: String,
    default: "None",
  },
  deadline:{
    type: Date,
    required: true,
  },
});

module.exports = model("Userposts", schema);
