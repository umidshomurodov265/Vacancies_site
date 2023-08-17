const { Router } = require("express");
const router = Router();

const AuthMiddleware = require("../middlewares/auth.middleware");
const AuthService = require("../services/auth.service");

const authMiddleware = new AuthMiddleware();
const authService = new AuthService();
const Validator = require("email-validator");
const PassValidator = require("password-validator");

// Create a schema
var schema = new PassValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(2) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
// Register route
router.post("/register", authMiddleware.register, async (req, res) => {
  try {
    if (
      Validator.validate(req.body.username) &&
      schema.validate(req.body.password)
    ) {
      const result = await authService.register(req.body);
      res.json(result);
      if (req.body.role !== "admin") {
        res.redirect("/explore");
      }
    } else {
      res.json({ status: "bad", msg: "Email is invalid or password !" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// Login route
router.post("/login", authMiddleware.login, async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// Admin login
router.post("/admin", authMiddleware.admin, async (req, res) => {
  try {
    const result = await authService.admin(req.body);

    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
