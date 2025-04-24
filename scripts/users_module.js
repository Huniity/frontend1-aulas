import { getUsers, createUser } from "../lib/mock_api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const usersContainer = document.querySelector(".users-container");
    const userForm = document.querySelector("#sign-form"); // Updated to match the provided form ID

    const renderUser = (user) => {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
            <div class="user-card">
                <img src="${user.avatar}" alt="${user.user_name}" class="user-avatar">
                <h2>${user.f_name} ${user.l_name}</h2>
                <p>Username: ${user.user_name}</p>
                <p>Email: ${user.email || "N/A"}</p>
                <p>Main Hand: ${user.main_hand}</p>
                <div class="skill-tags">
                    Tags: <span>${user.tags}</span>
                </div>
                <div class="communities">
                <ul>
                    <li>Groups: ${user.groups.join("\n")}</li>
                </ul>
                </div>
                <p>Joined: ${new Date(user.created_at).toLocaleDateString()}</p>
            </div>
        `;
        usersContainer.appendChild(userElement);
    };

    try {
        const users = await getUsers();
        users.forEach(user => renderUser(user));
    } catch (error) {
        console.error("Error fetching users:", error);
        usersContainer.innerHTML = `<p>Failed to load users. Please try again later.</p>`;
    }

    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user_name = document.querySelector("#user_name").value;
        const f_name = document.querySelector("#f_name").value;
        const l_name = document.querySelector("#l_name").value;
        const password = document.querySelector("#password").value;
        const main_hand = document.querySelector("#main_hand").value;
        const tags = document.querySelector("#tags").value.split(",").map(tag => tag.trim());
        const groups = document.querySelector("#groups").value.split(",").map(group => group.trim());
        const avatar = `https://robohash.org/${Math.floor(Math.random() * 1000)}.png`;

        const newUser = {
            user_name,
            f_name,
            l_name,
            password,
            main_hand,
            tags,
            groups,
            avatar,
            created_at: new Date().toISOString(),
        };

        try {
            const createdUser = await createUser(newUser);
            renderUser(createdUser);
            userForm.reset();
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Failed to create user. Please try again.");
        }
    });
});