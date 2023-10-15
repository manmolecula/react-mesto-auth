import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (props.isOpen) {
            setName('');
            setLink('');
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlaceCard({
            name,
            link,
        });
        props.onClose();
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='add' title='Новое место' buttonText="Создать">
            <div className="popup__input-span">
                <input onChange={handleChangeName} value={name} required minLength="2" maxLength="30" id="form-title" className="popup__input popup__input_profile_name" name="title" type="text" placeholder="Название" />
                <span id="title-error" className="popup__error"></span>
            </div>
            <div className="popup__input-span">
                <input onChange={handleChangeLink} value={link} required id="form-link" className="popup__input popup__input_profile_subtitle" name="link" type="url" placeholder="Ссылка на картинку" />
                <span id="link-error" className="popup__error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;