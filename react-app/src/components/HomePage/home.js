import * as riotactions from "../../store/userNames.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./home.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    region: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await dispatch(
      riotactions.getUserData(formData.username, formData.region)
    );
    if (user) {
      let matches = await dispatch(riotactions.getMatches(user.puuid));
      history.push("/user");
    }
  };

  return (
    <>
      <div className="home-page">
        <h1 className="home-page-title">Am I Bad at LoL?</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="summ-name-div">
              <h2 className="summ-name">Summoner Name</h2>
              <input
                className="summ-name-input"
                type="text"
                placeholder="Summoner Name"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              ></input>
            </div>
            <div className="region-div">
              <h2 className="region">Region</h2>
              <select
                className="region-select"
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
              >
                <option className="region-options" value="">--Select Region--</option>
                <option className="region-options" value="na1">NA</option>
                <option className="region-options" value="euw1">EUW</option>
                <option className="region-options" value="eun1">EUNE</option>
                <option className="region-options" value="br1">BR</option>
                <option className="region-options" value="kr">KR</option>
                <option className="region-options" value="jp1">JP</option>
                <option className="region-options" value="la1">LAN</option>
                <option className="region-options" value="la2">LAS</option>
                <option className="region-options" value="oc1">OCE</option>
                <option className="region-options" value="tr1">TR</option>
                <option className="region-options" value="ru">RU</option>
              </select>
            </div>
            <div className="submit-button-div">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="home-lower">
        <h2 className="home-page-title">How to use this app:</h2>
        <p className="home-page-text">
          Enter your summoner name and region and click submit. This will take
          you to the user page where you can see your stats and match history.
        </p>
        <div className="footer">
          <div className="logo-footer">
            <i
              id="github-icon"
              class="fa-brands fa-github"
              onClick={() =>
                window.open("https://github.com/LukeConnors", "_blank")
              }
            ></i>
            <i
              id="linkedin"
              class="fa-brands fa-linkedin"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/luke-connors-981373b1/",
                  "_blank"
                )
              }
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
