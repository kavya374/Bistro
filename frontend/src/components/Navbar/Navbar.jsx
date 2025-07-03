import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from './../../assets/assets';
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from './../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState('home');

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  return (
    <div className='navbar'>
       <Link to='/'> <h1>Bistro</h1></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=> setMenu('home')} className={menu === 'home'?'active':''}>home</Link>
            <Link to='/menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>menu</Link>
<Link to='/#about' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>about us</Link>
<Link to='/#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>contact us</Link>

        </ul>
      <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'>
                <i className="bi bi-cart-check-fill icon"></i></Link>
                <div className={getTotalCartAmount()===0?'':'dot'}></div>
            </div>
            {!token?<button onClick={()=> setShowLogin(true)}>sign in</button>
            :<div className='navbar-profile'>
              <i className="bi bi-person-circle"></i>
              
              <ul className="nav-profile-dropdown">
                <li onClick={()=> navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />  
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
            }
              </div> 
    </div>
  )
}

export default Navbar