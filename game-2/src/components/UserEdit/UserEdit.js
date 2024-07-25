import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import * as services from '../../services/userServices'
import { AuthContext } from '../../contexts/authContext'

export const UserEdit = () => {
    const { id } = useParams()
    const { auth } = useContext(AuthContext)
    const token = auth.token
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '',
        email: '',
        rank: '',
        firstName: '',
        lastName: '',
        image: '',
        story: ''
    })

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        services.getUser(token, id)
           
            .then(res => setUser({
                username: res.user.username,
                email: res.user.email,
                rank: res.user.rank,
                firstName: res.user.first_name,
                lastName: res.user.last_name,
                image: res.user.image,
                story: res.user.story
            }))
    }, [token, id, navigate])

    const onChange = (ev) => {
        setUser(state => ({
            ...state,
            [ev.target.name]: ev.target.value
        }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        services.EditUser(token,id, user)
            .then(res => console.log(res))
        navigate(`/profile/${id}`)
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Profile</h1>
                    <label htmlFor="leg-title">Username:</label>
                    <input
                        type="text"
                        id="title"
                        name="username"
                        value={user.username}
                        onChange={onChange}
                    />

                    <label htmlFor="leg-title">Email:</label>
                    <input
                        type="text"
                        id="title"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                    />

                    <label htmlFor="rank">Rank:</label>
                    <select
                        type="text"
                        id="rank"
                        name="rank"
                        value={user.rank}
                        onChange={onChange}
                    >
                        <option value={'Gamer'}>Gamer</option>
                        <option value={'Super Gamer'}>Super Gamer</option>
                        <option value={'Top Gamer'}>Top Gamer</option>
                        <option value={'Genius'} >Genius</option>
                    </select>

                    

                    <label htmlFor="category">First Name:</label>
                    <input
                        type="text"
                        id="category"
                        name="firstName"
                        value={user.firstName}
                        onChange={onChange}
                    />

                    <label htmlFor="levels">Last Name:</label>
                    <input
                        type="text"
                        id="category"
                        name="lastName"
                        value={user.lastName}
                        onChange={onChange}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="image"
                        value={user.image}
                        onChange={onChange}
                    />

                    <label htmlFor="summary">Story:</label>
                    <textarea
                        name="story"
                        id="summary"
                        value={user.story}
                        onChange={onChange}
                    >
                    </textarea>
                    <input className="btn submit" type="submit" value="Edit User" />

                </div>
            </form>
        </section>
    )
}