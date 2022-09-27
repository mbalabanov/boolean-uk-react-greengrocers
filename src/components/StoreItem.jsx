function StoreItem(props) {
  return (
    <li>
      <div className="store--item-icon" key={props.id}>
        <h2 className="store--item-name">{props.name}</h2>
        <img src={`/assets/icons/${props.id}.svg`} alt={props.price} />
        <p>Price: £{props.price}</p>
      </div>
      <button onClick={props.addItemToCart} id={props.id}>
        Add to cart
      </button>
    </li>
  )
}

export default StoreItem
