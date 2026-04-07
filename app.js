const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
const DBconnection = require("./src/utils/DBconnection");
DBconnection();

// Routes
const userRoutes = require("./src/routes/UserRoutes");
app.use("/user", userRoutes);

const vehicleRoutes = require("./src/routes/VehicleRoutes");
app.use("/vehicle", vehicleRoutes);

const serviceRoutes = require("./src/routes/ServiceRoutes");
app.use("/service", serviceRoutes);

const bookingRoutes = require("./src/routes/BookingRoutes");
app.use("/booking", bookingRoutes);

const mechanicRoutes = require("./src/routes/MechanicRoutes");
app.use("/mechanic", mechanicRoutes);

const reviewRoutes = require("./src/routes/ReviewRoutes");
app.use("/review", reviewRoutes);

const paymentRoutes = require("./src/routes/PaymentRoutes");
app.use("/payment", paymentRoutes);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
