document.addEventListener("DOMContentLoaded", function () {
    fetchPost();
  });
  
  function fetchPost() {
    const postId = window.location.search.split("=")[1];
    fetch("api/profile.json")
      .then((response) => response.json())
      .then((result) => {
        const data = result.user.posts.find((post) => post.id === Number(postId));
        renderPost(data);
      });
  }
  
  function renderPost(data) {
    const user_name = document.getElementById("user_name");
    const match = document.getElementById("match");
    const result = document.getElementById("result");
    const match_result = document.getElementById("match_result");
    postuser_name.innerHTML = data.user_name;
    postContent.innerHTML = data.match;
    postGallery.innerHTML = data.result;
  }