var MAFIA = MAFIA || {};

MAFIA.constants = {
    colors: [
        WIZARD.utils.hexToRgb(0x101f27),
        WIZARD.utils.hexToRgb(0x356953),
        WIZARD.utils.hexToRgb(0x85c070),
        WIZARD.utils.hexToRgb(0xdefacf)
    ],
    playerSpeed: 0.1,
    playerCarSpeed: 0.5
};

MAFIA.globals = {
    currentColors: MAFIA.constants.colors,
    playerCarSpeed: 0.5
};

MAFIA.progress = {
    score: 0,
    cash: 0
};

MAFIA.state = {
    load: function(){
        var progress = JSON.parse(WIZARD.state.load("mafia"));
        if(progress != null) MAFIA.progress = progress;
    },

    save: function(){
        WIZARD.state.save("mafia", JSON.stringify(MAFIA.progress));
    }
};

MAFIA.strings = {
    getString: function(name){
        var l = WIZARD.utils.getLanguage();
        if(l == "ca") l = "es";
        else if(l != "es") l = "en";
        return this[l][name];
    },
    "es":{
        "emboscada": "¡Emboscada!"
    },
    "en":{
        "emboscada": "Ambush!"
    }
};

MAFIA.scenes = {
    setCurrent: function(scene, delay){
        if(this.current != null && this.current.onExit != null){
            this.current.onExit();
        }
        if(delay != null && delay != 0) {

            WIZARD.time.createTimer("sceneTransition", delay, function () {
                if (MAFIA.scenes.current != null && MAFIA.scenes.current.onEnter != null) {
                    MAFIA.scenes.current = scene;
                    MAFIA.scenes.current.onEnter();
                }
            }, 1, true);
        }else{
            MAFIA.scenes.current = scene;
            MAFIA.scenes.current.onEnter();
        }
    },
    current: null,
    splash: {
        playerBody: WIZARD.physics.createAABB(32, 55, 16, 8),
        carBody: WIZARD.physics.createAABB(16, 16, 85, 32),

        onEnter: function(){
            MAFIA.transitionEffects.fadeDarkToNormal();
        },
        update: function(wiz){
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.playerBody.x -= MAFIA.constants.playerSpeed;
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.playerBody.x += MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.playerBody.y -= MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.playerBody.y += MAFIA.constants.playerSpeed;
            }

            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.other, 500);
            }
        },
        render: function(wiz){
            wiz.drawSprite("cars", this.carBody.x, this.carBody.y, 0, 0);
            wiz.drawAnimation("player", "random", this.playerBody.x, this.playerBody.y - 24);
            if(WIZARD.physics.intersects(this.playerBody, this.carBody)){
                wiz.drawAABB(this.playerBody, "#ff0000");
                wiz.drawAABB(this.carBody, "#ff0000");
            }else{
                wiz.drawAABB(this.playerBody, "#00ff00");
                wiz.drawAABB(this.carBody, "#00ff00");
            }
        },
        onExit: function(){
            MAFIA.transitionEffects.fadeNormalToDark();
        }
    },
    other: {
        playerBody: WIZARD.physics.createAABB(32, 100, 16, 8),
        carBody: WIZARD.physics.createAABB(16, 16, 85, 32),

        onEnter: function(){
            MAFIA.transitionEffects.fadeDarkToNormal();
        },
        update: function(wiz){
            if(WIZARD.input.keyPressed(WIZARD.keys.A) || WIZARD.input.keyPressed(WIZARD.keys.LEFT)){
                this.playerBody.x -= MAFIA.constants.playerSpeed;
            }else if(WIZARD.input.keyPressed(WIZARD.keys.D) || WIZARD.input.keyPressed(WIZARD.keys.RIGHT)){
                this.playerBody.x += MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.W) || WIZARD.input.keyPressed(WIZARD.keys.UP)){
                this.playerBody.y -= MAFIA.constants.playerSpeed;
            }if(WIZARD.input.keyPressed(WIZARD.keys.S) || WIZARD.input.keyPressed(WIZARD.keys.DOWN)){
                this.playerBody.y += MAFIA.constants.playerSpeed;
            }

            if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
                MAFIA.scenes.setCurrent(MAFIA.scenes.splash, 500);
            }
        },
        render: function(wiz){
            wiz.drawSprite("cars", this.carBody.x, this.carBody.y, 0, 0);
            wiz.drawAnimation("player", "random", this.playerBody.x, this.playerBody.y - 24);
            if(WIZARD.physics.intersects(this.playerBody, this.carBody)){
                wiz.drawAABB(this.playerBody, "#ff0000");
                wiz.drawAABB(this.carBody, "#ff0000");
            }else{
                wiz.drawAABB(this.playerBody, "#00ff00");
                wiz.drawAABB(this.carBody, "#00ff00");
            }
        },
        onExit: function(){
            MAFIA.transitionEffects.fadeNormalToDark();
        }
    }
};

MAFIA.transitionEffects = {
    fadeNormalToBright: function(){
        var count = 0;
        WIZARD.time.createTimer("fadeNormalToBright", 100, function(){
            for(var i = 0; i <  MAFIA.constants.colors.length - 1 - count; i++){
                MAFIA.globals.currentColors[i] = MAFIA.globals.currentColors[i+1]
            }
            count++;
        }, 4, true);
    },

    fadeDarkToNormal: function(){
        var count = 0;
        MAFIA.globals.currentColors = [MAFIA.constants.colors[0], MAFIA.constants.colors[0], MAFIA.constants.colors[0], MAFIA.constants.colors[0]]
        WIZARD.time.createTimer("fadeDarkToNormal", 100, function(){
            for(var i = MAFIA.constants.colors.length - 1; i > MAFIA.constants.colors.length - 1 - count; i--){
                MAFIA.globals.currentColors[i] = MAFIA.constants.colors[i - (3 - count)];
            }
            count++;
        }, 4, true);
    },

    fadeBrightToNormal: function(){
        var count = 0;
        MAFIA.globals.currentColors = [MAFIA.constants.colors[3], MAFIA.constants.colors[3], MAFIA.constants.colors[3], MAFIA.constants.colors[3]]
        WIZARD.time.createTimer("fadeBrightToNormal", 100, function(){
            for(var i = 0; i < count; i++){
                MAFIA.globals.currentColors[i] = MAFIA.constants.colors[i + (3 - count)];
            }
            count++;
        }, 4, true);
    },

    fadeNormalToDark: function(){
        var count = 0;
        WIZARD.time.createTimer("fadeNormalToDark", 100, function(){
            for(var i = MAFIA.constants.colors.length; i > count; i--){
                MAFIA.globals.currentColors[i] = MAFIA.globals.currentColors[i-1]
            }
            count++;
        }, 4, true);
    }
};