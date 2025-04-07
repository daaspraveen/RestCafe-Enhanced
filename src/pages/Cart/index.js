import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect} from "react";

import Header from "../../components/Header";
import CartItem from '../../components/CartItem'

import CartContext from "../../Contexts";

import "./style.css";

const Cart = () => {
  const { cartList, removeAllCartItems } = useContext(
    CartContext
  );
  // console.log("cartList", cartList);
  
  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => {
    const total = cartList?.reduce((total, each) => total + (each.dish_price * each.cartCount), 0) || 0
    setTotalAmount(total)
  },[cartList])
  // console.log('totalAmount : ', totalAmount)

  const navigate = useNavigate();
  const navToHome = () => {
    navigate("/");
  };

  const doCheckoutFunc = () => {
    removeAllCartItems()
  }

  const renderEmptyView = () => (
    <div className="cart-empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
      />
      <p>Your cart is Empty.</p>
      <button type="button" onClick={navToHome}>
        Order Now
      </button>
    </div>
  );

  const renderCartItems = () => {
    return (
    <>
      <div className="cart-success-container">
        <h1>Cart Items</h1>
        <button
          type="button"
          className="removeAll-btn"
          onClick={removeAllCartItems}
        >
          {`Remove All (${cartList.length})`}
        </button>
      </div>
      <ul className="cart-prods-ul">
        {cartList.map((dish) => (
          <CartItem key={dish.dish_id} cartItemDetails={dish} />
        ))}
      </ul>
      <div className="chexkout-box">
        <p>Total Amount : SAR/- <span>{totalAmount.toFixed(2,0)}</span></p>
        <button type="button" onClick={doCheckoutFunc}>Checkout</button>
      </div>
    </>
  );
}

  return (
    <>
      <Header
        ordersList={cartList}
      />
      <div className="cart-container">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </>
  );
};

export default Cart;
