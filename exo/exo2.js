const form = document.getElementById('name-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      localStorage.setItem('saved_user', nome);
      console.log('User Saved:', nome);
    });

    const saved_user = localStorage.getItem('saved_user');
    if (saved_user) {
      console.log('Nome recuperado do localStorage:', saved_user);
    }
    const body = document.body;
    const myMode = sessionStorage.getItem('mode') || 'light';
    body.className = myMode;
    document.getElementById('my-mode').textContent = `My Mode: ${myMode}`;

    document.getElementById('toggle-dark').addEventListener('click', () => {
      const newMode = body.classList.contains('light') ? 'dark' : 'light';
      body.className = newMode;
      sessionStorage.setItem('mode', newMode);
      document.getElementById('my-mode').textContent = `My Mode: ${newMode}`;
    });