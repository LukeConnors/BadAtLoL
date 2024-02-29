import "./playerInfoModal.css";
import { useState } from "react";

function PlayerInfoModal({
  participant,
  damageDealt,
  damageTaken,
  goldEarned,
}) {
  let damageDealtRank = 0;
  let damageTakenRank = 0;
  let goldEarnedRank = 0;

  // Helper function to add the correct ending to a number for rankings
  const addEndToNumber = (number) => {
    if (number[number.length - 1] === "1" && number !== "11") {
      return `${number}st`;
    } else if (number[number.length - 1] === "2" && number !== "12") {
      return `${number}nd`;
    } else if (number[number.length - 1] === "3" && number !== "13") {
      return `${number}rd`;
    } else {
      return `${number}th`;
    }
  };

  // This function will find the image of the item based on the item id, if the id is 0 (meaning the player has no item in that slot) it will return null
  const findImage = (item) => {
    if (item === 0) {
      return (
        <>
          <img></img>
        </>
      );
    } else {
      return (
        <img
          src={`https://opgg-static.akamaized.net/meta/images/lol/14.2.1/item/${item}.png?image=q_auto,f_webp,w_64,h_64&v=1705466001567`}
        ></img>
      );
    }
  };
  damageDealt = damageDealt.sort((a, b) => b - a);
  damageDealt.forEach((totalDamage) => {
    if (participant.totalDamageDealtToChampions === totalDamage) {
      damageDealtRank = damageDealt.indexOf(totalDamage) + 1;
    }
  });

  damageTaken = damageTaken.sort((a, b) => b - a);
  damageTaken.forEach((totalDamage) => {
    if (participant.totalDamageTaken === totalDamage) {
      damageTakenRank = damageTaken.indexOf(totalDamage) + 1;
    }
  });
  goldEarned = goldEarned.sort((a, b) => b - a);
  goldEarned.forEach((gold) => {
    if (participant.goldEarned === gold) {
      goldEarnedRank = goldEarned.indexOf(gold) + 1;
    }
  });

  const kdaCalculator = (kills, deaths, assists) => {
    const kda = (kills + assists) / deaths;
    return kda.toFixed(2);
  };

  const statsColoring = (kills, deaths, assists) => {
    const kda = kdaCalculator(kills, deaths, assists);
    if (kda < 1) {
      return "bad-kda";
    } else if (kda < 2) {
      return "mid-kda";
    } else {
      return "good-kda";
    }
  };

  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let properDamageRank = addEndToNumber(damageDealtRank.toString());
  let properTakenRank = addEndToNumber(damageTakenRank.toString());
  let properGoldRank = addEndToNumber(goldEarnedRank.toString());
  return (
    <div className="main-data-container">
      <h1 className="in-game-name">{participant.riotIdGameName}</h1>
      <h2>{participant.championName}</h2>
      <div className="kda-div">
        <h4
          className={statsColoring(
            participant.kills,
            participant.deaths,
            participant.assists
          )}
        >
          {participant.kills}/{participant.deaths}/{participant.assists}
        </h4>
      </div>
      <div>
        {findImage(participant.item0)}
        {findImage(participant.item1)}
        {findImage(participant.item2)}
        {findImage(participant.item3)}
        {findImage(participant.item4)}
        {findImage(participant.item5)}
        {findImage(participant.item6)}
      </div>
      <h3>Creep Score: {addCommas(participant.totalMinionsKilled)}</h3>
      <div className="damage-row">
        <h3>Gold: {addCommas(participant.goldEarned)}</h3>
        <h3 className="damage-rank">{properGoldRank}</h3>
      </div>

      <div className="damage-row">
        <h3>
          Damage Dealt: {addCommas(participant.totalDamageDealtToChampions)}{" "}
        </h3>
        <h3 className="damage-rank">{properDamageRank}</h3>
      </div>
      <div className="damage-row">
        <h3>Damage Taken: {addCommas(participant.totalDamageTaken)}</h3>
        <h3 className="damage-rank">{properTakenRank}</h3>
      </div>
    </div>
  );
}

export default PlayerInfoModal;
