var canvas;
var canvas_context;
var ball_x = 50;
var ball_y = 50;
var ball_speed_x = 10;
var ball_speed_y = 4;


window.onload = function () {
  console.log("loaded");
  canvas = document.getElementById('gameCanvas');
  canvas_context = canvas.getContext('2d');

  var frames_per_second = 30;

  setInterval(function() {
    drawElements();
    moveBall();
  }, 1000 / frames_per_second);
}

function drawBoard() {
  canvas_context.fillStyle = 'black';
  canvas_context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawPaddle(pos_x, pos_y, width, height) {
  canvas_context.fillStyle = 'white';
  canvas_context.fillRect(pos_x, pos_y, width, height);
}

function drawBall() {
  canvas_context.fillStyle = 'white';
  canvas_context.beginPath();
  canvas_context.arc(ball_x, ball_y, 10, 0, Math.PI * 2, true);
  canvas_context.fill();
}

function drawElements() {
  drawBoard();
  //Left paddle
  drawPaddle(10, 105, 20, 70);

  //Right paddle
  drawPaddle(canvas.width - 35, 105, 20, 70);
  drawBall();
}

function moveBall() {
  ball_x = ball_x + ball_speed_x;
  ball_y = ball_y + ball_speed_y;

  if (ball_x < 0 || ball_x > canvas.width) {
    ball_speed_x = -ball_speed_x;
  }

  if (ball_y < 0 || ball_y > canvas.height) {
    ball_speed_y = -ball_speed_y;
  }
}
