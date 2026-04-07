const Mechanic = require("../models/MechanicModel");

// CREATE MECHANIC
const createMechanic = async (req, res) => {
    try {
        const savedMechanic = await Mechanic.create(req.body);

        res.status(201).json({
            message: "Mechanic created successfully",
            data: savedMechanic
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating mechanic",
            error: err.message
        });
    }
};

// GET ALL MECHANICS
const getAllMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();

        res.status(200).json(mechanics);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching mechanics",
            error: err.message
        });
    }
};

// GET SINGLE MECHANIC
const getMechanicById = async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);

        res.status(200).json(mechanic);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching mechanic",
            error: err.message
        });
    }
};

// UPDATE MECHANIC
const updateMechanic = async (req, res) => {
    try {
        const updatedMechanic = await Mechanic.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Mechanic updated successfully",
            data: updatedMechanic
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating mechanic",
            error: err.message
        });
    }
};

// DELETE MECHANIC
const deleteMechanic = async (req, res) => {
    try {
        await Mechanic.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Mechanic deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting mechanic",
            error: err.message
        });
    }
};

module.exports = {
    createMechanic,
    getAllMechanics,
    getMechanicById,
    updateMechanic,
    deleteMechanic
};