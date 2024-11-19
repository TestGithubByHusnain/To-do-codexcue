import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoApp from "./components/ToDoApp";

const App = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<ToDoApp />} />
    </Routes>
  </Router>
);

export default App;

