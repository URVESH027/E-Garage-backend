const router = require("express").Router();

const ReviewController = require("../controllers/ReviewController");

router.get("/", ReviewController.getAllReviews);
router.post("/", ReviewController.createReview);

module.exports = router;