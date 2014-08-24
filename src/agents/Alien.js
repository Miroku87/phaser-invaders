/**
 * Created by Miroku on 31/07/2014.
 */
Alien = function (game,type)
{
    FixedSprite.call(this,game,0,0,'alien'+type);
    //Phaser.Sprite.call(this,game,0,0,'alien'+type);
    this.scale.set(.5,.5);
    this.animations.add('move',[0,1],5,true);

    this.enableBody = true;
    game.physics.arcade.enable(this,Phaser.Physics.ARCADE);

    this.isDying = false;
};

Alien.ASSETS = [
    {type:'spritesheet',key:'alien1',src:'./assets/sprites/alien_1.png',sheetWidth:106,sheetHeight:64},
    {type:'spritesheet',key:'alien2',src:'./assets/sprites/alien_2.png',sheetWidth:106,sheetHeight:64},
    {type:'spritesheet',key:'alien3',src:'./assets/sprites/alien_3.png',sheetWidth:106,sheetHeight:64}
];
Alien.instances = [];

Alien.prototype = Object.create(FixedSprite.prototype);
//Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;
Alien.prototype.nextFrame = function ()
{
    if(!this.isDying) this.animations.next(1);
};
Alien.prototype.kill = function ()
{
    this.isDying = true;
    this.animations.frame = 2;

    var k = this;
    setTimeout(function ()
    {
        FixedSprite.prototype.kill.call(k);
        k.isDying = false;
        console.log('killed');
    },200);
};