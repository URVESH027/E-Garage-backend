const router = require("express").Router();

const VehicleController = require("../controllers/VehicleController");

// CREATE
router.post("/", VehicleController.createVehicle);

// READ
router.get("/", VehicleController.getAllVehicles);

// READ BY ID
router.get("/:id", VehicleController.getVehicleById);

// UPDATE
router.put("/:id", VehicleController.updateVehicle);

// DELETE
router.delete("/:id", VehicleController.deleteVehicle);

module.exports = router;