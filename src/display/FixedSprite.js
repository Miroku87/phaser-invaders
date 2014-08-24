/**
 * Created by Andrea on 07/08/2014.
 */
FixedSprite = function(game, x, y, key, frame)
{
    Phaser.Sprite.call(this,game, x, y, key, frame);
};

FixedSprite.prototype = Object.create(Phaser.Sprite.prototype);
FixedSprite.prototype.constructor = FixedSprite;
FixedSprite.prototype.absoluteX = function()
{
    var level = this;
    var absX = level.position.x;
    while(level.parent != null)
    {
        level = level.parent;
        absX += level.position.x;
    }

    return absX;
};
FixedSprite.prototype.absoluteY = function()
{
    var level = this;
    var absY = level.position.y;
    while(level.parent != null)
    {
        level = level.parent;
        absY += level.position.y;
    }

    return absY;
};
FixedSprite.prototype.preUpdate = function()
{
    if (this._cache[4] === 1 && this.exists)
    {
        this.world.setTo(this.absoluteX(), this.absoluteY());
        this.worldTransform.tx = this.world.x;
        this.worldTransform.ty = this.world.y;
        this._cache[0] = this.world.x;
        this._cache[1] = this.world.y;
        this._cache[2] = this.rotation;

        if (this.body)
        {
            this.body.preUpdate();
        }

        this._cache[4] = 0;

        return false;
    }

    this._cache[0] = this.world.x;
    this._cache[1] = this.world.y;
    this._cache[2] = this.rotation;

    if (!this.exists || !this.parent.exists)
    {
        //  Reset the renderOrderID
        this._cache[3] = -1;
        return false;
    }

    if (this.lifespan > 0)
    {
        this.lifespan -= this.game.time.elapsed;

        if (this.lifespan <= 0)
        {
            this.kill();
            return false;
        }
    }

    //  Cache the bounds if we need it
    if (this.autoCull || this.checkWorldBounds)
    {
        this._bounds.copyFrom(this.getBounds());
    }

    if (this.autoCull)
    {
        //  Won't get rendered but will still get its transform updated
        this.renderable = this.game.world.camera.screenView.intersects(this._bounds);
    }

    if (this.checkWorldBounds)
    {
        //  The Sprite is already out of the world bounds, so let's check to see if it has come back again
        if (this._cache[5] === 1 && this.game.world.bounds.intersects(this._bounds))
        {
            this._cache[5] = 0;
            this.events.onEnterBounds.dispatch(this);
        }
        else if (this._cache[5] === 0 && !this.game.world.bounds.intersects(this._bounds))
        {
            //  The Sprite WAS in the screen, but has now left.
            this._cache[5] = 1;
            this.events.onOutOfBounds.dispatch(this);

            if (this.outOfBoundsKill)
            {
                this.kill();
                return false;
            }
        }
    }

    this.world.setTo(this.game.camera.x + this.worldTransform.tx, this.game.camera.y + this.worldTransform.ty);

    if (this.visible)
    {
        this._cache[3] = this.game.stage.currentRenderOrderID++;
    }

    this.animations.update();

    if (this.body)
    {
        this.body.preUpdate();
    }

    //  Update any Children
    for (var i = 0, len = this.children.length; i < len; i++)
    {
        this.children[i].preUpdate();
    }

    return true;

};