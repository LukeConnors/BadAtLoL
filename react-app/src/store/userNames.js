export const SET_USERDATA = "usernames/SET_USERDATA";
export const SET_MATCHES = "usernames/SET_MATCHES";

const setUserData = (userData) => ({
    type: SET_USERDATA,
    userData,
});

const setMatches = (matches) => ({
    type: SET_MATCHES,
    matches,
});


export const getUserData = (username, region) => async (dispatch) => {
    try {
        const res = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=RGAPI-53a06b4b-e15d-45d3-ab8c-fcf8481703a2`)
        const data = await res.json()
        dispatch(setUserData(data))
        localStorage.setItem("userData", JSON.stringify(data))
        return data
    }
    catch (e) {
        console.log("!!!!!!!!!!!!!!!!!", e, "!!!!!!!!!!!!!!!!!")
    }

}

export const getMatches = (puuid) => async (dispatch) => {
    try {
        const res = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-53a06b4b-e15d-45d3-ab8c-fcf8481703a2`)
        const data = await res.json()
        dispatch(setMatches(data))
        localStorage.setItem("matches", JSON.stringify(data))
        return data
    }
    catch (e) {
        console.log("!!!!!!!!!!!!!!!!!", e, "!!!!!!!!!!!!!!!!!")
    }
}

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userData")) || null,
    matchHistory: JSON.parse(localStorage.getItem("matches")) || null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERDATA:
            return { userInfo: action.userData }
        case SET_MATCHES:
            return { 
                ...state,
                matchHistory: action.matches 
            }
        default:
            return state;
    }
}

export default usersReducer;