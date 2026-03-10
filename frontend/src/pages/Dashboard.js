import React, { useState, useEffect, useCallback } from "react";
import API from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const token = localStorage.getItem("token");

  // Use useCallback to prevent unnecessary recreations of the function
  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` } // Added 'Bearer ' prefix
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [fetchTasks, token]);

  const addTask = async () => {
    if (!task) return;
    try {
      await API.post("/tasks",
        { title: task, description: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTask("");
      fetchTasks();
    } catch (err) {
      console.error("Add Task Error:", err.response?.data || err.message);
      console.log("REAL ERROR MESSAGE:", err.response?.data?.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <input 
        value={task} 
        onChange={e => setTask(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id || t._id}> {/* MySQL uses .id, MongoDB uses ._id */}
            {t.title}
            <button onClick={() => deleteTask(t.id || t._id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;