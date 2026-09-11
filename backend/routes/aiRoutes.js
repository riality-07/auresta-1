const express = require("express");

const {
  chatWithAurestaAgent
} = require("../controllers/aiController");

const router = express.Router();

router.post("/chat", chatWithAurestaAgent);

module.exports = router;
