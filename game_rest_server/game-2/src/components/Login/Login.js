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
        <section  className="login register page auth">
            <form className='log-reg' onSubmit={onSubmit}>

                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Your username" 
                        autoComplete="username"
                    />

                    <label htmlFor="login-password">Password:</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        name="password" 
                        autoComplete="current-password"
                        />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
                <p className="field">
                    <span>Don't have profile click <Link to={'/register'}>here</Link></span>
                </p>
            </form>
        </section>
    )
}