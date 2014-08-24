/**
 * Created by Miroku on 29/07/2014.
 */
var BasicGame = {};

BasicGame.Boot = function(game){

};

BasicGame.Boot.prototype = {
    preload: function(){
        this.load.image('startButton','./assets/gui/startgame.png');
        this.load.image('loadingFrame','./assets/gui/loadingbar_frame.png');
        this.load.image('loadingFill','./assets/gui/loadingbar_fill.png');
    },
    create: function(){
        if(this.game.device.desktop)
        {
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 320;
            this.scale.minHeight = 480;
            this.scale.maxWidth = 768;
            this.scale.maxHeight = 1024;
            this.scale.forceLandscape = false;
            this.scale.pageAlignHorizontally = true;
        }

        this.scale.setScreenSize(true);
        this.state.start('Preloader');
    }
};