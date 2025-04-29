import { getUsers, createUser } from "../lib/mock_api.js";

document.addEventListener("DOMContentLoaded", async () => {
    const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
    if (!signedInUser) {
        const usersContainer = document.querySelector('.users-container');
        usersContainer.innerHTML = `
            <div class="user-card">
                <h2>Guest</h2>
                <p>Please sign in to view your profile.</p>
            </div>
        `;
        usersContainer.appendChild(userElement);
    } else {
        const usersContainer = document.querySelector('.users-container');
        const onProfilePage = location.pathname.endsWith('profile.html');
        usersContainer.innerHTML = `
        <div class="profile">
            <div class="user-card">
                <img src="${signedInUser.avatar}" alt="${signedInUser.username}" class="profile_img">
                <h2>${signedInUser.f_name} ${signedInUser.l_name}</h2>
                <p>@${signedInUser.username}</p>
                <p>${signedInUser.bio}</p>
                ${!onProfilePage ? '<button><a href="./profile.html">My Profile</a></button>' : ''}
                <p>Main Hand: ${signedInUser.main_hand}</p>
                <div class="skills">
                    Tags:
                    <ul>
                        ${signedInUser.tags.map(tag => `<li>${tag}</li>`).join("")}
                    </ul>
                </div>
                <div class="communities">
                    Groups: 
                    <ul>
                        ${signedInUser.groups.map(group => `<li>${group}</li>`).join("")}
                    </ul>
                </div>
            </div>
            </div>
        `;
    }
        
    

    try {
        const users = await getUsers();
        users.forEach(user => renderUser(user));
    } catch (error) {
        console.error("Error fetching users:", error);
        usersContainer.innerHTML = `<p>Failed to load users. Please try again later.</p>`;
    }

    userForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.querySelector("#username").value;
        const f_name = document.querySelector("#f_name").value;
        const l_name = document.querySelector("#l_name").value;
        const password = document.querySelector("#password").value;
        const main_hand = document.querySelector("#main_hand").value;
        const tags = document.querySelector("#tags").value.split(",").map(tag => tag.trim());
        const groups = document.querySelector("#groups").value.split(",").map(group => group.trim());
        const avatar = `https://robohash.org/${Math.floor(Math.random() * 1000)}.png`;
        const email = document.querySelector("#email").value;
        const bio = document.querySelector("#bio").value;

        const newUser = {
            username,
            f_name,
            l_name,
            password,
            main_hand,
            tags,
            groups,
            avatar,
            email,
            bio,
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

export async function signInUser(userName, password) {
    try {
        const users = await getUsers();
        const user = users.find(
            (u) => u.username === userName && u.password === password
        );
        return user || null;
    } catch (error) {
        console.error("Error during sign-in:", error);
        throw new Error("Failed to sign in. Please try again later.");
    }
}