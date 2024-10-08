import * as services from '../../services/gameServices'
import { useContext } from 'react';
import { GameContext } from '../../contexts/gameContext';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

export const CreatePage = () => {
    const {addGame} = useContext(GameContext);
    const {auth} = useContext(AuthContext);
    const navigate = useNavigate();
    const owner = auth.user_info.id;

    // TODO if response is not 200 ok don't set game to addGame()
    
    const onSubmit = (ev) => {
        ev.preventDefault();
        const gameData = Object.fromEntries(new FormData(ev.target));
        services.createOne({
            ...gameData,
            owner
        })
            .then(res => {
               
                addGame(res)
                navigate('/catalog')
            })    
    }

    return (
        <section className="login register page auth">
            <form  className='log-reg' onSubmit={onSubmit}>
                <div className="container">

                    <h1>Create Game</h1>
                    <label htmlFor="title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." />

                    <label htmlFor="maxLevel">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1" />

                    <label htmlFor="imageUrl">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Create Game" />
                </div>
            </form>
        </section>
    )
}