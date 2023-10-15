import { useState } from "react";
import { Link } from 'react-router-dom';
function Login() {

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

        <div className="login">
            <h2 className="login__title">Войти</h2>
            <form className="login__form">
                <input
                    className="login__input" required onChange={handleChange} value={formValue.email}  type="email" name="email" placeholder="Email" minLength="2" maxLength="20"/>
                <input
                    className="login__input" required onChange={handleChange} value={formValue.password} type="text" name="password" placeholder="Пароль" minLength="2" maxLength="20"/>
                <button className="login__submit" type="submit">
                    Вход
                </button>
            </form>
        </div>
    )
}
export default Login;