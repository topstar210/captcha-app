import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import DefaultLayout from './layout/DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<DefaultLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;