const apiURL = "https://pt.fantasypadeltour.com/api"

export const getMatch = async () => {
    const response = await fetch(apiURL + "matches");
    const data = await response.json();
    return data
}

export const getPlayer = async () => {
    const response = await fetch(apiURL + "players");
    const data = await response.json();
    return data
}

export const getSeason = async () => {
    const response = await fetch(apiURL + "seasons");
    const data = await response.json();
    return data
}

export const getTournament = async () => {
    const response = await fetch(apiURL + "tournaments");
    const data = await response.json();
    return data
}