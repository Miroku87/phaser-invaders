/**
 * Created by Miroku on 31/07/2014.
 */
Player = function (game)
{
    Phaser.Sprite.call(this,game,0,0,'player');
    this.anchor.set(.5,1);
    this.scale.set(.5,.5);

    this.enableBody = true;
    game.physics.arcade.enable(this,Phaser.Physics.ARCADE);
};

Player.ASSETS = [
    {type:'image',key:'player',src:'./assets/sprites/player.png'}
];
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.shoot = function ()
{
    console.log('shoot!');
};
