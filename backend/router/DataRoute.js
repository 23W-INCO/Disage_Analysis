const express = require("express");
const DataController = require("../controller/DataController");

const router = express.Router();

router.get("/:disease", DataController);

module.exports = router;
