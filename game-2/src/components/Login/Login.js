import { Link, useNavigate } from 'react-router-dom'
import * as userServices from '../../services/userServices'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

export const Login = () => {
    const navigate = useNavigate()
    const {userLogin} = useContext(AuthContext)
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const loginData = Object.fromEntries(new FormData(ev.target))
        userServices.logUser(loginData)
        .then(res => userLogin(res))
        
        ev.target.reset()
        navigate('/')
    }

    return (
        <section id="login-page" className="auth">
            <form id="login" onSubmit={onSubmit}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="email" name="username" placeholder="Your username" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to={'/register'}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}