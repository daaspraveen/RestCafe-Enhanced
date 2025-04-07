import { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute.js";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import CartContext from "./Contexts.js";
import "./App.css";

class App extends Component {
  state = { mainCartList: [] };

  removeAllCartItems = () => {
    this.setState({ mainCartList: [] });
  };

  addCartItem = (item) => {
    this.setState((prevState) => {
      const itemExists = prevState.mainCartList.find(
        (each) => each.dish_id === item.dish_id
      );
      if (itemExists) {
        const updatedCart = prevState.mainCartList.map((each) =>
          each.dish_id === item.dish_id
            ? { ...each, cartCount: each.cartCount + 1 }
            : each
        );
        return { mainCartList: updatedCart };
      } else {
        return {
          mainCartList: [...prevState.mainCartList, { ...item, cartCount: 1 }],
        };
      }
    });
  };

  removeCartItem = (dishId) => {
    this.setState((prevState) => ({
      mainCartList: prevState.mainCartList.filter(
        (each) => each.dish_id !== dishId
      ),
    }));
  };

  incrementCartItemQuantity = (dishId) => {
    this.setState((prevState) => ({
      mainCartList: prevState.mainCartList.map((each) =>
        each.dish_id === dishId
          ? { ...each, cartCount: each.cartCount + 1 }
          : each
      ),
    }));
  };

  decrementCartItemQuantity = (dishId) => {
    this.setState((prevState) => {
      const updatedCart = prevState.mainCartList
        .map((each) =>
          each.dish_id === dishId
            ? { ...each, cartCount: Math.max(each.cartCount - 1, 0) }
            : each
        )
        .filter((each) => each.cartCount > 0);
      return { mainCartList: updatedCart };
    });
  };

  render() {
    const { mainCartList } = this.state;

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList: mainCartList,
            removeAllCartItems: this.removeAllCartItems,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
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
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
