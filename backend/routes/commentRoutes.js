const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/commentController");

router.post("/", auth, c.addComment);
router.get("/:poemId", c.getComments);

module.exports = router;