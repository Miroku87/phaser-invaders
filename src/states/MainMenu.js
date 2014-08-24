/**
 * Created by Miroku on 29/07/2014.
 */
BasicGame.MainMenu = function(game){
    this.playButton = null;
};

BasicGame.MainMenu.prototype = {
    create: function(){
        this.playButton = this.add.button(this.world.centerX,this.world.centerY,'startButton',this.startGame,this);
        this.playButton.anchor.set(.5,.5);
        this.playButton.inputEnabled = true;
        this.playButton.input.useHandCursor = true;
    },
    update: function(){},
    startGame: function(pointer){
        this.state.start('Game');
    }
};