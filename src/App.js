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

What should a cart item look like? 🤔
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

  return (
    <>
      <header id="store">
        <h1>Greengrocers</h1>
        <ul className="item-list store--item-list">
          {storeItems.map(itemInStore => (
            <StoreItem
              key={itemInStore.id}
              id={itemInStore.id}
              name={itemInStore.name}
              price={itemInStore.price}
              addItemToCart={addItemToCart}
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
