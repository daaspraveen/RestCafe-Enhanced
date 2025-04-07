import React from 'react'

const RestaurantCartContext = React.createContext({
    productsContext: [],
    setProductsContext: () => {},
    removeAllCartContext: () => {},
    updateProductsContext: () => {},
    modifyCartItemQuantityContent: () => {},
    removeCartItemContext: () => {},
})

export default RestaurantCartContext