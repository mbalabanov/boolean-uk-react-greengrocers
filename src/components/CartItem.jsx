function CartItem(props) {
  const { decreaseItemQuantity, increaseItemQuantity } = props.actions
  return (
    <li>
      <img
        className="cart--item-icon"
        src={`assets/icons/${props.id}.svg`}
        alt={props.name}
      />
      <p>{props.name}</p>
      <button
        id={`decrease_${props.id}`}
        className="quantity-btn remove-btn center"
        onClick={e => decreaseItemQuantity(e.target.id)}
      >
        -
      </button>
      <span className="quantity-text center">{props.quantity}</span>
      <button
        id={`increase_${props.id}`}
        className="quantity-btn add-btn center"
        onClick={e => increaseItemQuantity(e.target.id)}
      >
        +
      </button>
    </li>
  )
}

export default CartItem
