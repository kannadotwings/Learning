const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await models.Employee.findOne({
      where: { email, status: 1 },
    });

    if (!employee) {
      return res.status(404).json({
        status: false,
        message: "Employee not found or inactive",
      });
    }

    // Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee.id, email: employee.email, role: employee.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
        token
      },
    });
  } catch (error) {
    console.error("Error during employee login:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during login",
    });
  }
};

const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await models.Employee.create({
      name,
      email,
      password: hashedPassword,
      role,
      status: 1
    });

    return res.status(201).json({
      status: true,
      message: "Employee registered successfully"
    });
  } catch (error) {
    console.error("Error during employee registration:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred during registration",
    });
  }
};

module.exports = { Login , Register};
