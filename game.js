var canvas;
var canvas_context;
var ball_x = 50;

window.onload = function () {
  console.log("loaded");
  canvas = document.getElementById('gameCanvas');
  canvas_context = canvas.getContext('2d');

  var frames_per_second = 30;

  setInterval(function() {
    drawEverything();
    moveBall();
  }, 1000 / frames_per_second);
}

function drawBoard() {
  canvas_context.fillStyle = 'black';
  canvas_context.fillRect(0, 0, canvas.width, canvas.height);
  console.log('Board created.');
}

function drawPaddle() {
  canvas_context.fillStyle = 'white';
  canvas_context.fillRect(0, 210, 10, 100);
}

function drawBall() {
  canvas_context.fillStyle = 'white';
  canvas_context.fillRect(ball_x, 200, 10, 10);
}

function drawEverything() {
  drawBoard();
  drawPaddle();
  drawBall();
}

function moveBall() {
  ball_x = ball_x + 5;
}
