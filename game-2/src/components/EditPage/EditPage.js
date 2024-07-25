import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import * as services from '../../services/gameServices'
import { GameContext } from '../../contexts/gameContext'

export const EditPage = () => {
    const { id } = useParams()
    const { editGame } = useContext(GameContext)
    const navigate = useNavigate()

    const [game, setGame] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })

    useEffect(() => {
        services.getOne(id)
            .then(res => setGame({
                title: res.title,
                category: res.category,
                maxLevel: res.maxLevel,
                imageUrl: res.imageUrl,
                summary: res.summary
            }))
    }, [id])

    const onChange = (ev) => {
        setGame(state => ({
            ...state,
            [ev.target.name]: ev.target.value
        }))
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        services.editOne(id, game)
            .then(res => {
                editGame(id, res)
            })
        navigate(`/details/${id}`)
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={game.title}
                        onChange={onChange}
                    />

                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={game.category}
                        onChange={onChange}
                    />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min="1"
                        value={game.maxLevel}
                        onChange={onChange}
                    />

                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={game.imageUrl}
                        onChange={onChange}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={game.summary}
                        onChange={onChange}
                    >
                    </textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}