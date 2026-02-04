import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'

import Navbar from './assets/navbar';

import SubmitData from "./components/submission/Submission";
import Register from "./components/account_managment/Register";
import Login from "./components/account_managment/Login";
import Logout from './components/account_managment/Logout';
import UserHistory from "./components/history/UserHistory";

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
