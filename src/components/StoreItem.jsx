function StoreItem(props) {
  return (
    <li>
      <div className="store--item-icon" key={props.id}>
        <h2 className="store--item-name">{props.name}</h2>
        <img src={`/assets/icons/${props.id}.svg`} alt={props.price} />
        <p>Price: £{props.price}</p>
        {props.showSecret && <p className="secret">{props.secret}</p>}
      </div>
      <button onClick={props.addItemToCart} id={props.id}>
        Add to cart
      </button>
      <button onClick={e => props.toggleDetails(`${props.id}`)}>
        Toggle detail
      </button>
    </li>
  )
}

export default StoreItem
