GhostPlayer = function(game,ghostData,idRoom) {
    this.game = game;
    var fakePlayer = {};
    //init ghost paddle

    fakePlayer.id = ghostData.id;
    fakePlayer.x = ghostData.x;
    fakePlayer.y = ghostData.y;
    fakePlayer.width = ghostData.width;
    fakePlayer.height = ghostData.height;
    fakePlayer.dy = ghostData.dy;
    fakePlayer.score = ghostData.score;
    
    return GhostPaddle;
}

moveGhost = function(game, ghostData, idRoom){
    GhostPaddle
}