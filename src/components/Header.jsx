import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Место" className="header__logo" />
            <Routes>
                <Route path='/sign-up' element={
                    <Link to='/sign-in' className='header__back-to'>Войти</Link>
                }/>
                <Route path='/sign-in' element={
                    <Link to='/sign-up' className='header__back-to'>Регистрация</Link>
                }/>
            </Routes>
        </header>
    )
}

export default Header;