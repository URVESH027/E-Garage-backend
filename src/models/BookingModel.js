const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    VehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    ServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },
    BookingDate: {
        type: Date,
        required: true
    },
    BookingStatus: {
        type: String,
        default: "Pending"
    },
    PaymentStatus: {
        type: String,
        default: "Pending"
    },
    PaymentOrderId: {
        type: String
    },
    PaymentId: {
        type: String
    },
    PaymentSignature: {
        type: String
    },
    AmountPaid: {
        type: Number,
        default: 0
    },
    Notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", BookingSchema);
