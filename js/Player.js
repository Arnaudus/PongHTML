let player = {};
let paddleSpeed = 6;

exports.initPlayer = function(playerData){
    player.id = playerData.id;
    player.x = playerData.x;
    player.y = playerData.y;
    player.width = playerData.width;
    player.height = playerData.height;
    player.dy = playerData.dy;
    player.score = playerData.score;


    return player;
}

document.addEventListener('keydown', function(e){
    // up arrow key
    if (e.key === "ArrowUp") {
        player.dy = -paddleSpeed;
      }
      // down arrow key
      else if (e.key === "ArrowDown") {
        player.dy = paddleSpeed;
      }
})

document.addEventListener('keyup', function(e){
    // up arrow key
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player.dy = 0;
      }
})

exports.getPlayer = function(){
    return player;
}

