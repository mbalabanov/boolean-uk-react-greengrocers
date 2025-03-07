import './styles/reset.css'
import './styles/index.css'

import { useState } from 'react'
import initialStoreItems from './store-items'
import StoreItem from './components/StoreItem'
import CartItem from './components/CartItem'

/*
Here's what a store item should look like
{
  id: '001-beetroot',
  name: 'beetroot',
  price: 0.35
}

What should a cart item look like?
*/

// console.log(initialStoreItems)

export default function App() {
  // Setup state here...
  const [storeItems, setStoreItems] = useState(initialStoreItems)
  const [cartItems, setCartItems] = useState([])

  const addItemToCart = targetItem => {
    const foundItemInStore = storeItems.find(itemInStore => {
      return itemInStore.id === targetItem.target.id
    })

    const itemInCart = cartItems.find(itemInCart => {
      return itemInCart.id === targetItem.target.id
    })

    if (itemInCart) {
      itemInCart.quantity++
      setCartItems([...cartItems])
    } else {
      let newCartItem = { ...foundItemInStore, quantity: 1 }
      setCartItems([...cartItems, newCartItem])
    }
  }

  const calculateTotalPrice = () => {
    let currentTotal = 0
    cartItems.map(itemInCart => {
      currentTotal += itemInCart.quantity * itemInCart.price
    })
    return currentTotal.toFixed(2)
  }

  const increaseItemQuantity = targetId => {
    const idToIncrease = targetId.split('_')

    const itemInCart = cartItems.find(itemInCart => {
      return itemInCart.id === idToIncrease[1]
    })
    itemInCart.quantity++
    setCartItems([...cartItems])
  }

  const decreaseItemQuantity = targetId => {
    const idToDecrease = targetId.split('_')

    const itemInCart = cartItems.find(itemInCart => {
      return itemInCart.id === idToDecrease[1]
    })
    itemInCart.quantity--
    if (itemInCart.quantity === 0) {
      const reducedCart = cartItems.filter(itemInCart => {
        return itemInCart.id !== idToDecrease[1]
      })
      setCartItems([...reducedCart])
    } else {
      setCartItems([...cartItems])
    }
  }

  const filterStoreby = filterType => {
    const filteredStore = initialStoreItems.filter(itemInStore => {
      return itemInStore.type === filterType
    })
    setStoreItems([...filteredStore])
  }

  const resetFilter = () => {
    setStoreItems([...initialStoreItems])
  }

  const sortAscending = criteria => {
    const sortedItems = storeItems.sort((a, b) =>
      a[criteria] > b[criteria] ? 1 : -1
    )
    setStoreItems([...sortedItems])
  }

  const sortDescending = criteria => {
    const sortedItems = storeItems.sort((a, b) =>
      a[criteria] < b[criteria] ? 1 : -1
    )
    setStoreItems([...sortedItems])
  }

  const toggleDetails = targetItemId => {
    const updatedItemShowSecrets = allItems =>
      storeItems.map(individualItem =>
        individualItem.id === targetItemId
          ? { ...individualItem, showSecret: !individualItem.showSecret }
          : individualItem
      )
    setStoreItems(updatedItemShowSecrets)
  }

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <p className="filters">
          Filter by:
          <button onClick={event => filterStoreby('Fruit')}>Fruit</button>
          <button onClick={event => filterStoreby('Vegetable')}>
            Vegetables
          </button>
          <button onClick={event => resetFilter()}>Reset filter/sorting</button>
        </p>
        <p className="filters">
          Sort by:
          <button onClick={event => sortAscending('price')}>
            Price descending
          </button>
          <button onClick={event => sortDescending('price')}>
            Price Ascending
          </button>
          <button onClick={event => sortAscending('name')}>
            Alphabetic order
          </button>
          <button onClick={event => sortDescending('name')}>
            Reverse alphabetic order
          </button>
        </p>

        <ul className="item-list store--item-list">
          {storeItems.map(itemInStore => (
            <StoreItem
              key={itemInStore.id}
              id={itemInStore.id}
              name={itemInStore.name}
              secret={itemInStore.secret}
              showSecret={itemInStore.showSecret}
              price={itemInStore.price}
              addItemToCart={addItemToCart}
              toggleDetails={toggleDetails}
            />
          ))}
        </ul>
      </header>
      <main id="cart">
        <h2>Your Cart</h2>
        <div className="cart--item-list-container">
          <ul className="item-list cart--item-list">
            {cartItems.map(itemInCart => (
              <CartItem
                key={itemInCart.id}
                id={itemInCart.id}
                name={itemInCart.name}
                price={itemInCart.price}
                quantity={itemInCart.quantity}
                addItemToCart={addItemToCart}
                actions={{ increaseItemQuantity, decreaseItemQuantity }}
              />
            ))}
          </ul>
        </div>
        <div className="total-section">
          <div>
            <h3>Total</h3>
          </div>
          <div>
            <span className="total-number">£{calculateTotalPrice()}</span>
          </div>
        </div>
      </main>
      <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/icongeek26"
          title="Icongeek26"
        >
          Icongeek26
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </>
  )
}
