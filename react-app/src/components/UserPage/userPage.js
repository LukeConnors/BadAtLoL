import { useSelector } from "react-redux";
import * as riotactions from "../../store/userNames.js"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

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

  if (user) {
    return (
      <div>
        <h1>User Page</h1>
        <h2>Summoner Level: {user.summonerLevel}</h2>
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