/**
 * Created by Miroku on 05/08/2014.
 */
Projectile = function (game)
{
    var bmp = new Phaser.BitmapData(game,'projectile',5,30);
    bmp.ctx.fillStyle = '#FFFFFF';
    bmp.ctx.fillRect(0,0,5,30);
    Phaser.Sprite.call(this,game,0,0,bmp);

    this.anchor.set(.5,1);

    this.enableBody = true;
    game.physics.arcade.enable(this,Phaser.Physics.ARCADE);
};

Projectile.prototype = Object.create(Phaser.Sprite.prototype);
Projectile.prototype.constructor = Projectile;
Projectile.prototype.update = function ()
{
    //this.body.velocity.y -= 80;
    this.y -= 10;
};
