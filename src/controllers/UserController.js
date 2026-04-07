const crypto = require("crypto")
const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")

const sanitizeUser = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    status: user.status
})

const createUser = async (req, res) => {
    try {
        const existingUser = await userSchema.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(409).json({
                message: "email already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const savedUser = await userSchema.create({
            ...req.body,
            password: hashedPassword
        })

        res.status(201).json({
            message: "user created successfully",
            savedUser: sanitizeUser(savedUser)
        })
    } catch (err) {
        res.status(500).json({
            message: "error while creating user",
            err: err.message
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await userSchema.find().select("-password -resetPasswordToken -resetPasswordExpires")
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: "error while fetching users",
            err: err.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            })
        }

        const user = await userSchema.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (user.status && user.status !== "active") {
            return res.status(403).json({
                message: "your account is not active"
            })
        }

        let isPasswordValid = false

        // Newer users have bcrypt-hashed passwords. Older records may still have plain text.
        if (typeof user.password === "string" && user.password.startsWith("$2")) {
            isPasswordValid = await bcrypt.compare(password, user.password)
        } else {
            isPasswordValid = password === user.password

            // If an old plain-text password matches, upgrade it to a hashed password now.
            if (isPasswordValid) {
                user.password = await bcrypt.hash(password, 10)
                await user.save()
            }
        }

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "invalid credentials"
            })
        }

        res.status(200).json({
            message: "login successful",
            user: sanitizeUser(user)
        })
    } catch (err) {
        res.status(500).json({
            message: "error while logging in",
            err: err.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                message: "email is required"
            })
        }

        const user = await userSchema.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        const resetToken = crypto.randomBytes(24).toString("hex")
        const resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000)

        user.resetPasswordToken = resetToken
        user.resetPasswordExpires = resetPasswordExpires
        await user.save()

        res.status(200).json({
            message: "reset link generated successfully",
            resetToken,
            resetLink: `http://localhost:5173/reset-password/${resetToken}`,
            expiresAt: resetPasswordExpires
        })
    } catch (err) {
        res.status(500).json({
            message: "error while generating reset link",
            err: err.message
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params
        const { password } = req.body

        if (!password) {
            return res.status(400).json({
                message: "new password is required"
            })
        }

        const user = await userSchema.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() }
        })

        if (!user) {
            return res.status(400).json({
                message: "reset link is invalid or expired"
            })
        }

        user.password = await bcrypt.hash(password, 10)
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        await user.save()

        res.status(200).json({
            message: "password reset successful"
        })
    } catch (err) {
        res.status(500).json({
            message: "error while resetting password",
            err: err.message
        })
    }
}

module.exports = {
    createUser,
    getAllUser,
    loginUser,
    forgotPassword,
    resetPassword
}
