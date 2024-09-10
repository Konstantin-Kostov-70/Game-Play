import { useEffect, useState } from "react"
import { GameCard } from "./GameCard"
import * as services from '../../services/gameServices'

export const HomePage = () => {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        services.getAll()
            .then(response => {
                setGames(response.result)
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error)
                setIsLoading(false)
            })
    }, [])

    games.reverse()
    const lastGames = games.length > 3 ? games.slice(0, 3) : games
    return (
       
            <section id="welcome-world">

                <div className="welcome-message">
                    <h2>ALL new games are </h2>
                    <h3>Only in GamesPlay</h3>
                </div>
                {/* <img src="./images/four_slider_img01.png" alt="hero" /> */}
                <img src="./static/images/four_slider_img01.png" alt="hero" />

                <div id="home-page">
                    <h1>Latest Games</h1>
                    <div id="home-page-card">
                        {isLoading ? (
                            <p>Loading ....</p>
                        ) : (
                            lastGames.length > 0 ? (
                                lastGames.map((game, idx) => <GameCard key={game.id} game={game} />)
                            ) : (
                                <p className="no-articles">No games yet</p>
                            )
                        )}
                    </div>
                </div>
            </section>
    )
}