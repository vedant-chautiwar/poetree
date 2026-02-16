const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/poemController");

router.post("/", auth, c.createPoem);
router.get("/", c.getPoem);
router.patch("/like/:id", auth, c.likePoem);

module.exports = router;