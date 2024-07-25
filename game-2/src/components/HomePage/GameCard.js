import { Link } from 'react-router-dom'

export const GameCard = ({ game }) => {
    return (
        <div className="game">
            <div className="image-wrap">
                <img className='card-image' src={game.imageUrl} alt="img" />
            </div>
            <h3>{game.title}</h3>
            <div className="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div className="data-buttons">
                <Link to={`/details/${game.id}`} className="btn details-btn">Details</Link>
            </div>
        </div>
    )
}