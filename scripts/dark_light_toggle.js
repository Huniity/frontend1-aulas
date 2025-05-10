function toggleMode(){
const currentMode = localStorage.getItem('mode') || 'light';

document.body.classList.add(currentMode + '-mode');

document.getElementById('toggleButton').addEventListener('click', () => {
  const newMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(newMode + '-mode');
  localStorage.setItem('mode', newMode);
});
}

toggleMode()

function toggleMode2(){
const currentMode = localStorage.getItem('mode') || 'light';

document.body.classList.add(currentMode + '-mode');

document.getElementById('dark_mode').addEventListener('click', () => {
  const newMode = document.body.classList.contains('light-mode') ? 'dark' : 'light';
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(newMode + '-mode');
  localStorage.setItem('mode', newMode);
});
}

toggleMode2()