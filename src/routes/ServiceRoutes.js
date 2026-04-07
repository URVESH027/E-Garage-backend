const router = require("express").Router();
const ServiceController = require("../controllers/ServiceController");
const upload = require("../midleware/UploadMidleware");

router.post("/", upload.single("image"), ServiceController.createService);
router.get("/", ServiceController.getAllServices);
router.get("/:id", ServiceController.getServiceById);
router.put("/:id", ServiceController.updateService);
router.delete("/:id", ServiceController.deleteService);

module.exports = router;
