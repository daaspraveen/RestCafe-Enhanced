import {IoCartOutline, IoLogOutOutline} from 'react-icons/io5'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'

import './style.css'

const Header = props => {
  const {ordersList} = props
  // console.log('ordersList in header', ordersList)
  const restoName = localStorage.getItem('restoName')
  const navigate = useNavigate()

  const redirectCart = () => {
    // console.log('clicked cart...')
    navigate("/cart")
  }
  const doLogout = () => {
    // console.log('logged out')
    Cookies.remove('login_token')
    navigate("/login")
  }

  return (
    <header className='header' data-testid='header'>
      <h1 className='header-name'>{restoName}</h1>
      <div className='header-right'>
        <button
          type='button'
          title='cart'
          className='cart-btn'
          data-testid='cart'
          onClick={() => redirectCart()}
        >
          <p>My Orders</p>
          <IoCartOutline size={25} />
          <span className='header-orders-count'>{ordersList?.length || 0}</span>
        </button>
        <button
          type='button'
          title='logout'
          className='logout-btn'
          data-testid='logout'
          onClick={() => doLogout()}
        >
          <p>Logout</p>
          <IoLogOutOutline size={25} />
        </button>
      </div>
    </header>
  )
}

export default Header
