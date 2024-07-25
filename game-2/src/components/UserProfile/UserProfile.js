import { useEffect, useState, useContext } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import * as userService from '../../services/userServices'
import { AuthContext } from '../../contexts/authContext'

export const Profile = () => {
    const { id } = useParams()
    const { auth, userLogout } = useContext(AuthContext)
    const [user, setUser] = useState({})
    const token = auth.token
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
        userService.getUser(token, id)
            .then(res => {
                console.log(res.status);
                setUser(res)
            })
            .catch(error => {
                console.error("Error fetching user:", error);
                navigate('/notfound')
            });
    }, [token, id, navigate])

    const onDeleteUser = () => {
        userService.delUser(id)
            .then(res => console.log(res))
        userLogout()
        navigate('/')

    }


    if (!Object.keys(user).includes('user')) {
        return <p>Loading...</p>
    }

    return (
        <section id="profile-details">
            <h1>Your Profile</h1>
            <div className="info-section">
                <div className="profile-info">
                    <div className="profile-header">
                        {user.user.image ?
                            <img className="profile-img" src={user.user.image} alt='img' />
                            :
                            <img className="profile-img" src="..\images\pngaaa.com-4811117.png" alt="img" />
                        }

                        {user.user.first_name && user.user.last_name ?
                            <h1>{user.user.first_name} {user.user.last_name}</h1>
                            :
                            <h1>No name</h1>
                        }
                        <p className="username">Username: {user.user.username}</p>

                        {user.user.rank ?
                            <p className="details">Rank: {user.user.rank}</p>
                            :
                            <p className="details">Rank: No rank</p>
                        }

                        {user.user.email ?
                            <p className="details">Email: {user.user.email}</p>
                            :
                            <p className="details">Email: No email</p>
                        }

                        {user.user.social_media ?
                            <div className="details">Facebook:
                                <a href={user.user.social_media}><i className="fa-brands fa-facebook"></i></a>
                                {/* <a href="#"><i className="fa-brands fa-github"></i></a>
                       <a href="#"><i className="fa-brands fa-instagram"></i></a> */}

                            </div>
                            :
                            <p className="details">Facebook: No Link</p>
                        }

                    </div>
                    <div className="favorite-games">
                        <h3>My favorite games</h3>
                        <ul className="nav-fav-games">
                            {user.user_games.map((game, idx) => (
                                <li className="item-fav-game" key={idx}>
                                    <div className="img-wrapper">
                                        <img className="img-fav-game" src={game.imageUrl} alt="img" />
                                        <h4 className="title-fav-game">{game.title}</h4>
                                    </div>
                                    <Link to={`/details/${game.id}`} className="button-fav-game">Details</Link>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
                <div className="bio">
                    <h3>My story</h3>
                    {user.user.story ?
                        <p>{user.user.story}</p>
                        :
                        <p></p>
                    }
                </div>


                <div className="buttons">
                    <Link to={`/user/edit/${id}`} className="button">Edit</Link>
                    <button className="button" onClick={onDeleteUser}>Delete</button>
                </div>

            </div>
        </section>
    )
}