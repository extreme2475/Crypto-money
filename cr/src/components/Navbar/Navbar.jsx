import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icom from '../../assets/arrow_icon.png'
import { Coincontext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {setCurrency} = useContext(Coincontext)

  const currencyHandler=(event)=>{
switch (event.target.value){
  case "usd":{
    setCurrency({name:"usd" ,symbol:"$"})
    break;
  }
  case "eur":{
    setCurrency({name:"eur" ,symbol:"€"})
    break;
  }
  case "inr":{
    setCurrency({name:"inr" ,symbol:"₹"})
    break;
  }
  default:{
    setCurrency({name:"inr" ,symbol:"₹"})
    break;
  }
}
  }
  return (
    <div className='navbar'>
<Link to={'/'}>
      <img src={logo} alt="" className='logo'/>
      </Link>

      <ul>
        <Link to={'/'}><li>Home</li></Link>
        
        <li>
  <a href="https://www.coindesk.com/" target="_blank" rel="noopener noreferrer">
    Blog
  </a>
</li>
<li>
  <a href="https://www.moneycontrol.com/stocksmarketsindia/" target="_blank" rel="noopener noreferrer">
     Stock Market
  </a>
</li>
<li>
  <a>AI Advisor</a>
</li>

      </ul>
      <div className='nav-right'>
        <select onChange={ currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
        </select>
        <button>Sign up <img src={arrow_icom} alt=""/></button>

      </div>
    </div>
  )
}

export default Navbar
