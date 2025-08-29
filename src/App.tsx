import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./modules/sidebar/Sidebar";
import UserPage from "./modules/user/pages/UserPage";
import LoginPage from "./modules/auth/pages/LoginPage";
import SignUpPage from "./modules/auth/pages/SignUpPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <div className="items-center justify-center">
          <Routes>
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>

        {/* Sidebar (always visible) */}

        {/* Page Content */}
        <div className="flex-1 p-4">
          <Routes>
            <Sidebar />

            <Route path="/user" element={<UserPage />} />
            {/* add more routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
