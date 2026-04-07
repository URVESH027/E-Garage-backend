const Booking = require("../models/BookingModel");

const allowedStatuses = ["Pending", "Approved", "Rejected"];

const createBooking = async (req, res) => {
    try {
        const { UserId, VehicleId, ServiceId, BookingDate, BookingStatus, Notes } = req.body;

        if (!UserId || !VehicleId || !ServiceId || !BookingDate) {
            return res.status(400).json({
                message: "UserId, VehicleId, ServiceId, and BookingDate are required"
            });
        }

        const savedBooking = await Booking.create({
            UserId,
            VehicleId,
            ServiceId,
            BookingDate,
            BookingStatus: allowedStatuses.includes(BookingStatus) ? BookingStatus : "Pending",
            Notes
        });

        res.status(201).json({
            message: "Booking created successfully",
            data: savedBooking
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating booking",
            error: err.message
        });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
        .populate("UserId")
        .populate("VehicleId")
        .populate("ServiceId")
        .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching bookings",
            error: err.message
        });
    }
};

const getBookingsByUser = async (req, res) => {
    try {
        const bookings = await Booking.find({ UserId: req.params.userId })
        .populate("UserId")
        .populate("VehicleId")
        .populate("ServiceId")
        .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching user bookings",
            error: err.message
        });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate("UserId")
        .populate("VehicleId")
        .populate("ServiceId");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching booking",
            error: err.message
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const updatePayload = { ...req.body };

        if (updatePayload.BookingStatus && !allowedStatuses.includes(updatePayload.BookingStatus)) {
            return res.status(400).json({
                message: "Invalid booking status"
            });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            updatePayload,
            { new: true }
        )
        .populate("UserId")
        .populate("VehicleId")
        .populate("ServiceId");

        if (!updatedBooking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking updated successfully",
            data: updatedBooking
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating booking",
            error: err.message
        });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting booking",
            error: err.message
        });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    getBookingById,
    updateBooking,
    deleteBooking
};
