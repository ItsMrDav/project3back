const express = require("express");

const commentControllers = require("../controllers/comment-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/places/:pid", commentControllers.getCommentsByPlaceId);

router.use(checkAuth);

router.post("/", commentControllers.createComment);

module.exports = router;
