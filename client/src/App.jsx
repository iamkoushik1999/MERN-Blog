// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignUp />} />
        <Route path='/sign-up' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
