const { model, Schema } = require("mongoose");

const worksSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  level: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});

module.exports = model("Works", worksSchema);
