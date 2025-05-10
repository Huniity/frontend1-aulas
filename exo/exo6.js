
      navigator.geolocation.getCurrentPosition((position) => {
        document.getElementById('latitude').textContent = position.coords.latitude;
        document.getElementById('longitude').textContent = position.coords.longitude;
      });
    function updateDateTime() {
      const now = new Date();
      const dateTimeStr = now.toLocaleString('pt-PT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      document.getElementById('datetime').textContent = dateTimeStr;
    }
    setInterval(updateDateTime, 1000);
    document.getElementById('copyButton').addEventListener('click', () => {
      const textToCopy = document.getElementById('textToCopy');
      textToCopy.select();

      try {
        document.execCommand('copy');
        alert('Copied!');
      } catch (err) {
        alert('Failed Copy!');
      }
    });
    document.getElementById('fullscreenButton').addEventListener('click', () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    });