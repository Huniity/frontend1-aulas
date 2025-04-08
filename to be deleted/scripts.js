async function getContent(){
    try {
        const response = await fetch("content.json");
        const data = await response.json();
        const posts = data.post;
        posts.forEach((post) => updateContent(post));
    } catch (error){
        console.log(error);
    }
}


function updateContent(post) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");

    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;

    const postDesc = document.createElement("p");
    postDesc.textContent = post.description;

    postContainer.appendChild(postTitle);
    postContainer.appendChild(postDesc);

    document.getElementById("posts-container").appendChild(postContainer);
}

getContent();
