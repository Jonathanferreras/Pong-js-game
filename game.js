var canvas;
var canvas_context;

var player_1_score = 0;
var player_2_score = 0;
const MAX_SCORE = 3;

var player_won = false;

var ball_x = 50;
var ball_y = 50;
var ball_speed_x = 10;
var ball_speed_y = 4;

var first_paddle_y = 250;
var second_paddle_y = 250;
const PADDLE_HEIGHT = 50;
const PADDLE_WIDTH = 10;


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

  canvas.addEventListener('mousedown', handleMouseClick);
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

function drawNet() {
  for (var i = 0; i < canvas.height; i += 20) {
    canvas_context.fillStyle = 'white';
    canvas_context.fillRect(((canvas.width / 2) - 1), i, 2, 10);
  }
}

function drawElements() {

  if (player_won) {
    drawBoard();
    canvas_context.fillStyle = 'white';

    if (player_1_score >= MAX_SCORE) {
      canvas_context.fillText('Player 1 Wins!', 170, 100);
    } else if (player_2_score >= MAX_SCORE) {
      canvas_context.fillText('CPU wins!', 170, 100);
    }
    canvas_context.fillText('click to continue', 170, 150);
    return;
  }

  drawBoard();
  drawNet();
  //Left paddle
  drawPaddle(5, first_paddle_y, PADDLE_WIDTH, PADDLE_HEIGHT);

  //Right paddle
  drawPaddle(canvas.width - 15, second_paddle_y, PADDLE_WIDTH, PADDLE_HEIGHT);
  drawBall();
  score('Player score: '+ player_1_score, 50);
  score('CPU score: '+ player_2_score, canvas.width - 70);
}

function score(score, pos) {
  canvas_context.fillText(score, pos, 100);
}

function computerAI() {
  var second_paddle_y_center = second_paddle_y + (PADDLE_HEIGHT / 2);

  if (second_paddle_y_center < ball_y + 25) {
    second_paddle_y += 6;
  } else if (second_paddle_y_center > ball_y - 25) {
    second_paddle_y -= 6;
  }
}

function moveBall() {
  if (player_won) {
    return;
  }

  computerAI();

  ball_x += ball_speed_x;
  ball_y += ball_speed_y;

  //Left wall
  if (ball_x < 0) {
    if (ball_y > first_paddle_y && ball_y < first_paddle_y + PADDLE_HEIGHT) {
      ball_speed_x = -ball_speed_x

      var delta_y = ball_y - (first_paddle_y + (PADDLE_HEIGHT / 2));

      ball_speed_y = delta_y * 0.25
    } else {
      player_2_score++;
      ballReset();
    }
  }

  //Right wall
  if (ball_x > canvas.width) {
    if (ball_y > second_paddle_y && ball_y < second_paddle_y + PADDLE_HEIGHT) {
      ball_speed_x = -ball_speed_x

      var delta_y = ball_y - (second_paddle_y + (PADDLE_HEIGHT / 2));

      ball_speed_y = delta_y * 0.25
    } else {
      player_1_score++;
      ballReset();
    }
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

function handleMouseClick(evt) {
  if (player_won) {
    player_1_score = 0;
    player_2_score = 0;
    player_won = false;
  }
}

function ballReset() {
  if (player_1_score >= MAX_SCORE || player_2_score >= MAX_SCORE) {
    player_won = true;
  }

  ball_speed_x = -ball_speed_x;
  ball_x = canvas.width / 2;
  ball_y = canvas.height / 2;
}
