var canvas;
var canvas_context;

var ball_x = 50;
var ball_y = 50;
var ball_speed_x = 10;
var ball_speed_y = 4;

var first_paddle_y = 250;
var second_paddle_y = 250;
const PADDLE_HEIGHT = 70;
const PADDLE_WIDTH = 20;


window.onload = function() {
  console.log("loaded");
  canvas = document.getElementById('gameCanvas');
  canvas_context = canvas.getContext('2d');

  var frames_per_second = 30;

  setInterval(function() {
    drawElements();
    moveBall();
  }, 1000 / frames_per_second);

  canvas.addEventListener('mousemove', function(evt) {
    var mouse_pos = calculateMousePos(evt);
    first_paddle_y = mouse_pos.y - (PADDLE_HEIGHT / 2);
  });
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
  drawPaddle(10, first_paddle_y, PADDLE_WIDTH, PADDLE_HEIGHT);

  //Right paddle
  drawPaddle(canvas.width - 30, second_paddle_y, PADDLE_WIDTH, PADDLE_HEIGHT);
  drawBall();
}

function moveBall() {
  ball_x = ball_x + ball_speed_x;
  ball_y = ball_y + ball_speed_y;

  //Left wall
  if (ball_x < 0) {
    if (ball_y > first_paddle_y && ball_y < first_paddle_y + PADDLE_HEIGHT) {
      ball_speed_x = -ball_speed_x
    } else {
        ballReset();
    }
  }

  if (ball_x > canvas.width) {
    if (ball_y > second_paddle_y && ball_y < second_paddle_y + PADDLE_HEIGHT) {
      ball_speed_x = -ball_speed_x
    } else {
        ballReset();
    }
  }

  //Right wall
  if (ball_x > canvas.width) {
    ball_speed_x = -ball_speed_x;
  }

  if (ball_y < 0 || ball_y > canvas.height) {
    ball_speed_y = -ball_speed_y;
  }
}

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouse_x = evt.clientX - rect.left - root.scrollLeft;
  var mouse_y = evt.clientY - rect.top - root.scrollTop;

  return {
    x : mouse_x,
    y : mouse_y
  };
}

function ballReset() {
  ball_speed_x = -ball_speed_x;
  ball_x = canvas.width / 2;
  ball_y = canvas.height / 2;
}
