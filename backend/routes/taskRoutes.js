const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getTasks, createTask, deleteTask } = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;
