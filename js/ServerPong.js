var express = require('express')
  , http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var os = require('os');
var ifaces = os.networkInterfaces();

var play = require('./Player');
// ================================================



// ================================================
// SHOW IP ADDRESS IN CONSOLE
console.log('=============');
console.log('IP ADDRESS:');
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
    }
    if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
    } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
    }
    ++alias;
    });
});
console.log('=============');
// ================================================



// ================================================
// DECLARATION

var sockets = {};
var countUsers = 0; // number of users since the beginning of the server

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 5; // 80

var ballSpeed = 5;

const paddles = [
    {id:1, x: grid * 2, y: canvas.height / 2 - paddleHeight / 2, width: grid, height: paddleHeight, dy: 0, score : 0 },
    {id:2, x: canvas.width - grid * 3, y: canvas.height / 2 - paddleHeight / 2, width: grid, height: paddleHeight, dy: 0, score : 0}
];

var players = [];

  const ball = {
    // start in the middle of the game
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: grid,
    height: grid,
  
    // keep track of when need to reset the ball position
    resetting: false,
  
    // ball velocity (start going to the top-right corner)
    dx: ballSpeed,
    dy: -ballSpeed
  };

// ================================================



// ================================================
// USE PUBLIC FOLDER AS STATIC FOLDER
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
// ================================================



// ================================================
// START LISTENING CLIENT
io.on('connection', function(socket){
    socket.name = "player"+countUsers;
    countUsers++;
    if(countUsers > 2) return;

    player[countUsers] = play.initPlayer(paddles[countUsers]);

    if(countUsers ==2)  requestAnimationFrame(loop);

})


function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
  
    // move paddles by their velocity
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;
  
    // prevent paddles from going through walls
    if (leftPaddle.y < grid) {
      leftPaddle.y = grid;
    }
    else if (leftPaddle.y > maxPaddleY) {
      leftPaddle.y = maxPaddleY;
    }
  
    if (rightPaddle.y < grid) {
      rightPaddle.y = grid;
    }
    else if (rightPaddle.y > maxPaddleY) {
      rightPaddle.y = maxPaddleY;
    }
  
    // draw paddles
    context.fillStyle = 'white';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
  
    // move ball by its velocity
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    
  
    // prevent ball from going through walls by changing its velocity
    if (ball.y < grid) {
      ball.y = grid;
      ball.dy *= -1;
    }
    else if (ball.y + grid > canvas.height - grid) {
      ball.y = canvas.height - grid * 2;
      ball.dy *= -1;
    }
  
    // reset ball if it goes past paddle (but only if we haven't already done so)
    if ( (ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
      ball.resetting = true;
  
      // give some time for the player to recover before launching the ball again
      setTimeout(() => {
        ball.resetting = false;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dy = Math.floor(Math.random() * 11) - 5;
      }, 400);
    }
  
    // check to see if ball collides with paddle. if they do change x velocity
    if (collides(ball, leftPaddle)) {
      ball.dx *= -1;
  
      // move ball next to the paddle otherwise the collision will happen again
      // in the next frame
      ball.x = leftPaddle.x + leftPaddle.width;
    }
    else if (collides(ball, rightPaddle)) {
      ball.dx *= -1;
  
      // move ball next to the paddle otherwise the collision will happen again
      // in the next frame
      ball.x = rightPaddle.x - ball.width;
    }
  
    // draw ball
    context.fillStyle = 'yellow';
    context.fillRect(ball.x, ball.y, ball.width, ball.height);
  
    // draw walls
    context.fillStyle = 'lightgrey';
    context.fillRect(0, 0, canvas.width, grid);
    context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
  
    // draw dotted line down the middle
    for (let i = grid; i < canvas.height - grid; i += grid * 2) {
      context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    }
  }
  
// // CHECK POSITION PLAYERS
// setInterval(function(){
//     io.emit('requestPosition');
// }, 5000);


// START LISTENING ON THE PORT
server.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('JustSquare listening at http://%s:%s', host, port);
});