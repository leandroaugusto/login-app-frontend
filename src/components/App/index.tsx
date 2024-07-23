import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "@/components/Login";
import PrivateRoute from "@/routes/PrivateRoute";
import Dashboard from "@/components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
