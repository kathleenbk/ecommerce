import { React } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { useSelector } from "react-redux";

import Pay from './components/Pay';
import Success from './components/Success';
import Home from './components/Home';
import Shop from './components/Shop';
import Product from './components/Product';
import About from './components/About';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <div className='App'>
        <nav className='d-inline'>
          <div className='message '>
            <p className='stuff'>FREE SHIPPING ON ORDERS OF $70 OR MORE</p>
          </div>
          <nav className='header d-flex justify-content-between'>
            <div className='left-nav'>
              <Link className='nav-icons' to='/shop'>Shop</Link>
              <Link className='nav-icons' to='/about'>About</Link>
            </div>
            <div>
              <h1 className='logo'><Link className='nav-title' to='/'>The Fat Tree</Link></h1>
            </div>
            <div className='d-flex right-nav'>
              <a href="https://www.instagram.com/the_fattree/" target="_blank" rel="noreferrer"><img src='https://img.icons8.com/ios/344/instagram-new--v1.png' alt='Instagram Logo' className='nav-icons-r' /></a>
              <Link to='/cart'><img src='https://cdn-icons-png.flaticon.com/512/263/263142.png' alt='Cart' className='nav-icons-r' /></Link>
              <p className='cart-number'>1</p>
            </div>
          </nav>
        </nav>
        
      </div>
      <Routes>
      <Route exact path="/"   element={user ? <Home/> : <Login />}/>
        <Route path='/about' element={<About />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:id' element={<Product />} />

        <Route path='/register' element={<Register />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
