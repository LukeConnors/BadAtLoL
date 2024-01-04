import './gameInfoModal.css'

function GameInfoModal({match}){
return(
    <div className='game-container'>
        {match.info.participants.map((participant) => {
            return(
                <div className="champion-container">
                    <h3>{participant.summonerName}</h3>
                    <img src={`https://ddragon-webp.lolmath.net/latest/img/champion/${participant.championName}.webp`}></img>
                </div>
            )
        })}
    </div>
)
}

export default GameInfoModal;