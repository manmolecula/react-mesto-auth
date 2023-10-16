import { useState, useEffect } from "react";
function Login(props) {

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    });

    useEffect(() => {
        setFormValue({email: '', password: ''});
      }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const handleSubmit  = (e) => {
        e.preventDefault();
        if (formValue.email && formValue.password) {
          props.onLogin(formValue.password, formValue.email)
          .then(() => {
            setFormValue({email: '', password: ''});
          })
        }
      }

    return (

        <div className="login">
            <h2 className="login__title">Войти</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input
                    className="login__input" required onChange={handleChange} value={formValue.email} type="email" name="email" placeholder="Email" minLength="2" maxLength="40" />
                <input
                    className="login__input" required onChange={handleChange} value={formValue.password} type="text" name="password" placeholder="Пароль" minLength="2" maxLength="40" />
                <button onClick={handleSubmit} className="login__submit" type="submit">
                    Вход
                </button>
            </form>
        </div>
    )
}
export default Login;