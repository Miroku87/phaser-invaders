/**
 * Created by Miroku on 31/07/2014.
 */
AlienGroup = function (game,formation)
{
    Phaser.Group.call(this,game);

    //private game vars
    var  _alienInterval = .1;

    //private util vars
    var  _formation = AlienGroup.FORMATIONS[formation]
        ,_alienRow = null
        ,_oldAlien = _formation.rowsTypes[0]
        ,_offsetY = 0
        ,_distY = 0
        ,_maxWidth = Math.max((new Alien(this.game,1)).width,(new Alien(this.game,2)).width,(new Alien(this.game,3)).width);

    //public util vars
    this.rowIndex = 0;

    for(var i = 0; i < _formation.rowsTypes.length; i++)
    {
        _offsetY = _oldAlien == _formation.rowsTypes[i] ? 0 : AlienGroup.DISTANCE_Y;
        _alienRow = new AlienRow(this.game,_formation.rowsTypes[i],_formation.quantity,_maxWidth);

        if(i != 0) _distY += (_alienRow.height + AlienGroup.DISTANCE_Y) + _offsetY;
        _alienRow.y = _distY;
        this.add(_alienRow);

        _oldAlien = _formation.rowsTypes[i];
    }
    this.rowIndex = this.length-1;
    //far partire timer per lo spostamento delle AlienRow
    this.game.time.events.loop(_alienInterval*1000, this.moveAliensRows, this);
};

AlienGroup.prototype = Object.create(Phaser.Group.prototype);
AlienGroup.prototype.constructor = AlienGroup;
AlienGroup.prototype.moveAliensRows = function ()
{
    var row = this.getAt(this.rowIndex);
    var maxWidth = 0;

    this.forEachExists(function (child)
    {
        maxWidth = child.width > maxWidth ? child.width : maxWidth;
    }, this);

    if(row)
    {
        var rowX = this.x + row.x + row.getFirstAlive().x;
        row.callAllExists('nextFrame',true);

        if ((row.direction > 0 && rowX + maxWidth + AlienGroup.SPEED_X >= this.game.world.width) ||
            (row.direction < 0 && rowX <= 0))
        {
            row.direction *= -1;
            row.y += row.height;
        }

        row.x += AlienGroup.SPEED_X * row.direction;
    }

    if(this.rowIndex-1 >= 0) this.rowIndex--;
    else this.rowIndex = this.length-1;
};

AlienGroup.FORMATIONS = {
    easy : {rowsTypes:[1,2,2,3,3], quantity: 11}
};
AlienGroup.DISTANCE_X = 5;
AlienGroup.DISTANCE_Y = 10;
AlienGroup.SPEED_X = 10;