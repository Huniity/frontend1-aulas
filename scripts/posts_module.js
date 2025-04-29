import { getPosts, createPost, editPost, deletePost } from "../lib/mock_api.js";

const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

document.addEventListener("DOMContentLoaded", async () => {
    const postList = document.getElementById("match-list");
    const form = document.getElementById("match-form");

    const editModal = document.getElementById("editModal");
    const closeModalBtn = document.querySelector(".close-btn");
    const editMatchInput = document.getElementById("edit-match");
    const editResultInput = document.getElementById("edit-result");
    const editMatchResultInput = document.getElementById("edit-match_result");
    const editForm = document.getElementById("edit-match-form");

    let currentEditPostId = null;

    const renderPost = (post, prepend = false) => {
        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
<div class="post-container" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; position: relative;">
    <div class="user-info" style="display: flex; align-items: center;">
        <img src="${post.avatar}" alt="avatar" style="object-fit: cover; width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
        <h2 style="margin: 0;">${post.user_name}</h2>
    </div>
    <div class="dropdown" style="position: absolute; right: 0; top: 0; padding: 5px;">
        <button class="dropdown-button" style="background: none; border: none; cursor: pointer;">...</button>
        <div class="dropdown-content" style="position: absolute; right: 0; top: 100%; display: none; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <span><a href="#" class="edit-post" style="display: flex; align-items: center; justify-content: center; padding: 15px;">
                <img class="ico" src="./images/editing.png" style="width: 25px; height: 25px; vertical-align: middle">
            </a></span>
            <span><a href="#" class="delete-post" style="display: flex; align-items: center; justify-content: center; padding: 15px;">
                <img class="ico" src="./images/delete.png" style="width: 25px; height: 25px; vertical-align: middle">
            </a></span>
        </div>
    </div>
</div>

<div class="post-content" style="padding: 0 0 0 50px;">
    <p>${post.match}</p>
    <p>${post.result}</p>
    <p>${post.match_result}</p>
    <p>${formatDate(post.created_at)}</p>
</div>

<div class="comment-section" style="margin-top: 20px;">
    <input type="text" style="margin-bottom: 7.5px; padding: 10px 0 10px 0; width: 100%; border: 0px solid #ccc; border-radius: 5px; background-color: #f1f1f1; box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;" placeholder="Write your comment">
    <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f;">Post!</button>
</div>
        `;

        const dropdownButton = postItem.querySelector('.dropdown-button');
        const dropdownContent = postItem.querySelector('.dropdown-content');
        dropdownButton.addEventListener('click', () => {
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        const editButton = postItem.querySelector('.edit-post');
        editButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentEditPostId = post.id;
            editMatchInput.value = post.match;
            editResultInput.value = post.result;
            editMatchResultInput.value = post.match_result;
            editModal.style.display = 'flex';
        });

        const deleteButton = postItem.querySelector('.delete-post');
        deleteButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const confirmDelete = confirm("Are you sure you want to delete this post?");
            if (confirmDelete) {
                await deletePost(post.id);
                postItem.remove();
            }
        });

        if (prepend) {
            postList.prepend(postItem);
        } else {
            postList.append(postItem);
        }
    };

    const posts = await getPosts();
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    posts.forEach(post => renderPost(post));

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const user_name = document.getElementById("user_name").value;
        const match = document.getElementById("match").value;
        const result = document.getElementById("result").value;
        const match_result = document.getElementById("match_result").value;

        const newPost = {
            user_name,
            match,
            result,
            match_result,
            created_at: new Date().toISOString(),
            avatar: "https://placehold.co/600x400/orange/white"
        };

        const postedData = await createPost(newPost);
        renderPost(postedData, true); // render no topo
        form.reset();
    });


    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!currentEditPostId) return;

        const updatedData = {
            match: editMatchInput.value,
            result: editResultInput.value,
            match_result: editMatchResultInput.value,
        };

        await editPost(currentEditPostId, updatedData);
        editModal.style.display = 'none';
        location.reload();
    });


    closeModalBtn.addEventListener("click", () => {
        editModal.style.display = 'none';
    });


    window.addEventListener("click", (e) => {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});

