const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  VehicleName: {
    type: String,
    required: true
  },
  VehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  VehicleModel: {
    type: String,
    required: true
  },
  VehicleType: {
    type: String,
    required: true
  },
  OwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Vehicle", VehicleSchema);