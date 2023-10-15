import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {

  const avatarRef = useRef(null);

  useEffect(() => {
    if (props.isOpen) {
      avatarRef.current.value = '';
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    props.onClose();
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} name='avatar' title='Обновить аватар' buttonText="Создать">
      <div className="popup__input-span">
        <input ref={avatarRef} required id="form-avatar-link" className="popup__input popup__input_profile_subtitle" name="avatar" type="url" placeholder="Ссылка на картинку" />
        <span id="avatar-error" className="popup__error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;