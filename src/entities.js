MAFIA.entities = {
    player:{
        animation: "player_idle_",
        body: WIZARD.physics.createAABB(32, 55, 16, 8),
        direction: "down",
        lastAnimationAndDirection: "",

        update: function(wiz){
            this.animation = "player_idle_";
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.animation = "player_walk_";
                this.direction = "left";
                this.body.x -= MAFIA.constants.playerSpeed;
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.animation = "player_walk_";
                this.direction = "right";
                this.body.x += MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.animation = "player_walk_";
                this.direction = "up";
                this.body.y -= MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.animation = "player_walk_";
                this.direction = "down";
                this.body.y += MAFIA.constants.playerSpeed;
            }

            if(this.lastAnimationAndDirection != this.animation + this.direction){
                console.log("diff");
                WIZARD.animation.reset(this.lastAnimationAndDirection);
            }
            this.lastAnimationAndDirection = this.animation + this.direction;
        },
        render: function(wiz){
            wiz.drawSprite("effects", this.body.x, this.body.y - 1, 0, 0);
            wiz.drawAnimation("player", this.animation + this.direction, this.body.x, this.body.y - 24);
        }
    },
    playerCar:{
        body: WIZARD.physics.createAABB(16, 16, 85, 32),

        update: function(wiz){
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.body.x -= MAFIA.constants.playerCarSpeed;
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.body.x += MAFIA.constants.playerCarSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.body.y -= MAFIA.constants.playerCarSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.body.y += MAFIA.constants.playerCarSpeed;
            }
        },
        render: function(wiz){
            wiz.drawSprite("cars", this.body.x, this.body.y, 0, 0);
        }
    }
};