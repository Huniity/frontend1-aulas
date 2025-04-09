const apiURL = "https://67f56836913986b16fa476aa.mockapi.io/api/";

export const getPosts = async () => {
    const response = await fetch(apiURL + "posts");
    const data = await response.json();
    return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const createPost = async (postData) => {
    const response = await fetch(apiURL + "posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    return await response.json();
};

export const editPost = async (id, updatedData) => {
    const response = await fetch(apiURL + `posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
    });
    return await response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(apiURL + `posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};
