import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import SubmitData from "./pages/SubmissionPage"
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<SubmitData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
