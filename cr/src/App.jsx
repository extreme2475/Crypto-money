import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Home/Coin/Coin';
import Footer from './components/Footer/footer';
import Advisor from './pages/Home/Advisor/Advisor'; // Already imported, now we use it

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        {/* Added the route for Advisor below */}
        <Route path='/advisor' element={<Advisor />} />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;