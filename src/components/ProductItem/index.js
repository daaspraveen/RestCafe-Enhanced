// import React from 'react'
import React,{useState, useEffect} from 'react'
import './style.css'

const ProductItem = React.memo((props) => {
  const {prodData, ordersList, updateOrderList} = props
  // console.log('prod item', prodData)
  // console.log('ordersList in pd : ', ordersList)
  const [cartCount, setCartCount] = useState(0)

  const pd = {
    dishType: prodData.dish_Type,
    dishName: prodData.dish_name,
    dishCurrency: prodData.dish_currency,
    dishPrice: prodData.dish_price,
    dishDescription: prodData.dish_description,
    dishAvailability: prodData.dish_Availability,
    addonCat: prodData.addonCat,
    dishCalories: prodData.dish_calories,
    dishImage: prodData.dish_image,
    dishId: prodData.dish_id,
  }

  useEffect(() => {
    const haveInOrdList = ordersList.find(each => each.dish_id === pd.dishId)
    setCartCount(haveInOrdList ? haveInOrdList.cartCount : 0)
  }, [ordersList, pd.dishId])

  const updOrderL = isAdd => {
    updateOrderList(isAdd)
  }
  // console.log('pd from pitem :', pd)
  // console.log('pd', pd.dishName)
  const styleFoodCodeFunc = foodType => {
    switch (foodType) {
      case 1:
        return 'nonVeg'
      case 2:
        return 'veg'
      case 3:
        return 'veg-nonVeg'
      default:
        return ''
    }
  }
  const styleFoodCode = styleFoodCodeFunc(pd.dishType)

  return (
    <li className='prod-li'>
      <div className={`food-code-box ${styleFoodCode}-item`}>
        <span className='food-code-circle'>.</span>
      </div>
      <div className='food-Item-content'>
        <h3 className='food-name'>{pd.dishName}</h3>
        <p className='food-price'>
          {pd.dishCurrency} {pd.dishPrice}
        </p>
        <p className='food-desc'>{pd.dishDescription}</p>
        {pd.dishAvailability ? (
          <div className='food-quantity-box'>
            <button
              type='button'
              data-testid={`${pd.dishId}-increament-button`}
              onClick={() => updOrderL(false)}
              className='food-quant-btn'
            >
              -
            </button>
            <span className='food-quantity'>{cartCount}</span>
            <button
              type='button'
              data-testid={`${pd.dishId}-decreament-button`}
              onClick={() => updOrderL(true)}
              className='food-quant-btn'
            >
              +
            </button>
          </div>
        ) : (
          <p className='food-not-avail'>Not available</p>
        )}
        {pd.addonCat.length > 0 && (
          <p className='food-custom-avail'>Customizations available</p>
        )}
      </div>
      <p className='food-cal'>{pd.dishCalories} calories</p>
      <img src={pd.dishImage} alt={pd.dishName} className='food-img' loading='lazy' />
    </li>
  )
}
)

export default ProductItem
