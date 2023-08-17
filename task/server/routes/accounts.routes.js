const { Router } = require("express");
const router = Router();
const Validator = require("email-validator");

const AccountService = require("../services/accounts.service");
const TokenMiddleware = require("../middlewares/token.middleware");
const AccountMiddleware = require("../middlewares/account.middleware");

const { checkAll, checkPrivacy, checkAdmin } = new TokenMiddleware();
const { update } = new AccountMiddleware();
const accountService = new AccountService();

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

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await accountService.getUsers();
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// update account
router.put("/:id", update, async (req, res) => {
  try {
    if (Validator.validate(req.body.account.username)) {
      const result = await accountService.update({
        id: req.params.id,
        account: req.body.account,
      });
      res.json(result);
    } else {
      res.json({ status: "bad", msg: "Email is invalid !" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

// get user
router.get("/:id", async (req, res) => {
  try {
    const result = await accountService.getUser(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const result = await accountService.deleteUser(req.params.id);
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
