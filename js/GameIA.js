game.ai = {
    player: null,
    ball: null,
    setPlayerAndBall : function(player, ball) {
        this.player = player;
        this.ball = ball;
    },
    move : function() {
        if ( this.ball.directionX == 1 )
            this.followBall();
        else 
            this.goCenter();
    },

    followBall : function() {
        if ( this.ball.posY < this.player.posY + this.player.height/2 ) {
            // la position de la balle est sur l'écran, au dessus de celle de la raquette
            this.player.posY--;
          } else if ( this.ball.posY > this.player.posY + this.player.height/2 ) {
            // la position de la balle est sur l'écran, en dessous de celle de la raquette
            this.player.posY++;
          }
    },
   
    goCenter : function() {
        if ( this.player.posY + this.player.height/2 > game.groundHeight / 2 ) {
            this.player.posY--;
          } else if ( this.player.posY + this.player.height/2 < game.groundHeight / 2 ) {
            this.player.posY++;
          }
    }
}