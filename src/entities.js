var entity_player = function(params){
    this.animation = "player_idle_";
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 8);
    this.hitBody = WIZARD.physics.createAABB(params.x, params.y - 12, 16, 20);

    this.direction = "down";
    this.lastAnimationAndDirection = "";

    var body = this.body;
    function collides(){
        for(var i = 0; i < WIZARD.scene.current.entities.length; i++){
            var e = WIZARD.scene.current.entities[i];
            if(e.name != "player" || (e.name == "Bullet" && e.shooter != "player")){
                if(WIZARD.physics.intersects(body, e.body)){
                    return true;
                }
            }
        }
        return false;
    }

    this.update = function(wiz){
        this.animation = "player_idle_";
        if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
            this.animation = "player_walk_";
            this.direction = "left";
            this.body.x -= MAFIA.constants.playerSpeed;
            if(collides()){
                this.body.x += MAFIA.constants.playerSpeed;
            }
        }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
            this.animation = "player_walk_";
            this.direction = "right";
            this.body.x += MAFIA.constants.playerSpeed;
            if(collides()){
                this.body.x -= MAFIA.constants.playerSpeed;
            }
        }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
            this.animation = "player_walk_";
            this.direction = "up";
            this.body.y -= MAFIA.constants.playerSpeed;
            if(collides()){
                this.body.y += MAFIA.constants.playerSpeed;
            }
        }else if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
            this.animation = "player_walk_";
            this.direction = "down";
            this.body.y += MAFIA.constants.playerSpeed;
            if(collides()){
                this.body.y -= MAFIA.constants.playerSpeed;
            }
        }

        if(WIZARD.input.keyJustPressed(WIZARD.keys.X)) {
            var offX = 0, offY = 0;
            if(this.direction == "up"){
                offX = 4;
                offY = -4;
            }else if (this.direction == "down"){
                offX = 4;
                offY = -4;
            }else if (this.direction == "left"){
                offY = -6;
                offX = -4;
            }else if (this.direction == "right"){
                offY = -6;
                offX = 4;
            }
            MAFIA.entities.addEntity(new MAFIA.entities.bullet(this.body.x + offX, this.body.y + offY, "Player", this.direction), MAFIA.scenes.current.entities);
            wiz.playSound("shot");
        }

        if(this.lastAnimationAndDirection != this.animation + this.direction){
            WIZARD.animation.reset(this.lastAnimationAndDirection);
        }
        this.lastAnimationAndDirection = this.animation + this.direction;

        this.hitBody.x = this.body.x;
        this.hitBody.y = this.body.y - 12;

        WIZARD.camera.setPosition(this.body.x - 80 + 8, this.body.y - 72);
    };

    this.render = function(wiz){
        wiz.drawSprite("effects", this.body.x, this.body.y - 1, 0, 0);
        wiz.drawAnimation("player", this.animation + this.direction, this.body.x, this.body.y - 24);
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "blue");
            wiz.drawAABB(this.hitBody, "red");
        }
    };
};



var entity_playerCar = function(x, y){
    this.name = "PlayerCar";
    this.body = WIZARD.physics.createAABB(x, y, 85, 32);
    this.hitBody = this.body;

    this.update = function(wiz){
        if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
            this.body.x -= MAFIA.constants.playerCarSpeed;
        }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
            this.body.x += MAFIA.constants.playerCarSpeed;
        }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
            this.body.y -= MAFIA.constants.playerCarSpeed;
        }else if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
            this.body.y += MAFIA.constants.playerCarSpeed;
        }

        if(this.body.x < 0) this.body.x = 0;
        else if(this.body.x > 160 - 85) this.body.x = 160 - 85;
        if(this.body.y < 0) this.body.y = 0;
        else if(this.body.y > 144 - 32) this.body.y = 144 - 32;
    };
    this.render = function(wiz){
        wiz.drawSprite("cars", this.body.x, this.body.y, 0, 0);
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "blue");
        }
    };
};

var entity_propCar = function(x, y){
    this.name = "PropCar";
    this.body = WIZARD.physics.createAABB(x, y, 85, 24);
    this.hitBody = this.body;

    this.update = function(wiz){

    };
    this.render = function(wiz){
        wiz.drawSprite("cars", this.body.x, this.body.y - 8, 0, 0);
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "yellow");
        }
    };
};

