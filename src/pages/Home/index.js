import React, {useState, useEffect} from 'react'

import {MutatingDots} from 'react-loader-spinner'
import Header from '../../components/Header'
import ProductItem from '../../components/ProductItem'
import './style.css'

// write your code here
const Home = React.memo(() => {
  const [apiData, setApiData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [currentTab, setCurrentTab] = useState('')

  const setProdsDataFunc = data => {
    // console.log('inProd Func')
    const prodData = [{restFoodData: data.table_menu_list, ordersList: []}]
    // console.log('prodData : ', {...prodData[0]})
    // console.log('orderslist : ', prodData[0].ordersList)
    setProductsData({...prodData[0]})
    setCurrentTab(data.table_menu_list[0].menu_category)
  }

  useEffect(() => {
    const getDataFunc = async () => {
      const apiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const fetchedData = await fetch(apiUrl)
      const data = await fetchedData.json()
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
    // console.log('dishId, isAdd, menuCatName ::: ', dishId, isAdd, menuCatName)

    setProductsData(prev => {
      const checkExists = prev.ordersList.some(
        eachOrd => eachOrd.dish_id === dishId,
      )
      if (!checkExists && isAdd) {
        const updatedOrdList = prev.restFoodData.flatMap(each => {
          if (each.menu_category === menuCatName) {
            const dishInfo = each.category_dishes.find(
              dish => dish.dish_id === dishId,
            )
            if (dishInfo) {
              // console.log('dishInfo : ', dishInfo)
              return {
                ...dishInfo,
                cartCount: isAdd ? 1 : 0,
              }
            }
          }
          return []
        })
        // console.log('updatedOrdList : ', updatedOrdList)

        if (updatedOrdList.length > 0) {
          return {
            ...prev,
            ordersList: [...prev.ordersList, ...updatedOrdList],
          }
        }
      } else {
        const newOrdL = prev.ordersList.map(eachOrd => {
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
        // console.log('newOrdL : ', newOrdL)
        return {
          ...prev,
          ordersList: newOrdL.filter(each => each.cartCount !== 0),
        }
      }
      return prev
    })
    // console.log('new Ord', productsData.ordersList)
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
            restoName={apiData.restaurant_name}
            ordersList={productsData.ordersList}
          />
          <nav className='tabs-nav'>
            <ul className='tabs-ul'>
              {productsData.restFoodData?.map(eachCat => (
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
            {productsData.restFoodData
              ?.filter(eachfil => eachfil.menu_category === currentTab)
              .map(eachCatData =>
                eachCatData.category_dishes.map(eachProd => (
                  <ProductItem
                    key={eachProd.dish_id}
                    prodData={eachProd}
                    ordersList={productsData.ordersList}
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
