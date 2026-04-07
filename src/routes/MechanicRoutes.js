const router = require("express").Router();

const MechanicController = require("../controllers/MechanicController");

router.get("/", MechanicController.getAllMechanics);
router.post("/", MechanicController.createMechanic);

module.exports = router;