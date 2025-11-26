import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;