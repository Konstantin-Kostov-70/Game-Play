import { useEffect, useState, useContext } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import * as services from '../../services/gameServices'
import * as commentService from '../../services/commentService'
import { GameContext } from '../../contexts/gameContext'
import { AuthContext } from '../../contexts/authContext'

export const DetailsPage = () => {

    const { id } = useParams()
    const [game, setGame] = useState({})
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const { delGame } = useContext(GameContext)
    const { auth } = useContext(AuthContext)
    let owner = ''
    if (auth.hasOwnProperty('user_info')) {
        owner = auth.user_info.id
    }

    useEffect(() => {
        services.getOne(id)
            .then(result => {
                result ?
                setGame(result)
                : navigate("/errors")
            })

        commentService.getGameAllComments(id)
            .then(result => {
                setComments(result)
            })

    }, [id, navigate])

    const onDelete = () => {
        services.deleteOne(id)
           .then(res => {
               delGame(id)
               navigate('/catalog')
           })
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        const commentData = Object.fromEntries(new FormData(ev.target))
        const data = {
            ...commentData,
            user: auth.user_info.id,
            game: parseInt(id)
        }
        commentService.createComment(id, data)
            .then(result => {
                setComments(state => [
                    ...state,
                    result
                ])
            })
        ev.target.reset()
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt='img' />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    {comments.length > 0
                        ?
                        comments.map((comment, idx) => (

                            <ul key={idx}>
                                <li className="comment">
                                    <p>{comment.comment}</p>
                                </li>
                                <p>{comment.username}</p>
                                <p>{comment.date_of_creation}</p>
                            </ul>
                        ))
                        :
                        <p className="no-comment">No comments.</p>
                    }
                </div>
                {game.owner === owner &&
                    <div className="buttons">
                        <Link to={`/edit/${id}`} className="button">Edit</Link>
                        <button className="button" onClick={onDelete}>Delete</button>
                    </div>
                }
            </div>

            {auth.hasOwnProperty('user_info') &&
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea name="comment" placeholder="Comment......"></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            }
        </section>
    )
}