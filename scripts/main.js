async function getUser() {
    try {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            updateUser(JSON.parse(storedUser));
            console.log("user exists"+storedUser);
            return null;
        }
        else {
            console.log("user does not exists"+storedUser);
        }
        const response = await fetch("user.json");
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data));
    } 
    catch (error) {
        console.error("Error fetching user data:", error);
    }
}

function updateUser(users) {
    const userListDiv = document.getElementById("user-submited");


    users.forEach(user => {
        const userElement = document.createElement("p");
        userElement.textContent = user.name;
        userListDiv.appendChild(userElement);
    });
}


document.getElementById("user-form").addEventListener("submit", getUser);

