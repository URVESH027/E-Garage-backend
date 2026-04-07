const bcrypt = require("bcrypt");
const User = require("../models/UserModel");

const DEFAULT_ADMIN = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@egarage.com",
  password: "Admin@123",
  role: "admin",
  status: "active",
};

const ensureDefaultAdmin = async () => {
  const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);

  const existingAdmin = await User.findOne({ email: DEFAULT_ADMIN.email });

  if (!existingAdmin) {
    await User.create({
      firstName: DEFAULT_ADMIN.firstName,
      lastName: DEFAULT_ADMIN.lastName,
      email: DEFAULT_ADMIN.email,
      password: hashedPassword,
      role: DEFAULT_ADMIN.role,
      status: DEFAULT_ADMIN.status,
    });
    console.log("Default admin user created.");
    return;
  }

  existingAdmin.firstName = DEFAULT_ADMIN.firstName;
  existingAdmin.lastName = DEFAULT_ADMIN.lastName;
  existingAdmin.password = hashedPassword;
  existingAdmin.role = DEFAULT_ADMIN.role;
  existingAdmin.status = DEFAULT_ADMIN.status;
  await existingAdmin.save();
  console.log("Default admin user updated.");
};

module.exports = ensureDefaultAdmin;
