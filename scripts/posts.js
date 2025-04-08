document.addEventListener("DOMContentLoaded", async function () {
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
          <input type="text" style="padding: 8px 0px 8px 0px; width: 100%; border: 1px solid #ccc; border-radius: 5px; background-color: #f1f1f1; margin-top: 20px; margin-bottom: 2.5px" placeholder="Write your comment">
          <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f">Post!</button>
        `;
        matchList.appendChild(div);
      });
    }
  
    async function loadContentJsonOnce() {
      const existingPosts = getPosts();
      if (existingPosts.length === 0) {
        try {
          const response = await fetch("./content.json");
          const data = await response.json();
          if (data?.post) {
            savePosts(data.post); // Only save if nothing exists
          }
        } catch (error) {
          console.error("Erro ao carregar o JSON:", error);
        }
      }
    }
  
    form?.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const user_name = document.getElementById("user_name").value;
      const match = document.getElementById("match").value;
      const result = document.getElementById("result").value;
      const match_result = document.getElementById("match_result").value;
  
      if (!user_name || !match || !result || !match_result) return;
  
      const newPost = {
        user_name,
        match,
        result,
        match_result,
      };
  
      const posts = getPosts();
      posts.unshift(newPost); // Add to the top
      savePosts(posts);
      renderPosts();
      form.reset();
    });
  
    await loadContentJsonOnce();
    renderPosts();
  });