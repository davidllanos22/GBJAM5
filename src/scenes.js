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
        carBody: WIZARD.physics.createAABB(16, 16, 85, 32),

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
        },
        update: function(wiz){
            MAFIA.entities.player.update(wiz);

            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.other, 500);
            }
        },
        render: function(wiz){
            wiz.drawSprite("cars", this.carBody.x, this.carBody.y, 0, 0);
            wiz.drawSprite("cars", 32, 64, 0, 1);
            wiz.drawSprite("cars", 48, 96, 0, 2);
            MAFIA.entities.player.render(wiz);
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
    other: {

        onEnter: function(wiz){
            MAFIA.transitionEffects.fadeBrightToNormal();
        },
        update: function(wiz){
            MAFIA.entities.playerCar.update(wiz);
            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.splash, 500);
            }
        },
        render: function(wiz){
            MAFIA.entities.playerCar.render(wiz);
            // if(WIZARD.physics.intersects(this.playerBody, this.carBody)){
            //     wiz.drawAABB(this.playerBody, "#ff0000");
            //     wiz.drawAABB(this.carBody, "#ff0000");
            // }else{
            //     wiz.drawAABB(this.playerBody, "#00ff00");
            //     wiz.drawAABB(this.carBody, "#00ff00");
            // }

            MAFIA.scrollingText.show("WILL THIS WORK?", 0 , 0, wiz);
        },
        onExit: function(wiz){
            MAFIA.transitionEffects.fadeNormalToBright();
        }
    }
};