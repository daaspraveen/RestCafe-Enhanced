import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute.js";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import RestaurantCartContext from "./Contexts.js";

import "./App.css";

class App extends Component {
  state = {mainProdsData: []}

  setMainProdsData = (newProdsData) => {
    this.setState({mainProdsData: newProdsData})
    // console.log('newProdsData ', newProdsData)
  }
  
  updateMainProdsData = (dishId, isAdd, menuCatName, prevProdData) => {
    // console.log('in app function', dishId, isAdd, menuCatName, prevProdData)
    const updateOrderList = () => {
      const checkExists = prevProdData.ordersList.some(
        eachOrd => eachOrd.dish_id === dishId
      )
    
      if (!checkExists && isAdd) {
        const updatedOrdList = prevProdData.restFoodData.flatMap(each => {
          if (each.menu_category === menuCatName) {
            const dishInfo = each.category_dishes.find(
              dish => dish.dish_id === dishId
            )
            if (dishInfo) {
              return {
                ...dishInfo,
                cartCount: 1,
              }
            }
          }
          return []
        })
    
        if (updatedOrdList.length > 0) {
          return {
            ...prevProdData,
            ordersList: [...prevProdData.ordersList, ...updatedOrdList],
          }
        }
      } else {
        const newOrders = prevProdData.ordersList.map(eachOrd => {
          if (eachOrd.dish_id === dishId) {
            return {
              ...eachOrd,
              cartCount: isAdd
                ? eachOrd.cartCount + 1
                : Math.max(0, eachOrd.cartCount - 1),
            }
          }
          return eachOrd
        })
    
        return {
          ...prevProdData,
          ordersList: newOrders.filter(each => each.cartCount !== 0),
        }
      }
      return prevProdData
    }

    const finalUpdatedProdsData = updateOrderList()
    this.setState({mainProdsData: finalUpdatedProdsData})
  }

  resetMainOrdsList = () => {
    const {mainProdsData} = this.state
    const clearedOrdsData = {...mainProdsData,ordersList: []}
    // console.log('clearedOrdsData',clearedOrdsData)
    this.setMainProdsData(clearedOrdsData)
  }
  
  modifyCartItem = (dishId, isAddQuantity) => {
    // console.log("in modify cartitem : ", mainProdsData)
    this.setState(prevState => {
    const filteredOrdersData = prevState.mainProdsData.ordersList?.map(each => {
        if (each.dish_id === dishId) {
          return {...each,cartCount: isAddQuantity ? each.cartCount+1 : Math.max(each.cartCount -1, 0)}
        }
        return {...each}
      }
    ).filter(eachItem => eachItem.cartCount > 0)
    // console.log("filteredOrdersData : ", filteredOrdersData)
    return {mainProdsData : {...prevState.mainProdsData, ordersList: filteredOrdersData}}
  })
  }

  removeCartItem = (dishId) => {
    const {mainProdsData} = this.state
    const filteredOrdersData = mainProdsData.ordersList?.filter(each => each.dish_id!== dishId)
    const modifiedProdsData = {...mainProdsData,ordersList: filteredOrdersData, }
    // console.log('modifiedProdsData', modifiedProdsData)
    this.setMainProdsData(modifiedProdsData)
  }

  render() {
    const {mainProdsData} = this.state

    return (
      <BrowserRouter>
        <RestaurantCartContext.Provider value={{
          productsContext: mainProdsData,
          setProductsContext: this.setMainProdsData,
          updateProductsContext: this.updateMainProdsData,
          removeAllCartContext: this.resetMainOrdsList,
          modifyCartItemQuantityContent: this.modifyCartItem,
          removeCartItemContext: this.removeCartItem,
        }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />{" "}
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </RestaurantCartContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
