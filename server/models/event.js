const mongoose = require("mongoose");

const EventSchema = require("./schema/event");

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;