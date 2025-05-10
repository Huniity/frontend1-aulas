class SharedNavbar extends HTMLElement {
    connectedCallback() {
        const signedInUser = JSON.parse(localStorage.getItem("signedInUser"));


        if (!signedInUser) {
            console.warn("No signed-in user found. Rendering default navbar.");
            this.innerHTML = `
                <nav class="navbar">
                    <div class="navbar_pc">
                        <div class="logo">
                            <h1><a href="./index.html">The Padel Social Club</a></h1>
                        </div>
                        <div class="nav-icons">
                            <span onclick="window.location='signin.html'">Sign In</span>
                            <span onclick="window.location='signup.html'">Sign Up</span>
                            <button id="toggleButton" style="width: 100px">Toggle Dark Mode</button>
                        </div>
                    </div>
                    <div class="navbar_mobile">
                        <div class="parent_navbar">
                            <div class="div1_navbar">
                                <div class="logo">
                                    <h1><a href="./index.html">The Padel Social Club</a></h1>
                                </div>
                            </div>
                            <div class="div2_navbar">
                                <button id="dark_mode" style="all: unset">
                                <img class="dark_icon" src="images/full-moon.png" alt="Dark Mode Icon" />
                                <img class="light_icon" src="images/sun.png" alt="Light Mode Icon" />
                            </button>
                            </div>
                            <div class="div3_navbar"><a href="#"><img src="./images/player.png" alt="Guest" class="profile_img_mobile" width="50" height="50"></a></div>
                            <div class="div4_navbar">Guest</div>
                            <div class="div5_navbar"><a href="./signin.html"><img class="dev_ico1" src="./images/signin.png" width="25" height="25"></a></div>
                        </div>
                        <div class="nav-icons">
                            <span onclick="window.location='signin.html'">Sign In</span>
                            <span onclick="window.location='signup.html'">Sign Up</span>
                            <button id="toggleButton" style="width: 100px">Toggle Dark Mode</button>
                        </div>
                    </div>
                </nav>
            `;
            return;
        }


        this.innerHTML = `
            <nav class="navbar">
                <div class="navbar_pc">
                    <div class="logo">
                        <h1><a href="./index.html">The Padel Social Club</a></h1>
                    </div>
                    <div class="nav-icons">
                        <span>Welcome, ${signedInUser.username}!</span>
                        <button id="logout-btn">Logout</button>
                        <button id="toggleButton" style="width: 100px">Toggle Dark Mode</button>
                    </div>
                </div>
                <div class="navbar_mobile">
                    <div class="parent_navbar">
                        <div class="div1_navbar">
                            <div class="logo">
                                <h1><a href="./index.html">The Padel Social Club</a></h1>
                            </div>
                        </div>
                        <div class="div2_navbar">
                            <button id="dark_mode" style="all: unset">
                            <img class="dark_icon" src="images/full-moon.png" alt="Dark Mode Icon" />
                            <img class="light_icon" src="images/sun.png" alt="Light Mode Icon" />
                        </button>
                        </div>
                        <div class="div3_navbar"><a href="#"><img src="${signedInUser.avatar}" alt="${signedInUser.username}" class="profile_img_mobile" width="50" height="50"></a></div>
                        <div class="div4_navbar">${signedInUser.username}</div>
                        <div class="div5_navbar"><a id="logout-btn-nav"><img class="dev_ico1" src="./images/signout.png" width="25" height="25" alt="signout"></a></div>
                    </div>
                    <div class="nav-icons">
                        <button id="logout-btn">Logout</button>
                        <button id="toggleButton" style="width: 100px">Toggle Dark Mode</button>
                    </div>
                </div>
            </nav>
        `;

        function logout() {
            // Query the logout button in div5_navbar by its ID
            const logoutBtnNav = document.querySelector("#logout-btn-nav");

            // Add click event listener to logout button
            logoutBtnNav.addEventListener("click", () => {
                // Remove user data from localStorage
                localStorage.removeItem("signedInUser");

                // Redirect to the signin page
                window.location.href = "./signin.html";
            });
        }

        // Call the logout function when the page is ready
        logout();
        const logoutBtn = this.querySelector("#logout-btn");
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("signedInUser");
            window.location.href = "./signin.html";
        });

    }
}

customElements.define("shared-navbar", SharedNavbar);

class SharedFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
        <div class="footer_container">
            <div class="footer_container_pc">
                <p>Copyright &copy; 2025 <b>Adrien Dejonc</b>. All Rights Reserved.</b></p>
            </div>
            <div class="footer_container_mobile">
                <div class="parent_footer">
                    <div class="div1_footer"><a href="./index.html"><img class="dev_ico1" src="./images/home.png" width="25" height="25"></a></div>
                    <div class="div2_footer"><a href="./marketplace.html"><img class="dev_ico1" src="./images/marketplace.png" width="25" height="25"></a></div>
                    <div class="div3_footer"><a href="./padel_premier.html"><img class="dev_ico1" src="./images/padel_menu.png" width="25" height="25"></a></div>
                    <div class="div4_footer"><a href="./courts.html"><img class="dev_ico1" src="./images/tennis-court (1).png" width="25" height="25"></a></div>
                    <div class="div5_footer"><a href="./profile.html"><img class="dev_ico1" src="./images/user_menu.png" width="25" height="25"></a></div>
                    <div class="div6_footer">HOME</div>
                    <div class="div7_footer">MARKETPLACE</div>
                    <div class="div8_footer">PADEL PREMIER</div>
                    <div class="div9_footer">COURTS</div>
                    <div class="div10_footer">PROFILE</div>
                </div>
            </div>
        </div>
    </footer>
        `;
    }
}
customElements.define("shared-footer", SharedFooter);

class SharedTopMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="feed-menu">
                <span><a href="./index.html">The Social 🌐</a></span>
                <span><a href="./marketplace.html">The Market 🛒</a></span>
                <span><a href="./courts.html">The Courts 🎾</a></span>
                <span><a href="./padel_premier.html">The Premier 🏆</a></span>
            </div>
            <header class="top-bar">
                <input type="text" placeholder="Search matches, players, clubs.">
                <div class="icons">
                </div>
            </header>
        `;
    }
}
customElements.define("shared-top-menu", SharedTopMenu);