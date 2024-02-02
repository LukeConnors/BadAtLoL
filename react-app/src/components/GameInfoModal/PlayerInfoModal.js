import "./playerInfoModal.css";

function PlayerInfoModal({ participant }) {
  return (
    <div className="main-data-container">
      <h1>{participant.riotIdGameName}</h1>
      <h2>{participant.championName}</h2>
      <h4>
        {participant.kills}/{participant.deaths}/{participant.assists}
      </h4>
    </div>
  );
}

export default PlayerInfoModal;
