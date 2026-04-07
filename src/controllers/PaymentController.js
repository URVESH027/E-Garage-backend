const crypto = require("crypto");
const Razorpay = require("razorpay");
const Booking = require("../models/BookingModel");
const Service = require("../models/ServiceModel");
const Vehicle = require("../models/VehicleModel");

const getRazorpayInstance = () => {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        throw new Error("Razorpay keys are missing in .env");
    }

    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
};

const createOrder = async (req, res) => {
    try {
        const { amount, serviceName } = req.body;

        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                message: "A valid amount is required to create an order"
            });
        }

        const razorpay = getRazorpayInstance();

        // Razorpay expects the amount in paise, so we multiply rupees by 100.
        const order = await razorpay.orders.create({
            amount: Number(amount) * 100,
            currency: "INR",
            receipt: `garage_${Date.now()}`,
            notes: {
                serviceName: serviceName || "Garage Service"
            }
        });

        return res.status(201).json({
            message: "Razorpay order created successfully",
            key: process.env.RAZORPAY_KEY_ID,
            order
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to create Razorpay order",
            error: err.message
        });
    }
};

const verifyPaymentAndCreateBooking = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookingData
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                message: "Payment details are required"
            });
        }

        if (!bookingData?.UserId || !bookingData?.vehicleName || !bookingData?.serviceName || !bookingData?.bookingDate) {
            return res.status(400).json({
                message: "Booking details are incomplete"
            });
        }

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                message: "Payment signature verification failed"
            });
        }

        // After payment is verified, we create the vehicle, service, and booking.
        const savedVehicle = await Vehicle.create({
            VehicleName: bookingData.vehicleName,
            VehicleNumber: bookingData.vehicleNumber || `TEMP-${Date.now()}`,
            VehicleModel: bookingData.vehicleModel || bookingData.vehicleName,
            VehicleType: bookingData.vehicleType || "Car",
            OwnerId: bookingData.UserId
        });

        const savedService = await Service.create({
            VehicleId: savedVehicle._id,
            ServiceName: bookingData.serviceName,
            ServiceDate: bookingData.bookingDate,
            ServiceCost: bookingData.amount,
            Description: bookingData.description || "Service booked using Razorpay payment"
        });

        const savedBooking = await Booking.create({
            UserId: bookingData.UserId,
            VehicleId: savedVehicle._id,
            ServiceId: savedService._id,
            BookingDate: bookingData.bookingDate,
            BookingStatus: "Pending",
            PaymentStatus: "Paid",
            PaymentOrderId: razorpay_order_id,
            PaymentId: razorpay_payment_id,
            PaymentSignature: razorpay_signature,
            AmountPaid: bookingData.amount,
            Notes: bookingData.notes || `Paid booking created for ${bookingData.customerName || "user"}`
        });

        return res.status(201).json({
            message: "Payment verified and booking created successfully",
            data: savedBooking
        });
    } catch (err) {
        return res.status(500).json({
            message: "Unable to verify payment and create booking",
            error: err.message
        });
    }
};

module.exports = {
    createOrder,
    verifyPaymentAndCreateBooking
};
