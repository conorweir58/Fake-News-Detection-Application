import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import SubmitData from "./pages/submission_page"
import Register from './pages/register';
import Login from './pages/login';
import Logout from './pages/logout';
import Navbar from './assets/navbar';
import User_History from "./pages/past_submissions";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<SubmitData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/history" element={<User_History/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
