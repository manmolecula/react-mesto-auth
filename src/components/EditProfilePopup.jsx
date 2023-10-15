import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useState, useEffect, useContext } from "react";
function EditProfilePopup(props) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        if (currentUser !== null) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
        props.onClose();
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='edit' title='Редактировать профиль' buttonText="Сохранить">
            <div className="popup__input-span">
                <input onChange={handleChangeName} value={name || 'Имя пользователя'} required minLength="2" maxLength="40" id="form-name" className="popup__input popup__input_profile_name" name="name" type="text" placeholder="Введите новое имя" />
                <span id="name-error" className="popup__error"></span>
            </div>
            <div className="popup__input-span">
                <input onChange={handleChangeDescription} value={description || 'Описание'} required minLength="2" maxLength="200" id="form-sub" className="popup__input popup__input_profile_subtitle" name="info" type="text" placeholder="Введите новое описание" />
                <span id="info-error" className="popup__error"></span>
            </div>
        </PopupWithForm>
    );
}
export default EditProfilePopup;