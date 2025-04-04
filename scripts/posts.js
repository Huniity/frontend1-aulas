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
    postContainer.classList.add("post_list");

    const postImg = document.createElement("img");
    postImg.textContent = post.user_img;

    const postUser_Name = document.createElement("h2");
    postUser_Name.textContent = post.user_name;

    const postMatch = document.createElement("p");
    postMatch.textContent = post.match;
    const postResult = document.createElement("p");
    postResult.textContent = post.result;
    const postMatch_result = document.createElement("p");
    postMatch_result.textContent = post.match_result;
    
    //
    const postCommentInput = document.createElement("input");
    postCommentInput.classList.add("post_input");
    postCommentInput.type = "text";
    postCommentInput.placeholder = "Write your comment...";

    const postBtn = document.createElement("button");
    postBtn.classList.add("save-btn");
    postBtn.textContent = "Post!";


    postContainer.appendChild(postImg);
    postContainer.appendChild(postUser_Name);
    postContainer.appendChild(postMatch);
    postContainer.appendChild(postResult);
    postContainer.appendChild(postMatch_result);
    postContainer.appendChild(postCommentInput);
    postContainer.appendChild(postBtn);

    document.getElementById("posts-container").appendChild(postContainer);

}

getContent();