var entity_enemy = function(x, y){
    this.name = "Enemy";
    this.animation = "enemy_idle_";
    this.body = WIZARD.physics.createAABB(x, y, 16, 8);
    this.hitBody = WIZARD.physics.createAABB(x, y - 12, 16, 20);
    this.direction = "down";
    this.lastAnimationAndDirection = "";
    this.health = MAFIA.constants.enemyHealth;
    this.targetX = x;
    this.targetY = y;

    this._onAdded = function(){
        var easystar = new EasyStar.js();
        var array = [];
        var map = MAFIA.maps.current.layers[1];
        var width =  map.width;
        for(var i = 0; i < map.data.length; i++){
            var x = Math.floor(i % width);
            var y = Math.floor(i / width);
            var a = [];
            if(x == 0){
                array.push(a);
            }
            array[y].push(map.data[i]);
        }
        easystar.setGrid(array);
        easystar.setAcceptableTiles([0]);

        var id = this.id;

        var thiz = this;

        var xx = Math.floor(this.body.x / 16);
        var yy = Math.floor(this.body.y / 16);

        var px = 0;//Math.floor(MAFIA.scenes.current.player.body.x / 16);
        var py = 0;//Math.floor(MAFIA.scenes.current.player.body.y / 16);

        easystar.findPath(xx, yy, px, py, function(path) {
            if (path === null) {
                console.log("Path was not found.");
            } else {
                var count = 0;
                WIZARD.time.createTimer("a*_" + id, 800, function(){
                    thiz.targetX = path[count].x * 16;
                    thiz.targetY = path[count].y * 16;
                    count++;
                }, path.length, false);
            }
        });
        easystar.enableDiagonals();
        easystar.setIterationsPerCalculation(1000);
        easystar.calculate();
    };


    this.hurt = function(damage){
        this.health -= damage;
        if(this.health <= 0){
            this.die();
        }
    };

    this.die = function(){
        MAFIA.entities.removeEntity(this.id, MAFIA.scenes.current.entities);
    };

    this.update = function(wiz){
        this.animation = "enemy_idle_";
        this.lastAnimationAndDirection = this.animation + this.direction;

        var x = WIZARD.math.lerp(this.body.x, this.targetX, 0.02);
        var y = WIZARD.math.lerp(this.body.y, this.targetY, 0.02);

        this.body.x = x;
        this.body.y = y;
        this.hitBody.x = this.body.x;
        this.hitBody.y = this.body.y - 12;

    };

    this.render = function(wiz){
        wiz.drawSprite("effects", this.body.x, this.body.y - 1, 0, 0);
        wiz.drawAnimation("player", this.animation + this.direction, this.body.x, this.body.y - 24);
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "yellow");
            wiz.drawAABB(this.hitBody, "red");
        }
    };
};

var entity_bullet = function(x, y, shooter, direction){
    this.name = "Bullet";
    this.shooter = shooter;
    this.body = WIZARD.physics.createAABB(x, y - 2, 8, 6);
    this.hitBody = this.body;

    var spriteX = direction == "down" || direction == "up" ? 6 : 5;

    this._onAdded = function(){
        var id = this.id;

        WIZARD.time.createTimer("bullet", MAFIA.constants.bulletTime, function(){
            MAFIA.entities.removeEntity(id, MAFIA.scenes.current.entities);
        }, 1, true);

        MAFIA.entities.addEntity(new MAFIA.entities.muzzleFlash(x, y, direction), MAFIA.scenes.current.entities);
    };

    this._collides = function(){
        for(var i = 0; i < MAFIA.scenes.current.entities.length; i++){
            var e = MAFIA.scenes.current.entities[i];
            if(e.id != this.id && e.name != shooter){
                if(WIZARD.physics.intersects(this.body, e.hitBody)){
                    return e;
                }
            }
        }
        return null;
    };

    this.update = function(wiz){
        if(direction == "up"){
            this.body.y -= MAFIA.constants.bulletSpeed;
        }else if (direction == "down"){
            this.body.y += MAFIA.constants.bulletSpeed;
        }else if (direction == "left"){
            this.body.x -= MAFIA.constants.bulletSpeed;
        }else if (direction == "right"){
            this.body.x += MAFIA.constants.bulletSpeed;
        }

        var e = this._collides();
        if(e != null){
            wiz.playSound("hit");
            MAFIA.entities.removeEntity(this.id, MAFIA.scenes.current.entities);
            WIZARD.time.removeTimer("bullet");
            if(e.hurt){
                e.hurt(MAFIA.constants.bulletDamage);
            }
        }
    };

    this.render = function(wiz){
        wiz.drawSprite("effects", this.body.x - 4, this.body.y - 5, spriteX, 0);
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "red");
        }
    };
};

var entity_muzzleFlash = function(x, y, direction){
    this.name = "MuzzleFlash";
    this.body = WIZARD.physics.createAABB(x, y + (direction != "up" ? 7 : 0), 0, 0);

    this._onAdded = function(){
        var id = this.id;

        WIZARD.time.createTimer("muzzleFlash", MAFIA.constants.bulletMuzzleFlashTime, function(){
            MAFIA.entities.removeEntity(id, MAFIA.scenes.current.entities);
        }, 1, true);
    };

    this.update = function(wiz){


    };

    this.render = function(wiz){
        if(direction == "up"){
            wiz.drawSprite("effects", this.body.x - 4, this.body.y - 28, 3, 0);
        }else if (direction == "down"){
            wiz.drawSprite("effects", this.body.x - 4, this.body.y - 5, 4, 0);
        }else if (direction == "left"){
            wiz.drawSprite("effects", this.body.x - 10, this.body.y - 14, 2, 0);
        }else if (direction == "right"){
            wiz.drawSprite("effects", this.body.x + 10, this.body.y - 14, 1, 0);
        }
    };
};

var entity_tile = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 0, 0);

    this.update = function(wiz){
    };

    this.render = function(wiz){
        wiz.drawSprite("tiles", params.x, params.y, params.xx, params.yy);
    };
};

var entity_solid = function(params){
    this.body = WIZARD.physics.createAABB(params.x, params.y, 16, 16);

    this.update = function(wiz){
    };

    this.render = function(wiz){
        if(MAFIA.constants.debug){
            wiz.drawAABB(this.body, "blue");
        }
        //wiz.drawSprite("tiles", params.x, params.y, params.xx, params.yy);
    };
};