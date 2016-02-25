window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 600, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image
        game.load.spritesheet('ice', 'assets/iced.png?v=1', 120, 120);
        game.load.spritesheet('player1', 'assets/light.png', 32, 32);
        game.load.spritesheet('player2', 'assets/dark.png', 32, 32);
        game.load.image('sea', 'assets/sea.png');
        game.load.spritesheet('hitbox', 'assets/hitbox.png',4,4);
        game.load.audio('yay', 'assets/yay.mp3');
        game.load.audio('crack', 'assets/crack.mp3');
        game.load.audio('music', 'assets/Music.mp3');
    }
    
    var ice;
    var sea;
    var timer;
    var timer2;
    var player1;
    var player2;
    var cursors;
    var cursors2;
    var gameStart = 0;
    var hitbox;
    var hitbox2;
    var gameText;
    var winText;
    var crack;
    var yay;
    var music;
    
    function create() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        crack = game.add.audio('crack');
        yay = game.add.audio('yay');
        music = game.add.audio('music');
        
        sea = game.add.sprite(0, 0, 'sea');
        //sea.enableBody = true;
        
        ice = game.add.group();
        ice.enableBody = true;
        
        timer2 = game.time.create(false);
        timer2.loop(1000, timerLoop, this);
        
        gameText = game.add.text(225, 275, 'Click to Start', { fontSize: '32px', fill: '#000' });
        winText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
 
        for(var i = 0; i <= 4; i++)
        {
            var platforms = game.add.sprite(i*120, 0, 'ice');
            platforms.inputEnabled = true;
           //platforms.input.enableDrag(false, true);
            platforms.events.onInputDown.add(listener, this);
            ice.add(platforms);
            for(var j = 1; j<=4; j++)
            {
                platforms = game.add.sprite(i*120,j*120,'ice');
                platforms.inputEnabled = true;
               // platforms.input.enableDrag(false, true);
                platforms.events.onInputDown.add(listener, this);
                ice.add(platforms);
            }
        }
        //ice.add(platforms);
        player1 = game.add.sprite(45, 285, 'player1');
        game.physics.arcade.enable(player1);
        player1.body.collideWorldBounds = true;
        player1.animations.add('walk', [0,1], 10, true);
        player1.animations.add('drown',[1,4,2,3,5,6,7,8],2,false);
        player1.animations.add('win',[1,4],2,true);
        player1.frame = 1;
        
        player2 = game.add.sprite(game.world.width-75, 285, 'player2');
        game.physics.arcade.enable(player2);
        player2.body.collideWorldBounds = true;
        player2.animations.add('walk', [0,1], 10, true);
        player2.animations.add('drown',[1,4,2,3,5,6,7,8],2,false);
        player2.animations.add('win',[1,4],2,true);
        player2.frame = 1;
        
        hitbox = game.add.sprite(player1.x + 15, player1.y+30, 'hitbox');
        game.physics.arcade.enable(hitbox);
        hitbox.body.collideWorldBounds = true;
        hitbox2 = game.add.sprite(player2.x+15, player2.y+30, 'hitbox');
        game.physics.arcade.enable(hitbox2);
        hitbox2.body.collideWorldBounds = true;
        hitbox.frame=1;
        hitbox2.frame=1;  
        
        cursors = game.input.keyboard.createCursorKeys();
        cursors2 = {up: game.input.keyboard.addKey(Phaser.Keyboard.W), down: game.input.keyboard.addKey(Phaser.Keyboard.S), left: game.input.keyboard.addKey(Phaser.Keyboard.A), right: game.input.keyboard.addKey(Phaser.Keyboard.D)}
        dash = {shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT), space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)}
    }
    
    
    
    function update() {
        //game.physics.arcade.collide(player1, ice);
        //game.physics.arcade.overlap(player1, ice, collectStar, null, this);
        if(gameStart == 1)
        {
        timer2.start();
        game.physics.arcade.collide(player1,player2);
        if(cursors.right.isDown)
        {
            player1.body.velocity.y = 0;
            player1.body.velocity.x = 120;
            player1.animations.play('walk');
        }
        else if(cursors.left.isDown)
        {
            player1.body.velocity.y = 0;
            player1.body.velocity.x = -120;
            player1.animations.play('walk');
        }
        else if(cursors.up.isDown)
        {
            player1.body.velocity.x = 0;
            player1.body.velocity.y = -120;
            player1.animations.play('walk');
        }
        else if(cursors.down.isDown)
        {
            player1.body.velocity.x = 0;
            player1.body.velocity.y = 120;
            player1.animations.play('walk');
        }
        if(cursors2.right.isDown)
        {
            player2.body.velocity.y = 0;
            player2.body.velocity.x = 120;
            player2.animations.play('walk');
        }
        if(cursors2.left.isDown)
        {
            player2.body.velocity.y = 0;
            player2.body.velocity.x = -120;
            player2.animations.play('walk');
        }
        else if(cursors2.up.isDown)
        {
            player2.body.velocity.x = 0;
            player2.body.velocity.y = -120;
            player2.animations.play('walk');
        }
        else if(cursors2.down.isDown)
        {
            player2.body.velocity.x = 0;
            player2.body.velocity.y = 120;
            player2.animations.play('walk');
        }
        hitbox.x = player1.x+15;
        hitbox.y = player1.y+30;
        hitbox2.x = player2.x+15;
        hitbox2.y = player2.y+30;
        game.physics.arcade.overlap(hitbox,ice,collectStar2,null,this);
        game.physics.arcade.overlap(hitbox2,ice,collectStar3,null,this);
        }
    }
    
    function listener(sprite, pointer)
    {
        gameStart = 1;
        gameText.text = '';
        music.play();
        music.loop = true;
        //if(sprite.frame == 1)
        //{
        //    sprite.frame = 2;
        //}
        //else if(sprite.frame == 2)
        //{
        //    sprite.frame = 3;
        //}
        //else if(sprite.frame ==3)
        //{
        //    sprite.kill();
        //}
        //else
        //{
        //    sprite.frame = 1;
        //}
    }
    
    function collectStar(player, platforms)
    {
        var keep = platforms;
        timer = game.time.create(false);
        timer.add(300,updateCounter,this,keep);
        timer.start();
        //if(platforms.frame == 1)
        //{
        //    platforms.frame = 2;
        //}
        //else if(platforms.frame == 2)
        //{
        //    platforms.frame = 3;
        //}
        //else if(platforms.frame ==3)
        //{
        //    platforms.kill();
        //}
        //else
        //{
        //    platforms.frame = 1;
        //}
    }
    
    function collectStar2(player,platforms)
    {
        if(platforms.frame==4)
        {
            gameStart = 0;
            timer2.stop();
            player1.body.velocity.x=0;
            player1.body.velocity.y=0;
            player2.body.velocity.x=0;
            player2.body.velocity.y=0;
            player1.animations.play('drown',2,false,true);
            player2.animations.play('win');
            hitbox.kill();
            hitbox2.kill();
            winText.text = 'The Light is sleeping with the fishes! \nPlayer 2 Wins!'
            yay.play();
        }
    }
    
    function collectStar3(player,platforms)
    {
        if(platforms.frame==4)
        {
            gameStart = 0;
            timer2.stop();
            player2.body.velocity.x=0;
            player2.body.velocity.y=0;
            player1.body.velocity.x=0;
            player1.body.velocity.y=0;
            player2.animations.play('drown',2,false,true);
            player1.animations.play('win');
            hitbox.kill();
            hitbox2.kill();
            winText.text = 'The Dark took a dive! \nPlayer 1 Wins!'
            yay.play();
        }
    }
    
    function updateCounter(platforms)
    {
        if(platforms.frame == 1)
        {
           platforms.frame = 2;
        }
        else if(platforms.frame == 2)
        {
            platforms.frame = 3;
        }
        else if(platforms.frame == 3)
        {
            platforms.frame = 4;
        }
        else if(platforms.frame == 0)
        {
            platforms.frame = 1;
        }
        //crack.play();
       //game.physics.arcade.collide(player1, ice);
       //game.physics.arcade.overlap(player1, ice, collectStar, null, this);
    }
    
    function timerLoop(){
        crack.play();
        game.physics.arcade.overlap(hitbox,ice,collectStar,null,this);
        game.physics.arcade.overlap(hitbox2,ice,collectStar,null,this);
    }
    
};
