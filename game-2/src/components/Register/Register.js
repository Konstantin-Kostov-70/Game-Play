import { Link, useNavigate } from 'react-router-dom'
import * as userServices from '../../services/userServices'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

export const Register = () => {
    const navigate = useNavigate()
    const {userLogin} = useContext(AuthContext)
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const registerData = Object.fromEntries(new FormData(ev.target))
        const loginData = {
            username: registerData.username,
            password: registerData.password
        }
        userServices.userRegister(registerData)
        .then(status => {
            status === 201 
            ? userServices.logUser(loginData)
              .then(res => {
                userLogin(res)
              })              
            : console.log(status);
        })
        ev.target.reset()
        navigate('/')
    }

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="username">Username:</label>
                    <input type="text" id="email" name="username" placeholder="Your username" />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password" id="register-password" />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" name="password2" id="confirm-password" />

                    <input className="btn submit" type="submit" value="Register" />

                    <p className="field">
                        <span>If you already have profile click <Link to={'/login'}>here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}