const router = require("express").Router();
const PaymentController = require("../controllers/PaymentController");

router.post("/create-order", PaymentController.createOrder);
router.post("/verify", PaymentController.verifyPaymentAndCreateBooking);

module.exports = router;
