var PhaserInvaders = PhaserInvaders || (function(){
    var  _self = this
		,game
		,alien1, alien2, alien3;

    _self.main = function(){
        game = new Phaser.Game(800,450,Phaser.AUTO,'');
        game.state.add('Boot',BasicGame.Boot);
        game.state.add('Preloader',BasicGame.Preloader);
        game.state.add('MainMenu',BasicGame.MainMenu);
        game.state.add('Game',BasicGame.Game);

        game.state.start('Boot');
    }

	return _self;
})();