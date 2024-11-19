import React, { useState } from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./animations.css";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("");

  const addTask = () => {
    if (newTask && category) {
      setTasks([...tasks, { id: Date.now(), text: newTask, category }]);
      setNewTask("");
      setCategory("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const categories = [...new Set(tasks.map((task) => task.category))];

  return (
    <div className="todo-app">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Enhanced To-Do List
      </motion.h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addTask}
        >
          Add Task
        </motion.button>
      </div>
      <div className="categories">
        <h2>Categories</h2>
        <Link to="/">All</Link>
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            {cat}
          </Link>
        ))}
      </div>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} removeTask={removeTask} />} />
        <Route
          path="/category/:category"
          element={<CategoryTaskList tasks={tasks} removeTask={removeTask} />}
        />
      </Routes>
    </div>
  );
};

const TaskList = ({ tasks, removeTask }) => (
  <motion.div layout className="task-list">
    <AnimatePresence>
      {tasks.map((task) => (
        <Task key={task.id} task={task} removeTask={removeTask} />
      ))}
    </AnimatePresence>
  </motion.div>
);

const CategoryTaskList = ({ tasks, removeTask }) => {
  const { category } = useParams();
  const filteredTasks = tasks.filter((task) => task.category === category);

  return (
    <motion.div layout className="task-list">
      <AnimatePresence>
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} removeTask={removeTask} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const Task = ({ task, removeTask }) => (
  <motion.div
    className="task"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <span>{task.text}</span>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => removeTask(task.id)}
    >
      Delete
    </motion.button>
  </motion.div>
);

export default ToDoApp;
