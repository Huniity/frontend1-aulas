function redirect () {
    setTimeout(myURL, 5000);
    var result = document.getElementById("result");
    result.innerHTML = "<b> The page will redirect after delay of 5 seconds";
 }

 function myURL() {
    document.location.href = 'http://http://127.0.0.1:5500/posts.html';
 }
