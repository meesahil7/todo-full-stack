const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = { TodoModel };
