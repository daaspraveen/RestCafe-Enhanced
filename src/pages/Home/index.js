import React, {useState, useEffect, useContext} from 'react'

import {MutatingDots} from 'react-loader-spinner'
import Header from '../../components/Header'
import ProductItem from '../../components/ProductItem'
import RestaurantCartContext from '../../Contexts'

import './style.css'

// write your code here
const Home = React.memo(() => {
  const [apiData, setApiData] = useState([])
  // const [productsContext, setproductsContext] = useState([])
  const [currentTab, setCurrentTab] = useState('')

  const {productsContext, setProductsContext,updateProductsContext}= useContext(RestaurantCartContext)
  
  const setProdsDataFunc = data => {
    const prodData = [{restFoodData: data.table_menu_list, ordersList: [], restoName: data.restaurant_name}]
    setProductsContext({...prodData[0]})
    setCurrentTab(data.table_menu_list[0].menu_category)
  }

  useEffect(() => {
    const getDataFunc = async () => {
      const apiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const fetchedData = await fetch(apiUrl)
      const data = await fetchedData.json()
      // console.log('rest name', data[0], data[0].restaurant_name)
      if (data.length > 0) {
        setApiData(data[0])
        setProdsDataFunc(data[0])
      }
    }
    getDataFunc()
  }, [])

  const doUpdateTab = catName => {
    setCurrentTab(catName)
  }

  const updateOrderList = (dishId, isAdd, menuCatName) => {
    // console.log("=======",dishId, isAdd, menuCatName, productsContext)
    // Update from Context
    updateProductsContext(dishId, isAdd, menuCatName, productsContext)
  }

  return (
    <main className='container'>
      {apiData.length < 1 ? (
        <div className='loader-box' data-testid='loader'>
          <MutatingDots
            type='MutatingDots'
            width={80}
            height={80}
            color='#4fa94d'
          />
        </div>
      ) : (
        <>
          <Header
            restoName={productsContext.restoName}
            ordersList={productsContext.ordersList}
          />
          <nav className='tabs-nav'>
            <ul className='tabs-ul'>
              {productsContext.restFoodData?.map(eachCat => (
                <li
                  key={eachCat.menu_category_id}
                  className={`tab-li ${
                    currentTab === eachCat.menu_category ? 'selected-tab' : ''
                  }`}
                >
                  <button
                    type='button'
                    className={`tab-btn ${
                      currentTab === eachCat.menu_category ? 'selected-tab' : ''
                    }`}
                    onClick={() => doUpdateTab(eachCat.menu_category)}
                  >
                    {eachCat.menu_category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <ul className='products-ul'>
            {productsContext.restFoodData
              ?.filter(eachfil => eachfil.menu_category === currentTab)
              .map(eachCatData =>
                eachCatData.category_dishes.map(eachProd => (
                  <ProductItem
                    key={eachProd.dish_id}
                    prodData={eachProd}
                    ordersList={productsContext.ordersList}
                    updateOrderList={isAdd =>
                      updateOrderList(
                        eachProd.dish_id,
                        isAdd,
                        eachCatData.menu_category,
                      )
                    }
                  />
                )),
              )}
          </ul>
        </>
      )}
    </main>
  )
})

export default Home
