/**
 * Created by Miroku on 31/07/2014.
 */
AlienRow = function (game,type,quantity,colWidth)
{
    Phaser.Group.call(this,game);

    var  _t = type
        ,_q = quantity
        ,_cw = colWidth
        ,_alien = null;

    this.realWidth = 0;

    this.direction = AlienRow.DIRECTION_RIGHT;

    for(var i = 0; i < _q; i++)
    {
        _alien = new Alien(this.game,_t);
        _alien.x = i * (_cw + AlienGroup.DISTANCE_X) + ((_cw - _alien.width)/2);
        this.add(_alien);
        Alien.instances.push(_alien);
    }

    this.realWidth = this.width;
};

AlienRow.prototype = Object.create(Phaser.Group.prototype);
AlienRow.prototype.constructor = AlienRow;

AlienRow.prototype.nextFrame = function ()
{
    this.callAllExists('nextFrame',true);
};

AlienRow.DIRECTION_RIGHT = 1;
AlienRow.DIRECTION_LEFT = -1;