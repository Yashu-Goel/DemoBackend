const mongoose = require("mongoose");

const Images = new mongoose.Schema({
  pics: [
    {
      type: String,
      required: true,
    },
  ]
});

module.exports = mongoose.model("Images", Images);
