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
    let currentEditUserId = null;

    const renderPost = (post, prepend = false) => {
        const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));

        const postItem = document.createElement("div");
        postItem.classList.add("post");
        postItem.innerHTML = `
<div class="post-container" style="display: flex; align-items: center; justify-content: space-between; padding: 10px; position: relative;">
    <div class="user-info" style="display: flex; align-items: center;">
        <img src="${post.user.avatar}" alt="avatar" style="object-fit: cover; width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
        <h2 style="margin: 0;">${post.user.f_name} ${post.user.l_name} (@${post.user.username})</h2>
    </div>
    ${
        signedInUser && signedInUser.id === post.user.id
            ? `<div class="dropdown" style="position: absolute; right: 0; top: 0; padding: 5px;">
                <button class="dropdown-button" style="background: none; border: none; cursor: pointer;">...</button>
                <div class="dropdown-content" style="position: absolute; right: 0; top: 100%; display: none; background-color: #fff; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                    <span><a href="#" class="edit-post" style="display: flex; align-items: center; justify-content: center; padding: 15px;">
                        <img class="ico" src="./images/editing.png" style="width: 25px; height: 25px; vertical-align: middle">
                    </a></span>
                    <span><a href="#" class="delete-post" style="display: flex; align-items: center; justify-content: center; padding: 15px;">
                        <img class="ico" src="./images/delete.png" style="width: 25px; height: 25px; vertical-align: middle">
                    </a></span>
                </div>
            </div>`
            : ""
    }
</div>

<div class="post-content" style="padding: 0 0 0 50px;">
    <p>${post.match}</p>
    <p>${post.result}</p>
    <p>${post.match_result}</p>
    <p>${formatDate(post.created_at)}</p>
</div>
        `;

        if (signedInUser && signedInUser.id === post.user.id) {
            const dropdownButton = postItem.querySelector('.dropdown-button');
            const dropdownContent = postItem.querySelector('.dropdown-content');
            dropdownButton.addEventListener('click', () => {
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });

            const editButton = postItem.querySelector('.edit-post');
            editButton.addEventListener('click', (e) => {
                e.preventDefault();
                currentEditPostId = post.id;
                currentEditUserId = post.user.id;
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
                    await deletePost(post.user.id, post.id);
                    postItem.remove();
                }
            });
        }

        if (prepend) {
            postList.prepend(postItem);
        } else {
            postList.append(postItem);
        }
    };

    try {
        const users = await fetch("https://67f56836913986b16fa476aa.mockapi.io/api/users").then((res) => res.json());
        const posts = users.flatMap((user) =>
            user.posts.map((post) => ({
                ...post,
                user: {
                    id: user.id,
                    f_name: user.f_name,
                    l_name: user.l_name,
                    username: user.username,
                    avatar: user.avatar,
                },
            }))
        );

        posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        posts.forEach(post => renderPost(post));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
        if (!signedInUser) {
            alert("You must be logged in to create a post.");
            return;
        }

        const newPost = {
            id: Date.now().toString(), // Generate a unique ID for the post
            title: document.getElementById("post-title").value,
            match: document.getElementById("post-match").value,
            result: document.getElementById("post-result").value,
            match_result: document.getElementById("post-match-result").value,
            created_at: new Date().toISOString(),
            comments: [],
            likes: 0,
        };

        try {
            signedInUser.posts.push(newPost);
            await fetch(`https://67f56836913986b16fa476aa.mockapi.io/api/users/${signedInUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signedInUser),
            });

            localStorage.setItem("signedInUser", JSON.stringify(signedInUser));
            renderPost({ ...newPost, user: signedInUser }, true);
            form.reset();
        } catch (error) {
            console.error("Error creating post:", error);
        }
    });

    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!currentEditPostId || !currentEditUserId) return;

        const updatedData = {
            match: editMatchInput.value,
            result: editResultInput.value,
            match_result: editMatchResultInput.value,
        };

        try {
            const user = await fetch(`https://67f56836913986b16fa476aa.mockapi.io/api/users/${currentEditUserId}`).then((res) => res.json());
            const postIndex = user.posts.findIndex((post) => post.id === currentEditPostId);
            if (postIndex !== -1) {
                user.posts[postIndex] = { ...user.posts[postIndex], ...updatedData };
                await fetch(`https://67f56836913986b16fa476aa.mockapi.io/api/users/${currentEditUserId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                });
                editModal.style.display = 'none';
                location.reload();
            }
        } catch (error) {
            console.error("Error editing post:", error);
        }
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

async function deletePost(userId, postId) {
    try {
        const user = await fetch(`https://67f56836913986b16fa476aa.mockapi.io/api/users/${userId}`).then((res) => res.json());
        user.posts = user.posts.filter((post) => post.id !== postId);
        await fetch(`https://67f56836913986b16fa476aa.mockapi.io/api/users/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
    } catch (error) {
        console.error("Error deleting post:", error);
    }
}