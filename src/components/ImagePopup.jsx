function ImagePopup(props) {
  return (
    <section id="popup-img" className={props.card === null ? "popup popup_place_img" : "popup popup_place_img popup_active"}>
      <div className="popup__img-container">
        <button onClick={props.onClose} id="close-img" type="button" className="popup__close popup__close_place_img"></button>
        <figure className="popup__figure">
          <img src={props.card && props.card.link} alt={props.card && props.card.name} className="popup__img" />
          <figcaption className="popup__caption">{props.card && props.card.name}</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default ImagePopup;