const db = require("../config/db");

exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks WHERE user_id = ?", [req.user.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
    [title, description, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created" });
    }
  );
};

exports.deleteTask = (req, res) => {
  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task deleted" });
    }
  );
};
