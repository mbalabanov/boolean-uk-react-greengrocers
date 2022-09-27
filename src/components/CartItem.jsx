function CartItem(props) {
  return (
    <li>
      <img
        className="cart--item-icon"
        src={`assets/icons/${props.id}.svg`}
        alt={props.name}
      />
      <p>{props.name}</p>
      <button className="quantity-btn remove-btn center">-</button>
      <span className="quantity-text center">{props.quantity}</span>
      <button className="quantity-btn add-btn center">+</button>
    </li>
  )
}

export default CartItem
