import { useEffect, useState } from 'react'
import { AllGames } from './AllGames'
import * as services from '../../services/gameServices'

export const Catalog = () => {
    const [games, setGames] = useState([])
    useEffect(() => {
        services.getAll()
            .then(response => {
                setGames(response.result)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
   
    return (
        <section id="catalog-page">
        <h1>All Games</h1>
       { games.length > 0   
       ? games.map(game => <AllGames key={game.id} game={game}/> )
       : <h3 className="no-articles">No articles yet</h3>
       }
    </section>
    )
}