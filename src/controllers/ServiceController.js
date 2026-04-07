const Service = require("../models/ServiceModel");

const createService = async (req, res) => {
    try {
        const { VehicleId, ServiceName, ServiceDate, ServiceCost, Description } = req.body;

        if (!VehicleId || !ServiceName || !ServiceDate || !ServiceCost || !Description) {
            return res.status(400).json({
                message: "VehicleId, ServiceName, ServiceDate, ServiceCost, and Description are required"
            });
        }

        const savedService = await Service.create({
            VehicleId,
            ServiceName,
            ServiceDate,
            ServiceCost,
            Description
        });

        res.status(201).json({
            message: "Service created successfully",
            data: savedService
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating service",
            error: err.message
        });
    }
};

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
            .populate("VehicleId")
            .sort({ createdAt: -1, ServiceDate: -1 });

        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching services",
            error: err.message
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate("VehicleId");

        if (!service) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json(service);
    } catch (err) {
        res.status(500).json({
            message: "Error fetching service",
            error: err.message
        });
    }
};

const updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("VehicleId");

        if (!updatedService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service updated successfully",
            data: updatedService
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating service",
            error: err.message
        });
    }
};

const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({
                message: "Service not found"
            });
        }

        res.status(200).json({
            message: "Service deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Error deleting service",
            error: err.message
        });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
};
