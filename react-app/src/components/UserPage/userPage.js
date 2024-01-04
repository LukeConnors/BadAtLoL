 import { useSelector } from "react-redux";
import * as riotactions from "../../store/userNames.js"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import GameInfoModal from "../GameInfoModal/GameInfoModal.js";

import "./userPage.css"

function UserPage() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.userInfo);
  const matches = useSelector((state) => state.user.matchHistory);
  const [matchDataArr, setMatchDataArr] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < matches.length; i++) {
        console.log(matches[i])
        let match = matches[i]
        if(match){
          let matchData = await dispatch(riotactions.getMatchData(match))
          data.push(matchData)
        }
      }
      setMatchDataArr(data)
    }
    fetchData()
  }, [matches])

  console.log("!!!!!!!!!", matchDataArr)
  if (user && matches && matchDataArr) {
    return (
      <div>
        <h1>User Page</h1>
        <h2>Summoner Name: {user.name}</h2>
        <h2>Summoner Level: {user.summonerLevel}</h2>
        <img src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${user.profileIconId}.webp`}></img>
        <h2>Match History</h2>
        {matchDataArr.map((match) => {
          if(match.info.gameMode === "CLASSIC"){
            return(
              <div className="match-container">
                <h3>Summoner's Rift 5v5</h3>
                <OpenModalButton
                  buttonText="View Match"
                  modalComponent={<GameInfoModal match={match}/>}
                />
                <h4>Game Duration: {Math.floor(match.info.gameDuration / 60)} Minutes</h4>
              </div>
            )
          }

          if(match.info.gameMode === "CHERRY"){
            return(
              <div className="match-container">
                <h3>Arena</h3>
                <OpenModalButton
                  buttonText="View Match"
                  modalComponent={<GameInfoModal match={match}/>}
                />
                <h4>Game Duration: {Math.floor(match.info.gameDuration / 60)} Minutes</h4>
              </div>
            )
          }

        })}
      </div>
    );
  } else {
    return (
      <>
      </>
    )
  }
}


export default UserPage;