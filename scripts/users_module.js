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
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

if(window.location.pathname === '/signin.html'){
    document.addEventListener("DOMContentLoaded", () => {
    const signInForm = document.querySelector("#match-form");

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const userName = document.querySelector("#user_name").value;
        const password = document.querySelector("#password").value;

        try {
            const user = await signInUser(userName, password);

            if (user) {
                localStorage.setItem("signedInUser", JSON.stringify(user));

                Toast.fire({
                    icon: "success",
                    title: "Sign-in successful!",
                    background: "#1e1e1e",
                    color: "#f1c40f",
                    width: "500px"
                });
                setTimeout(() => {
                    window.location.href = "./homepage.html";
                }, 3000);
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Invalid username or password. Please try again.",
                    background: "#1e1e1e",
                    color: "#f1c40f",
                    width: "500px"
                });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            Toast.fire({
                icon: "error",
                title: "An error occurred. Please try again later.",
                background: "#1e1e1e",
                color: "#f1c40f",
                width: "500px"
            });
        }
    });
});
}

if(window.location.pathname === '/signup.html'){
    document.addEventListener("DOMContentLoaded", () => {
        const signForm = document.querySelector("#sign-form");

        signForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.querySelector("#username").value;
            const f_name = document.querySelector("#f_name").value;
            const l_name = document.querySelector("#l_name").value;
            const email = document.querySelector("#email").value;
            const bio = document.querySelector("#bio").value;
            const password = document.querySelector("#password").value;
            const main_hand = document.querySelector("#main_hand").value;
            const tags = document.querySelector("#tags").value.split(",").map(tag => tag.trim());
            const groups = document.querySelector("#groups").value.split(",").map(group => group.trim());

            const newUser = {
                username,
                f_name,
                l_name,
                email,
                password,
                main_hand,
                tags,
                groups,
                bio,
                avatar: `https://robohash.org/${Math.floor(Math.random() * 1000)}.png`,
                created_at: new Date().toISOString(),
            };

            try {
                await createUser(newUser);
                Toast.fire({
                    icon: "success",
                    title: "Your account has been created successfully!",
                    background: "#1e1e1e",
                    color: "#f1c40f",
                    width: "500px"
                });
                setTimeout(() => {
                    window.location.href = "./signin.html";
                }, 3000);
            } catch (error) {
                console.error("Error creating account:", error);
                Toast.fire({
                    icon: "error",
                    title: "Failed to create account. Please try again.",
                    background: "#1e1e1e",
                    color: "#f1c40f",
                    width: "500px"
                });
            }
        });
    });
}

if(window.location.pathname === '/profile.html'){
    document.addEventListener("DOMContentLoaded", async () => {
        const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));
        if (!signedInUser) {
            Swal.fire({
                icon: 'info',
                title: 'Oh no...',
                text: 'You need to sign in first!',
                footer: '<a href="./signin.html" style="color: white; text-decoration: underline">Sign in</a> or <a href="./signup.html" style="color: white;  text-decoration: underline">Sign up</a>',
                width: "600px",
                theme: "dark",
                confirmButtonText: '<a href="./homepage.html" style="color: #181818; font-family: Anton">Back to Homepage</a>',
                confirmButtonColor: '#f1c40f',
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        } else {
            const usersContainer = document.querySelector('.users-container');
            usersContainer.innerHTML = `
                <div class="user-card">
                    <img src="${signedInUser.avatar}" alt="${signedInUser.username}" class="user-avatar">
                    <h2>${signedInUser.f_name} ${signedInUser.l_name}</h2>
                    <p>Username: ${signedInUser.username}</p>
                    <p>Email: ${signedInUser.email}</p>
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
                    <p>Joined: ${new Date(signedInUser.created_at).toLocaleDateString()}</p>
                </div>
            `;
        };
    });
}