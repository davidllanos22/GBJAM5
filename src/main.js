var body = WIZARD.physics.createAABB(32, 55, 16, 16);
var body2 = WIZARD.physics.createAABB(100, 48, 32, 32);

var speed = 0.2;

wizard({
    width: 160,
    height: 144,
    scale: 3,
    pixelArt: true,
    create: function(){
        this.loadImages("spritesheet.png");
        this.loadSounds("sound01.wav");
        WIZARD.spritesheet.create("spritesheet", "spritesheet", 16, 32);
        WIZARD.animation.createFrameAnimation("random", [[0,0]], 500);
    },

    update: function(){
        if(body.x > this.width) body.x = - 16;
        else if(body.x < - 16) body.x = this.width;
        if(body.y > this.height) body.y = - 16;
        else if(body.y < - 16) body.y = this.height;

        if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
            body.x -= speed;
        }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
            body.x += speed;
        }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
            body.y -= speed;
        }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
            body.y += speed;
        }
    },
    render: function(){
        this.clear("#686868");
        //this.drawSprite("spritesheet", 16, 16, 1, 1);
        this.drawAnimation("spritesheet", "random", body.x, body.y);
        if(WIZARD.physics.intersects(body, body2)){
            this.drawAABB(body, "#ff0000");
            this.drawAABB(body2, "#ff0000");
        }else{
            this.drawAABB(body, "#00ff00");
            this.drawAABB(body2, "#00ff00");
        }
    }
}).play();
