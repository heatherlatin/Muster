const mongoose = require("mongoose");

const MobSchema = require("./schema/mob");

const Mob = mongoose.model("Mob", MobSchema);

module.exports = Mob;