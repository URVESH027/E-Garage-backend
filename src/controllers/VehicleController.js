const Vehicle = require("../models/VehicleModel");

// CREATE
const createVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);

        res.status(201).json({
            message: "Vehicle created successfully",
            data: vehicle
        });

    } catch (err) {
        res.status(500).json({
            message: "Error creating vehicle",
            error: err.message
        });
    }
};

// GET ALL
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();

        res.status(200).json(vehicles);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching vehicles",
            error: err.message
        });
    }
};

// GET BY ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);

        res.status(200).json(vehicle);

    } catch (err) {
        res.status(500).json({
            message: "Error fetching vehicle",
            error: err.message
        });
    }
};

// UPDATE
const updateVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Vehicle updated",
            data: vehicle
        });

    } catch (err) {
        res.status(500).json({
            message: "Error updating vehicle",
            error: err.message
        });
    }
};

// DELETE
const deleteVehicle = async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Vehicle deleted"
        });

    } catch (err) {
        res.status(500).json({
            message: "Error deleting vehicle",
            error: err.message
        });
    }
};


module.exports = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle
};
