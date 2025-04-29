const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    let keys = {};

    const racketWidth = 110;
    const racketHeight = 110;
    const paddleSpeed = 15;


    const hitSound = new Audio('./images/hit.mp3');
    // const cheerSound = new Audio('./images/cheer.mp3');
    const racketLeft = new Image();
    racketLeft.src = './images/racket_left.png';

    const racketRight = new Image();
    racketRight.src = './images/racket_right.png';

    let player = {
        x: -30,
        y: canvas.height / 2 - racketHeight / 2,
        width: racketWidth,
        height: racketHeight,
        score: 0
    };

    let ai = {
        x: canvas.width - racketWidth + 30,
        y: canvas.height / 2 - racketHeight / 2,
        width: racketWidth,
        height: racketHeight,
        score: 0,
        missChance: 0.3 // 10% chance AI doesn't react
    };

    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 12,
        color: '#f1c40f',
        speedX: 5,
        speedY: 5
    };

    document.addEventListener('keydown', e => keys[e.key] = true);
    document.addEventListener('keyup', e => keys[e.key] = false);

    function drawRacket(racket, image) {
        ctx.drawImage(image, racket.x, racket.y, racket.width, racket.height);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    }

    function drawScore() {
        ctx.fillStyle = "#ffffff";
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${player.score} : ${ai.score}`, canvas.width / 2, 50);
    }

    function resetBall(scoringPlayer) {
        scoringPlayer.score++;
        // cheerSound.currentTime = 0; // rewind to start
        // cheerSound.play();

        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = (Math.random() > 0.5 ? 5 : -5);
        ball.speedY = (Math.random() > 0.5 ? 5 : -5);
    }


    function update() {
        // Player movement
        if (keys['ArrowUp']) player.y -= paddleSpeed;
        if (keys['ArrowDown']) player.y += paddleSpeed;
        player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

        // AI movement with a chance to "miss"
        if (Math.random() > ai.missChance) {
            if (ball.y < ai.y + ai.height / 2) ai.y -= paddleSpeed * 0.4;
            else if (ball.y > ai.y + ai.height / 2) ai.y += paddleSpeed * 0.4;
        }
        ai.y = Math.max(0, Math.min(canvas.height - ai.height, ai.y));

        // Ball movement
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        // Wall collision
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.speedY *= -1;
        }

        // Collision with player racket
        if (
            ball.x - ball.radius < player.x + player.width &&
            ball.y > player.y &&
            ball.y < player.y + player.height
        ) {
            ball.speedX *= -1.2;
            ball.x = player.x + player.width + ball.radius;
            hitSound.currentTime = 0;
            hitSound.play(); // 🔊 play hit sound
        }

        // Collision with AI racket
        if (
            ball.x + ball.radius > ai.x &&
            ball.y > ai.y &&
            ball.y < ai.y + ai.height
        ) {
            ball.speedX *= -1;
            ball.x = ai.x - ball.radius;
            hitSound.currentTime = 0;
            hitSound.play(); // 🔊 play hit sound
        }

        // Scoring
        if (ball.x < 0) {
            resetBall(ai); // AI scores
        } else if (ball.x > canvas.width) {
            resetBall(player); // Player scores
        }
    }

    function drawNet() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.save();
        ctx.setLineDash([5, 2]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.restore();
    }

    function drawNetShadow() {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.save();
        ctx.setLineDash([5, 2]);
        for (let i = 7; i <= 19; i += 6) {
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2 + i, 0);
            ctx.lineTo(canvas.width / 2 + i, canvas.height - i - 5);
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawMiddleLine() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(150, canvas.height / 2);
        ctx.lineTo(canvas.width - 150, canvas.height / 2);
        ctx.stroke();
    }

    function drawServiceLine() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(170, 0);
        ctx.lineTo(170, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvas.width - 170, 0);
        ctx.lineTo(canvas.width - 170, canvas.height);
        ctx.stroke();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawNet();
        drawNetShadow();
        drawMiddleLine();
        drawServiceLine();
        drawScore();
        drawRacket(player, racketLeft);
        drawRacket(ai, racketRight);
        drawBall();
        update();

        requestAnimationFrame(gameLoop);
    }

    // Wait for images to load before starting game
    racketLeft.onload = () => {
        racketRight.onload = () => {
            gameLoop();
        };
    };