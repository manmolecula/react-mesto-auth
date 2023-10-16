import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Api } from '../utils/api';
import configApi from '../utils/const';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Success from '../images/Success.svg';
import Fail from '../images/Fail.svg';
import * as auth from '../utils/auth.js';


function App() {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const api = new Api(configApi);

  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const firstLogin = (jwt) => {
    return auth.checkToken(jwt)
      .then(() => {
        if (jwt) {
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      firstLogin(token);
    }
  }, []);

  const handleLogin = (password, email) => {
    return auth.login(password, email)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('email', email);
          navigate('/')
        }
      })
      .catch((err) => console.log(err))
  }

  const handleRegister = (password, email) => {
    return auth.register(password, email)
      .then((res) => {
        if (res.data) {
          setIsTooltipOpen(true);
          setIsTooltipSuccess(true);
          navigate('/sign-in');
        }
      })
      .catch((err) => {
        setIsTooltipOpen(true);
        setIsTooltipSuccess(false);
        console.log(err);
      })
      .finally(() => {

      });
  }

  const handleExit = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    setLoggedIn(false);
  }

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.error(err));
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => console.log(err));
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.editProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsEditProfilePopupOpen(false);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter(item => item._id !== card._id);
        });
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api.editProfileAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsEditAvatarPopupOpen(false);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsAddPlacePopupOpen(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpen(false);
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="root">
          <Header onExit={handleExit} />
          <Routes>
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={loggedIn ?
              <ProtectedRouteElement
                loggedIn={loggedIn}
                cards={cards}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                element={Main} />
              :
              <Navigate to='/sign-in' replace />} />
          </Routes>

          {loggedIn && <Footer />}

          <AddPlacePopup onAddPlaceCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

          <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

          <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

          <PopupWithForm name='sure' title='Вы уверены?' onClose={closeAllPopups} buttonText="Да">
          </PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups} img={`${isTooltipSuccess ? Success : Fail}`} text={`${isTooltipSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
