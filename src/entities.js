MAFIA.entities = {
    sortEntities: function(list){
        list.sort(function(a, b){
            var aa = Math.floor(a.body.y);
            var bb = Math.floor(b.body.y);
            if(aa == bb){
                aa = Math.floor(a.body.x);
                bb = Math.floor(b.body.x);
            }
            return aa - bb;
        });
    },
    _idCount: 0,
    addEntity: function(entity, list){
        list.push(entity);
        entity.id = this._idCount;
        this._idCount++;
        if(entity._onAdded){
            entity._onAdded();
        }
        MAFIA.entities.sortEntities(list);
    },

    removeEntity: function(entity, list){
        var index = -1;
        for(var i = 0; i < list.length; i++){
            if(list[i].id == entity){
                index = i;
                break;
            }
        }
        if(index != -1)list.splice(index, 1);
    },

    player: function(x, y){
        this.name = "Player";
        this.animation = "player_idle_";
        this.body = WIZARD.physics.createAABB(x, y, 16, 8);
        this.hitBody = WIZARD.physics.createAABB(x, y - 12, 16, 20);

        this.direction = "down";
        this.lastAnimationAndDirection = "";

        var body = this.body;
        function collides(){
            for(var i = 0; i < MAFIA.scenes.current.entities.length; i++){
                var e = MAFIA.scenes.current.entities[i];
                if(e.name != "Player" || (e.name == "Bullet" && e.shooter != "Player")){
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
    },
    playerCar: function(){
        this.name = "PlayerCar";
        this.body = WIZARD.physics.createAABB(16, 16, 85, 32);
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
    },
    propCar: function(x, y){
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
    },
    enemy: function(x, y){
        this.name = "Enemy";
        this.animation = "enemy_idle_";
        this.body = WIZARD.physics.createAABB(x, y, 16, 8);
        this.hitBody = WIZARD.physics.createAABB(x, y - 12, 16, 20);
        this.direction = "down";
        this.lastAnimationAndDirection = "";
        this.health = MAFIA.constants.enemyHealth;

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
    },
    bullet: function(x, y, shooter, direction){
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
    },
    muzzleFlash: function(x, y, direction){
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
    },
    tile: function(x, y, xx, yy, dontSort){
        this.name = "Tile";
        this.body = WIZARD.physics.createAABB(x, y, 0, 0);

        this.update = function(wiz){
        };

        this.render = function(wiz){
            wiz.drawSprite("tiles", x, y, xx, yy);
        };
    }
};