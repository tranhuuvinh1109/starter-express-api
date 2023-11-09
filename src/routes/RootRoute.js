const express = require("express");
const RootController = require("../app/controllers/RootController");
const SearchController = require("../app/controllers/SearchController");
const router = express.Router();

router.get("/search/q=:query", SearchController.search);
router.get("/", RootController.index);

module.exports = router;
