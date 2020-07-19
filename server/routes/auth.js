const express = require("express"),
  authControllers = require("../controllers/authControllers"),
  router = express.Router();

router.post("/api/user", authControllers.registerUser);
router.post("/api/auth", authControllers.auth);

module.exports = router;
