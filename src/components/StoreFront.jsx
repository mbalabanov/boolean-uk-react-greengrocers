import StoreItem from './storeitem'

import StoreItems from './storeitems'

function StoreFront(StoreItems) {
  return (
    <header id="store">
      <h1>Greengrocers</h1>
      <ul class="item-list store--item-list">
        <StoreItem />
      </ul>
    </header>
  )
}

export default StoreFront
