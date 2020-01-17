const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  resource: { type: Object, required: true },
  title: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  time: { type: String, required: true },
  isSelected: { type: String, required: true }
});

module.exports = EventSchema;