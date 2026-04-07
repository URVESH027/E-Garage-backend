const router = require("express").Router()
const userController = require("../controllers/UserController")
router.get("/user",userController.getAllUser)
router.post("/create", userController.createUser)
router.post("/login", userController.loginUser)
router.post("/forgotpassword", userController.forgotPassword)
router.put("/resetpassword/:token", userController.resetPassword)
module.exports = router
