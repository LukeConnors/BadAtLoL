import { useSelector } from "react-redux";

function UserPage() {
    const user = useSelector((state) => state.user.userInfo);
  return (
    <div>
      <h1>User Page</h1>
        <h2>Summoner Level: {user.summonerLevel}</h2>
    </div>
  );
}


export default UserPage;