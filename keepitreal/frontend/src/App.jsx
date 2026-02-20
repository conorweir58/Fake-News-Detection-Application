import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css'

import Layout from './pages/layout/Layout';

import Submission from "./components/submission/Submission";
import Register from "./components/account_managment/Register";
import Login from "./components/account_managment/Login";
import Logout from './components/account_managment/Logout';
import UserHistory from "./components/history/UserHistory";
import ContactUs from "./components/contact/ContactUs";
import ResultsDisplay from './components/results/Results';
import FourOhFour from './pages/error/fourohfour';
import Help from './pages/help/Help';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Submission />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="/history" element={<UserHistory />} />
          <Route path="/results/direct" element={<ResultsDisplay />} />
          <Route path="/results/:id" element={<ResultsDisplay />} />
          <Route path="*" element={<FourOhFour />} />
          <Route path="/help" element={<Help />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
