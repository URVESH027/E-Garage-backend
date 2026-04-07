const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    MechanicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mechanic",
        required: true
    },
    Rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    Comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Review", ReviewSchema);