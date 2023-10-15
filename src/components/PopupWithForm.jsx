function PopupWithForm(props) {
    return (
        <>
            <section id={`popup-${props.name}`} className={props.isOpen ? "popup popup_active" : "popup"}>
                <div className={props.name === 'sure' ? "popup__sure-container" : "popup__container"} >
                    <button onClick={props.onClose} id={`close-${props.name}`} type="button" className={props.name === 'sure' ? "popup__close popup__close_sure-padding" : "popup__close"}></button>
                    <h2 className={props.name === 'sure' ? "popup__sure-title" : "popup__title"}>{props.title}</h2>
                    <form onSubmit={props.onSubmit} id={`form-${props.name}`} name={`form-${props.name}`} className="popup__form">
                        {props.children}
                        <button className={props.name === 'sure' ? 'popup__sure-btn' : "popup__btn"} type="submit">{props.buttonText}</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default PopupWithForm;