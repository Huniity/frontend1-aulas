
import { getPosts, createPost, editPost, deletePost } from "../lib/mock_api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const posts = await getPosts();
    console.log(posts);

    const postList = document.getElementById("match-form");
    posts.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
<div class="post-container" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; position: relative;">
    <!-- Avatar and User Information Section -->
    <div class="user-info" style="display: flex; align-items: center;">
        <img src="${post.avatar}" alt="avatar" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
        <h2 style="margin: 0;">${post.user_name}</h2>
    </div>
    
    <!-- Dropdown for Edit/Delete -->
    <div class="dropdown" style="position: absolute; right: 0; top: 0; padding: 5px;">
        <button class="dropdown-button" style="background: none; border: none; cursor: pointer;">...</button>
        <div class="dropdown-content" style="position: absolute; right: 0; top: 100%; display: none; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <span><a href="#" class="edit-post" style="display: block; padding: 10px;">
                <img class="ico" src="../images/editing.png" style="width: 25px; height: 25px; vertical-align: middle; margin-right: 10px;">
            </a></span>
            <span><a href="#" class="delete-post" style="display: block; padding: 10px;">
                <img class="ico" src="../images/delete.png" style="width: 25px; height: 25px; vertical-align: middle; margin-right: 10px;">
            </a></span>
        </div>
    </div>
</div>

<!-- Post Content Section -->
<div class="post-content" style="padding: 0 0 0 50px;">
    <p>${post.match}</p>
    <p>${post.result}</p>
    <p>${post.match_result}</p>
    <p>${post.created_at}</p>
</div>

<!-- Comment Section -->
<div class="comment-section" style="margin-top: 20px;">
    <input type="text" style="padding: 8px; width: 100%; border: 1px solid #ccc; border-radius: 5px; background-color: #f1f1f1; box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;" placeholder="Write your comment">
    <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f;">Post!</button>
</div>
        `;
        postList.appendChild(postItem);

        const dropdownButton = postItem.querySelector('.dropdown-button');
        const dropdownContent = postItem.querySelector('.dropdown-content');
        dropdownButton.addEventListener('click', () => {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        const editButton = postItem.querySelector('.edit-post');
        editButton.addEventListener('click', () => {
            const updatedPostData = {
                user_name: "Updated User",
                match: "Updated Match",
                result: "Updated Result",
                match_result: "Updated Match Result",
                created_at: new Date().toISOString(),
                avatar: post.avatar
            };
            editPost(post.id, updatedPostData);
        });


        const deleteButton = postItem.querySelector('.delete-post');
        deleteButton.addEventListener('click', async () => {
            const confirmDelete = confirm("Are you sure you want to delete this post?");
            if (confirmDelete) {
                await deletePost(post.id);
                postItem.remove();
                console.log(postList)
            }
        });
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
