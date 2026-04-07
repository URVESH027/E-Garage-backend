const Review = require("../models/ReviewModel");

// CREATE REVIEW
const createReview = async (req, res) => {
    try {
        const savedReview = await Review.create(req.body);

        res.status(201).json({
            message: "Review created successfully",
            data: savedReview
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating review",
            error: err.message
        });
    }
};

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        .populate("UserId")
        .populate("MechanicId");

        res.status(200).json(reviews);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching reviews",
            error: err.message
        });
    }
};

// GET REVIEW BY ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        res.status(200).json(review);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching review",
            error: err.message
        });
    }
};

// UPDATE REVIEW
const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Review updated successfully",
            data: updatedReview
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating review",
            error: err.message
        });
    }
};

// DELETE REVIEW
const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Review deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting review",
            error: err.message
        });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
};