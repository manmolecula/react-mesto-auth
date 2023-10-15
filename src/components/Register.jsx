import { useState } from "react";
import { Link } from 'react-router-dom';
function Register() {

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    return (

        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form">
                <input
                    className="register__input" required onChange={handleChange} value={formValue.email}  type="email" name="email" placeholder="Email" minLength="2" maxLength="20"/>
                <input
                    className="register__input" required onChange={handleChange} value={formValue.password} type="text" name="password" placeholder="Пароль" minLength="2" maxLength="20"/>
                <button className="register__submit" type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <p className="register__sign-in-check">
                Уже зарегистрированы?
                <Link to="/sign-in" className="register__link">Войти</Link>
            </p>
        </div>
    )
}
export default Register;