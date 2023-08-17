const { model, Schema } = require("mongoose");

const categoriesSchema = new Schema({
  categories: {
    type: String,
    require: true,
  },
});

module.exports = model("Categories", categoriesSchema);
