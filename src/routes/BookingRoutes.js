const router = require("express").Router();

const BookingController = require("../controllers/BookingController");

router.get("/", BookingController.getAllBookings);
router.get("/user/:userId", BookingController.getBookingsByUser);
router.post("/", BookingController.createBooking);
router.put("/:id", BookingController.updateBooking);
router.delete("/:id", BookingController.deleteBooking);

module.exports = router;
