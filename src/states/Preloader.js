/**
 * Created by Miroku on 29/07/2014.
 */
BasicGame.Preloader = function(game){
    this.classesWithAssets = [Alien,Player];
    this.bg = null;
    this.preloadBar = null;

    this.ready = false;
}

BasicGame.Preloader.prototype = {
    preload: function(){
        this.bg = this.add.sprite(this.world.centerX, this.world.centerY,'loadingFrame');
        this.bg.anchor.set(.5,.5);
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'loadingFill');
        this.preloadBar.anchor.set(.5,.5);
        //this.preloadBar.x = this.world.centerX - this.preloadBar.width/2;

        this.load.setPreloadSprite(this.preloadBar);

        var asset = {};
        for(var c in this.classesWithAssets)
            for (var a in this.classesWithAssets[c].ASSETS)
            {
                asset = this.classesWithAssets[c].ASSETS[a];
                if(asset.type == 'spritesheet') this.load[asset.type](asset.key, asset.src, asset.sheetWidth, asset.sheetHeight);
                if(asset.type == 'image') this.load[asset.type](asset.key, asset.src);
            }

        this.load.audio('shoot','./assets/audio/shoot.wav');
    },
    create: function(){
        this.preloadBar.cropEnabled = false;
    },
    update: function(){
        if(this.cache.isSoundDecoded('shoot') && !this.ready)
        {
            this.ready = true;
            //this.state.start('MainMenu');
            this.state.start('Game');
        }
    }
};