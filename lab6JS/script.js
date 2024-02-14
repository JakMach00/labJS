const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let balls = [];
let animationFrameId = null;
const ballCount = 44;
const minDistance = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createBall() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20,
        dx: (Math.random() - 1) * 1.5,
        dy: (Math.random() - 1) * 1.5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    };
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function updateBall(ball) {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
}

function drawLine(ball1, ball2) {
    const dx = ball1.x - ball2.x;
    const dy = ball1.y - ball2.y;
    if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
        ctx.beginPath();
        ctx.moveTo(ball1.x, ball1.y);
        ctx.lineTo(ball2.x, ball2.y);
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(drawBall);
    balls.forEach(updateBall);

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            drawLine(balls[i], balls[j]);
        }
    }

    animationFrameId = requestAnimationFrame(animate);
}

function init() {
    balls = [];
    for (let i = 0; i < ballCount; i++) {
        balls.push(createBall());
    }
    animate();
}

document.getElementById('start').addEventListener('click', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    balls = [];
    init();
});

document.getElementById('reset').addEventListener('click', () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls = [];
});

resizeCanvas();