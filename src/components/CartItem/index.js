import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import RestaurantCartContext from "../../Contexts";

import "./style.css";

const CartItem = ({ cartItemDetails }) => {
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_image: dishImage,
    cartCount: quantity,
    dish_currency: dishCurrency,
    dish_price: dishPrice,
  } = cartItemDetails;
  // console.log('cartItemDetails', cartItemDetails)
  const { modifyCartItemQuantityContent, removeCartItemContext } = useContext(
    RestaurantCartContext
  );

  const onIncreaseQty = () => modifyCartItemQuantityContent(dishId, true);

  const onDecreaseQty = () => modifyCartItemQuantityContent(dishId, false);

  const onRemoveCartItem = () => removeCartItemContext(dishId);

  return (
    <li className="cartItem-li">
      <img className="cartItem-img" src={dishImage} alt={dishName} />
      <div className="cartItem-details">
        <p className="cartItem-name">{dishName}</p>
        <p className="cartItem-price">
          {dishCurrency}
          <span>
            {dishPrice.toFixed(2,0)}
          </span>
        </p>
        <div className="cartItem-quantity-box">
          <button type="button" onClick={onDecreaseQty}>
            -
          </button>
          <p className="cartItem-quantity">{quantity}</p>
          <button type="button" onClick={onIncreaseQty}>
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="cartItem-remove-btn"
        onClick={onRemoveCartItem}
      >
        <FaRegTrashAlt />
      </button>
    </li>
  );
};

export default CartItem;
