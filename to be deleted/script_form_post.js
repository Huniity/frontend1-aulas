document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("match-form");
    const matchList = document.getElementById("match-list");
  
    function getPosts() {
      const data = JSON.parse(localStorage.getItem("padel_posts"));
      return data ? data.post : [];
    }
  
    function savePosts(posts) {
      localStorage.setItem("padel_posts", JSON.stringify({ post: posts }));
    }
  
    function renderPosts() {
      const posts = getPosts();
      matchList.innerHTML = "";
  
      posts.forEach((entry) => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <h2>${entry.user_name}</h2>
          ${entry.match}<br><br>
          ${entry.result}<br><br>
          ${entry.match_result}<br>
          <input type="text" style="padding: 8px 0px 8px 0px; width: 100%; border: 1px solid #ccc; border-radius: 5px; background-color: #f1f1f1; margin-top: 20px" placeholder="Write your comment">
          <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f">Post!
          `;
        matchList.appendChild(div);
      });
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const user_name = document.getElementById("user_name").value.trim();
      const match = document.getElementById("match").value.trim();
      const result = document.getElementById("result").value.trim();
      const match_result = document.getElementById("match_result").value;
  
      if (!user_name || !match || !result || !match_result) return;
  
      const newPost = {
        user_name,
        match,
        result,
        match_result,
      };
  
      const posts = getPosts();
      posts.push(newPost);
      savePosts(posts);
      renderPosts();
  
      form.reset();
    });
  
    renderPosts();
  });