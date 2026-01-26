import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'
import SubmitData from "./pages/submission_page"
import Register from './pages/register';
import Login from './pages/login';

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
