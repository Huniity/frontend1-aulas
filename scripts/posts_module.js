const apiURL = "https://67f56836913986b16fa476aa.mockapi.io/api/";



export const getPosts = async () => {
    const response = await fetch(apiURL + "posts");
    const data = await response.json();
    return data;
}

export const createPost = async (postData) => {
    const response = await fetch(apiURL + "posts", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data;
}

export const deletePost = async (postData) => {
    const response = await fetch(apiURL + "posts", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    return data;
}

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPosts();
    console.log(posts);

    const postList = document.getElementById("match-form");
    posts.forEach((post) => { 
        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
        <img src="${post.avatar}" alt="avatar"><br>
        <h2>${post.user_name}</h2>
        ${post.match}<br><br>
        ${post.result}<br><br>
        ${post.match_result}<br>
        ${post.created_at}<br>
        <input type="text" style="padding: 8px 0px 8px 0px; width: 100%; border: 1px solid #ccc; border-radius: 5px; background-color: #f1f1f1; margin-top: 20px; margin-bottom: 2.5px; box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;" placeholder="Write your comment">
        <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f">Post!</button>
        <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color:rgb(241, 26, 15)">Delete my post</button>
        `;
        postList.appendChild(postItem);
    });
  

    const form = document.getElementById("match-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user_name = document.getElementById("user_name").value;
        const match = document.getElementById("match").value;
        const result = document.getElementById("result").value;
        const match_result = document.getElementById("match_result").value;

        const newPost = {
            user_name: user_name,
            match: match,
            result: result,
            match_result: match_result,
            created_at: new Date().toISOString(),
            avatar: "https://placehold.co/600x400/orange/white"
        };

        const postedData = await createPost(newPost);
        console.log('New post created:', postedData);

        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
        <img src="${postedData.avatar}" alt="avatar"><br>
        <h2>${postedData.user_name}</h2>
        ${postedData.match}<br><br>
        ${postedData.result}<br><br>
        ${postedData.match_result}<br>
        ${postedData.created_at}<br>
        `;
        postList.appendChild(postItem);
        form.reset();
    });
});
