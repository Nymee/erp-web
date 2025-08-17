import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import UserPage from "./modules/user/pages/UserPage";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar (always visible) */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/user" element={<UserPage />} />
            {/* add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
