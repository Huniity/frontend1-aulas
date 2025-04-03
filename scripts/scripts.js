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
    // Create a new container for each post
    const postContainer = document.createElement("div");
    postContainer.classList.add("post");

    // Create and add the title
    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;

    // Create and add the description
    const postDesc = document.createElement("p");
    postDesc.textContent = post.description;

    // Append the title and description to the post container
    postContainer.appendChild(postTitle);
    postContainer.appendChild(postDesc);

    // Append the post container to the body or a specific container
    document.getElementById("posts-container").appendChild(postContainer);
}

getContent();


// fetch(url)
//   .then(function() {
    
//   })
//   .catch(function() {
    
//   });

