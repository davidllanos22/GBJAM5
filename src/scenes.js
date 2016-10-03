MAFIA.scenes = {
    setCurrent: function(scene, delay, wiz){
        if(this.current != null && this.current.onExit != null){
            this.current.onExit(wiz);
        }
        if(delay != null && delay != 0) {

            WIZARD.time.createTimer("sceneTransition", delay, function () {
                if (MAFIA.scenes.current != null && MAFIA.scenes.current.onEnter != null) {
                    MAFIA.scenes.current = scene;
                    MAFIA.scrollingText.reset();
                    MAFIA.scenes.current.onEnter(wiz);
                }
            }, 1, true);
        }else{
            MAFIA.scenes.current = scene;
            MAFIA.scrollingText.reset();
            MAFIA.scenes.current.onEnter(wiz);
        }
    },
    current: null,
    splash: {
        logoBody: WIZARD.physics.createAABB(24, -16, 85, 32),
        inPosition: false,

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
        },
        update: function(wiz){
            if(this.logoBody.y >= 68 && !this.inPosition){
                wiz.playSound("bootup");
                this.inPosition = true;
                WIZARD.time.createTimer("bootupWait",2000, function(){
                    MAFIA.scenes.setCurrent(MAFIA.scenes.walk, 0, wiz);
                }, 1);
            }

            if(!this.inPosition){
                this.logoBody.y += 0.1;
            }
        },
        render: function(wiz){
            wiz.drawText("davidllanos22*", this.logoBody.x, this.logoBody.y);
        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    },
    walk: {
        entities: [],

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
            MAFIA.entities.addEntity(new MAFIA.entities.player(), this.entities);
            for(var i = 0; i <10; i++){
                MAFIA.entities.addEntity(new MAFIA.entities.enemy(Math.random() * 160, Math.random() * 144), this.entities);
            }
            for(var i = 0; i <3; i++){
                MAFIA.entities.addEntity(new MAFIA.entities.propCar(Math.random() * 160, Math.random() * 144), this.entities);
            }
        },
        update: function(wiz){
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].update(wiz);
            }

            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.car, 500);
            }
        },
        render: function(wiz){
            for(var x = 0; x < 10; x++){
                for(var y = 0; y < 10; y++) {
                    wiz.drawSprite("tiles", x * 16, y * 16, 0, 1);
                }
            }

            MAFIA.entities.sortEntities(this.entities);
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].render(wiz);
            }


            // if(WIZARD.physics.intersects(this.playerBody, this.carBody)){
            //     wiz.drawAABB(this.playerBody, "#ff0000");
            //     wiz.drawAABB(this.carBody, "#ff0000");
            // }else{
            //     wiz.drawAABB(this.playerBody, "#00ff00");
            //     wiz.drawAABB(this.carBody, "#00ff00");
            // }
            MAFIA.scrollingText.show("Hello world!", 0, 136, wiz);

        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    },
    car: {
        entities: [],

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
            MAFIA.entities.addEntity(new MAFIA.entities.playerCar(), this.entities);
        },
        update: function(wiz){
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].update(wiz);
            }
            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.walk, 500);
            }
        },
        render: function(wiz){
            MAFIA.entities.sortEntities(this.entities);
            for(var i = 0; i < this.entities.length; i++){
                this.entities[i].render(wiz);
            }
            // if(WIZARD.physics.intersects(this.playerBody, this.carBody)){
            //     wiz.drawAABB(this.playerBody, "#ff0000");
            //     wiz.drawAABB(this.carBody, "#ff0000");
            // }else{
            //     wiz.drawAABB(this.playerBody, "#00ff00");
            //     wiz.drawAABB(this.carBody, "#00ff00");
            // }

            MAFIA.scrollingText.show("GOTTA GO FAST!!1!", 0 , 0, wiz);
        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    }
};