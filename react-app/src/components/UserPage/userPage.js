import { useSelector } from "react-redux";
import * as riotactions from "../../store/userNames.js"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
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
          return(
            <div>
              {/* <h3>Match {match.info.gameMode}</h3> */}
            </div>
          )

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