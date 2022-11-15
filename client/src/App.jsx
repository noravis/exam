import Back from "../src/Components/Back/Back";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "../Components/Front";
import LoginPage from "../Components/LoginPage";
import LogoutPage from "../Components/LogoutPage";
import RequireAuth from "../Components/RequireAuth";
import SignUp from "../Components/Front/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes className="navbar">
        <Route index element={<Front show="all" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="children" element={<Front show="children" />} />
        <Route path="drama" element={<Front show="drama" />} />
        <Route path="scifi" element={<Front show="sci-fi" />} />
        <Route path="romance" element={<Front show="romance" />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Back />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
