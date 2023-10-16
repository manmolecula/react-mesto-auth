function InfoTooltip({ img, text, isOpen, onClose }) {

    return (
        <div className={`popup ${isOpen && 'popup_active'}`} >
            <div className="popup__container">
                <img className="popup__feedback-img" src={img} width={120} alt="Результат" />
                <p className="popup__feedback-caption" >{text}</p>
                <button className="popup__close" type="button" onClick={onClose}></button>
            </div>
        </div>
    )
}

export default InfoTooltip;