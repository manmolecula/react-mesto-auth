import { useEffect, useState, useContext } from "react";
import Card from "./Card";
import trashIconImg from '../images/Trash.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div onClick={props.onEditAvatar} className="profile__overlay">
                    <img src={currentUser?.avatar} alt="Фото профиля" className="profile__avatar" />
                </div>
                <div className="profile__profile-info">
                    <div className="profile__profile-title">
                        <h1 className="profile__name">{currentUser?.name}</h1>
                        <button onClick={props.onEditProfile} type="button" className="profile__edit-btn"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser?.about}</p>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-btn"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {props.cards?.map((card) => (
                        <Card card={card} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} onCardClick={props.onCardClick} key={card._id} link={card.link} name={card.name} likes={card.likes.length} trashIcon={trashIconImg} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;