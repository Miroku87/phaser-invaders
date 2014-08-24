/**
 * Created by Miroku on 29/07/2014.
 */
BasicGame.Game = function (game)
{
    this.controls = null;
    this.alienG = null;
    this.player = null;
    this.projGroup = null;
    this.projectile = null;
    this.spacebarWasDown = false;
};

BasicGame.Game.prototype = {
    preload: function ()
    {
        console.log('Game preload')
    },
    create: function ()
    {
        console.log('Game create');
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.alienG = new AlienGroup(this.game,'easy');
        this.alienG.x = (this.world.width - this.alienG.width) / 2;
        this.alienG.y = 10;
        this.add.existing(this.alienG);

        this.player = new Player(this.game);
        this.player.x = this.world.centerX;
        this.player.y = this.world.height;
        this.add.existing(this.player);

        this.projGroup = this.add.group();
        this.projGroup.enableBody = true;
        this.physics.arcade.enable(this.projGroup,Phaser.Physics.ARCADE);

        this.controls = this.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    },
    update: function ()
    {
        if(this.controls.left.isDown)
            this.player.x -= 5;
        else if(this.controls.right.isDown)
            this.player.x += 5;
        
        if(!this.spacebarWasDown && this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.projectile = new Projectile(this.game);
            this.projectile.x = this.player.x;
            this.projectile.y = this.player.y - this.player.height;
            this.projGroup.add(this.projectile);
            this.projectile = null;
        }

        if(this.projGroup.countLiving() > 0)
            this.physics.arcade.overlap(this.projGroup, Alien.instances, this.collisionHandler, null, this);

        this.spacebarWasDown = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
    render: function ()
    {
        for(var a in Alien.instances)
            this.game.debug.body(Alien.instances[a]);
    },
    collisionHandler: function (proj, alien)
    {
        proj.kill();
        alien.kill();
        //console.log(alien);
    }
};