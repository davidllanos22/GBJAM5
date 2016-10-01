var playerBody = WIZARD.physics.createAABB(32, 55, 16, 8);
var carBody = WIZARD.physics.createAABB(16, 16, 85, 32);

var speed = 0.1;

wizard({
    width: 160,
    height: 144,
    scale: 3,
    pixelArt: true,
    create: function(){
        this.loadImages("player.png", "cars.png");
        this.loadSounds("sound01.wav");
        WIZARD.spritesheet.create("player", 16, 32);
        WIZARD.spritesheet.create("cars", 96, 32);
        WIZARD.animation.createFrameAnimation("random", [[0,0]], 500);

        MAFIA.state.load();
    },

    update: function(){
        if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
            playerBody.x -= speed;
        }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
            playerBody.x += speed;
        }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
            playerBody.y -= speed;
        }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
            playerBody.y += speed;
        }

        if(WIZARD.input.keyPressed(WIZARD.keys.SPACEBAR)){
            MAFIA.progress.score = Math.random() * 200;
            MAFIA.state.save();
        }
    },

    render: function(){
        this.clear("#686868");
        this.drawSprite("cars", carBody.x, carBody.y, 0, 0);
        this.drawAnimation("player", "random", playerBody.x, playerBody.y - 24);
        if(WIZARD.physics.intersects(playerBody, carBody)){
            this.drawAABB(playerBody, "#ff0000");
            this.drawAABB(carBody, "#ff0000");
        }else{
            this.drawAABB(playerBody, "#00ff00");
            this.drawAABB(carBody, "#00ff00");
        }
    }
}).play();
