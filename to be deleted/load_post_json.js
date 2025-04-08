document.addEventListener("DOMContentLoaded", async function () {
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
          <button type="submit" style="padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px; color: #1e1e1e; background-color: #f1c40f">Post!</button>
        `;
        matchList.appendChild(div);
      });
    }
  
    async function loadContentJsonOnce() {
      // Só carrega e guarda se não houver dados ainda
      if (!localStorage.getItem("padel_posts")) {
        try {
          const response = await fetch("./content.json");
          const data = await response.json();
          if (data?.post) {
            savePosts(data.post);
          }
        } catch (error) {
          console.error("Erro ao carregar o JSON:", error);
        }
      }
    }
  
    // Carrega do JSON apenas uma vez se ainda não estiver salvo
    await loadContentJsonOnce();
  
    // Renderiza os posts guardados
    renderPosts();
  });