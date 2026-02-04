import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'

import SubmitData from "./pages/Submission"
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from './pages/logout';
import Navbar from './assets/navbar';
import UserHistory from "./pages/past_submissions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Navbar />

        <Route path="/" element={<Layout />} />
          <Route index element={<SubmitData />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/history" element={<UserHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
