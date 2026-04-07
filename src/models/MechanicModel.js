const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MechanicSchema = new Schema({
    MechanicName: {
        type: String,
        required: true
    },
    MechanicEmail: {
        type: String,
        required: true,
        unique: true
    },
    MechanicPhone: {
        type: String,
        required: true
    },
    Specialization: {
        type: String,
        required: true
    },
    Experience: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Mechanic", MechanicSchema);