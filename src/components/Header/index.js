import {IoCartOutline} from 'react-icons/io5'

import './style.css'

const Header = props => {
  const {restoName, ordersList} = props
  // console.log('ordersList in header', ordersList)

  const redirectHome = () => {
    console.log('clicked cart...')
    // const {history} = props
    // history.push('/cart')
  }

  return (
    <header className='header' data-testid='header'>
      <h1 className='header-name'>{restoName}</h1>
      <div className='header-right'>
        <p className='header-right-para'>My Orders</p>
        <button
          type='button'
          className='cart-btn'
          data-testid='cart'
          onClick={() => redirectHome()}
        >
          <IoCartOutline size={25} />
        </button>
        <span className='header-orders-count'>{ordersList?.length || 0}</span>
      </div>
    </header>
  )
}

export default Header
