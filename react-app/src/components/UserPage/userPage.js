import { useSelector } from "react-redux";
import * as riotactions from "../../store/userNames.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useModal, openModal } from "../../context/Modal.js";
import OpenModalButton from "../OpenModalButton";
import GameInfoModal from "../PlayerInfoModal/PlayerInfoModal.js";

import "./userPage.css";
import PlayerInfoModal from "../PlayerInfoModal/PlayerInfoModal.js";

function UserPage() {
  const dispatch = useDispatch();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { setModalContent } = useModal();
  const user = useSelector((state) => state.user.userInfo);
  const matches = useSelector((state) => state.user.matchHistory);
  const [matchDataArr, setMatchDataArr] = useState([]);

  const shortenChampionName = (championName) => {
    let shortenedName = championName.slice(0, 9);
    return shortenedName + "...";
  };

  const openMatchFunc = (matchId) => {
    // function with callback to check if the selected match is the same one, if so it will close the match
    // otherwise this function
    setSelectedMatch((prevSelectedMatch) =>
      prevSelectedMatch === matchId ? null : matchId
    );
  };

  const openPlayerInfo = (participant) => {
    setModalContent(<PlayerInfoModal participant={participant} />);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < matches.length; i++) {
        console.log(matches[i]);
        let match = matches[i];
        if (match) {
          let matchData = await dispatch(riotactions.getMatchData(match));
          data.push(matchData);
        }
      }
      setMatchDataArr(data);
    };
    fetchData();
  }, [matches]);

  if (user && matches && matchDataArr) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h5 className="summoner-level">{user.summonerLevel}</h5>
        <img
          src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${user.profileIconId}.webp`}
          className="summoner-icon"
        ></img>
        <h2>Match History</h2>
        {matchDataArr?.length > 0 ? (
          matchDataArr?.map((match) => {
            let damageArray = match?.info?.participants.map(
              (participant) => participant?.totalDamageDealtToChampions
            );
            if (match?.info?.gameMode === "CLASSIC") {
              return (
                <div className="match-container">
                  <h3>Summoner's Rift 5v5</h3>
                  <button onClick={() => openMatchFunc(match?.info?.gameId)}>
                    View Match
                  </button>
                  {selectedMatch === match.info.gameId && (
                    <div>
                      <h1>Match Data</h1>
                      <div className="game-container">
                        {match?.info?.participants?.map((participant) => {
                          if (participant.win === true) {
                            return (
                              <div
                                className="champion-container-win"
                                onClick={() =>
                                  setModalContent(
                                    <PlayerInfoModal
                                      participant={participant}
                                      damageArray={damageArray}
                                    />
                                  )
                                }
                              >
                                <div className="card-data">
                                  <div className="name-container">
                                    <h3 className="game-name">
                                      {participant.riotIdGameName.length > 9
                                        ? shortenChampionName(
                                            participant.riotIdGameName
                                          )
                                        : participant.riotIdGameName}
                                    </h3>
                                  </div>
                                  <h4 className="data-point">
                                    {participant.kills}/{participant.deaths}/
                                    {participant.assists}
                                  </h4>
                                  <h4 className="role">
                                    {participant.championName}
                                  </h4>
                                </div>
                                <div className="img-container" onClick={null}>
                                  <img
                                    className="champ-img"
                                    src={`https://ddragon-webp.lolmath.net/latest/img/champion/${participant.championName}.webp`}
                                  ></img>
                                  <p className="champ-level">
                                    {participant.champLevel}
                                  </p>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div
                                className="champion-container-loss"
                                onClick={() => openPlayerInfo(participant)}
                              >
                                <div className="card-data">
                                  <div className="name-container">
                                    <h3 className="game-name">
                                      {participant.riotIdGameName.length > 9
                                        ? shortenChampionName(
                                            participant.riotIdGameName
                                          )
                                        : participant.riotIdGameName}
                                    </h3>
                                  </div>
                                  <h4 className="data-point">
                                    {participant.kills}/{participant.deaths}/
                                    {participant.assists}
                                  </h4>
                                  <h4 className="role">
                                    {participant.championName}
                                  </h4>
                                </div>
                                <div className="img-container">
                                  <img
                                    className="champ-img"
                                    src={`https://ddragon-webp.lolmath.net/latest/img/champion/${participant.championName}.webp`}
                                  ></img>
                                  <p className="champ-level">
                                    {participant.champLevel}
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                  <h4>
                    Game Duration: {Math.floor(match?.info?.gameDuration / 60)}{" "}
                    Minutes
                  </h4>
                </div>
              );
            }

            if (match.info.gameMode === "CHERRY") {
              return (
                <div className="match-container">
                  <h3>Arena</h3>
                  <OpenModalButton
                    buttonText="View Match"
                    modalComponent={<GameInfoModal match={match} />}
                  />
                  <h4>
                    Game Duration: {Math.floor(match.info.gameDuration / 60)}{" "}
                    Minutes
                  </h4>
                </div>
              );
            }
          })
        ) : (
          <h3 className="no-matches">No Matches Found</h3>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}

export default UserPage;
