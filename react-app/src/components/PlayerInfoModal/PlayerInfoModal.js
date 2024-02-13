import "./playerInfoModal.css";

function PlayerInfoModal({ participant }) {
  // This function will find the image of the item based on the item id, if the id is 0 (meaning the player has no item in that slot) it will return null
  const findImage = (item) => {
    if (item === 0) {
      return null;
    } else {
      return (
        <img
          src={`https://opgg-static.akamaized.net/meta/images/lol/14.2.1/item/${item}.png?image=q_auto,f_webp,w_64,h_64&v=1705466001567`}
        ></img>
      );
    }
  };

  return (
    <div className="main-data-container">
      <h1>{participant.riotIdGameName}</h1>
      <h2>{participant.championName}</h2>
      <h4>
        {participant.kills}/{participant.deaths}/{participant.assists}
      </h4>
      {findImage(participant.item0)}
      {findImage(participant.item1)}
      {findImage(participant.item2)}
      {findImage(participant.item3)}
      {findImage(participant.item4)}
      {findImage(participant.item5)}
      {findImage(participant.item6)}
    </div>
  );
}

export default PlayerInfoModal;
