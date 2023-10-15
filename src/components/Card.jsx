import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `elements__like ${isLiked && 'elements__like_active'}`
    );

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleClick() {
        const card = { link: props.link, name: props.name };
        props.onCardClick(card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="elements__el">
            {isOwn && <img src={props.trashIcon} onClick={handleCardDelete} alt="Удалить" className="elements__trash" />}
            <img onClick={handleClick} alt={props.name} id="new-img" src={props.link} className="elements__img" />
            <div className="elements__subtitle">
                <h2 id="new-place" className="elements__place">{props.name}</h2>
                <ul className="elements__likelist">
                    <button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
                    <p className="elements__like-number">{props.likes}</p>
                </ul>
            </div>
        </li>
    )
}

export default Card;