 const postList = document.getElementById('post-list');
    const getBtn = document.getElementById('get');
    const postBtn = document.getElementById('post');
    const abortBtn = document.getElementById('abort');

    let controller;

    async function getPosts() {
      postList.innerHTML = 'Fetching!';

      controller = new AbortController();

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal
        });

        if (!res.ok) throw new Error('Failed to Fetch!');

        const data = await res.json();

        postList.innerHTML = '';
        data.slice(0, 5).forEach(post => {
          const li = document.createElement('li');
          li.textContent = post.title;
          postList.appendChild(li);
        });
      } catch (err) {
        if (err.name === 'AbortError') {
          postList.innerHTML = 'AbortController';
        } else {
          postList.innerHTML = 'Failed to Fetch!';
          console.error(err);
        }
      }
    }

    async function postPost() {
      const newPost = {
        title: 'New Post',
        body: 'Fake Post.',
        userId: 1
      };

      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost)
        });

        const data = await res.json();
        alert(`Fake Post sent! ID: ${data.id}`);
        console.log(data);
      } catch (err) {
        alert('Failed to Post!');
        console.error(err);
      }
    }

    getBtn.addEventListener('click', getPosts);
    postBtn.addEventListener('click', postPost);
    abortBtn.addEventListener('click', () => {
      if (controller) {
        controller.abort();
      }
    });

    getPosts();