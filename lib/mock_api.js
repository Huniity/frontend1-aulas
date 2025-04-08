const apiURL = "https://67f56836913986b16fa476aa.mockapi.io/api/";

export const getPosts = async () => {
    const response = await fetch(apiURL + "posts");
    const data = await response.json();
    return data
}