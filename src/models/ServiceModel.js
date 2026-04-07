const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    VehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    ServiceName: {
        type: String,
        required: true
    },
    ServiceDate: {
        type: Date,
        required: true
    },
    ServiceCost: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Service", ServiceSchema);