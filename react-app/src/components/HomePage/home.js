import * as riotactions from "../../store/userNames.js"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import "./home.css"
function HomePage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formData, setFormData] = useState({
        username: "",
        region: ""
    })


    const handleSubmit = async (e) => {
        e.preventDefault()
        let user = await dispatch(riotactions.getUserData(formData.username, formData.region))
        if (user) {
            let matches = await dispatch(riotactions.getMatches(user.puuid))
            history.push("/user")
        }
    }

    return (
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
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        >
                        </input>
                    </div>
                    <div className="region-div">

                        <h2 className="region">Region</h2>
                        <select
                            className="region-select"
                            value={formData.region}
                            onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        >
                            <option value="">--Select Region--</option>
                            <option value="na1">NA</option>
                            <option value="euw1">EUW</option>
                            <option value="eun1">EUNE</option>
                            <option value="br1">BR</option>
                            <option value="kr">KR</option>
                            <option value="jp1">JP</option>
                            <option value="la1">LAN</option>
                            <option value="la2">LAS</option>
                            <option value="oc1">OCE</option>
                            <option value="tr1">TR</option>
                            <option value="ru">RU</option>
                        </select>
                    </div>
                    <div className="submit-button-div">
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default HomePage