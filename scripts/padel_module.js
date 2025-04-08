import { getPlayer } from "../lib/padel_api";

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPlayer();
    console.log(posts);

    const postList = document.getElementById("match-form");
    posts.forEach((post) => { 
        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
        <img src="${post.avatar}"></img><br>
        <h2>${post.user_name}</h2>
          ${post.match}<br><br>
          ${post.result}<br><br>
          ${post.match_result}<br>
          ${post.created_at}<br>
          <input type="text" style="padding: 8px 0px 8px 0px; width: 100%; border: 1px solid #ccc; border-radius: 5px; background-color: #f1f1f1; margin-top: 20px; margin-bottom: 2.5px; box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;" placeholder="Write your comment">
          <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f">Post!</button>
        `;
        postList.appendChild(postItem)
    });
})