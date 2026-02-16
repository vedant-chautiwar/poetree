const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/userController");

router.post("/follow/:id", auth, c.follow);
router.get("/search/:username", c.search);
router.get("/:id", c.profile);

module.exports = router;