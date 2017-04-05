var scene_splash = {
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
                WIZARD.scene.setCurrent("menu", 0, wiz);
            }, 1);
        }

        if(!this.inPosition){
            this.logoBody.y += 0.1;
        }
    },
    render: function(wiz){
        wiz.drawText("davidllanos22*", this.logoBody.x, this.logoBody.y, "font");
    },
    onExit: function(wiz){
        MAFIA.transitionEffects.fadeNormalToBright();
    }
};

var scene_menu = {
    logoBody: WIZARD.physics.createAABB(4, 112, 85, 32),
        selected: 0,
        strings: [MAFIA.strings.getString("start"), MAFIA.strings.getString("load")],

        onEnter: function(wiz){
        MAFIA.transitionEffects.fadeBrightToNormal();
    },
    update: function(wiz){
        if(WIZARD.input.keyJustPressed(WIZARD.keys.UP)){
            this.selected --;
            if(this.selected == -1) this.selected = this.strings.length - 1;
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.DOWN)){
            this.selected ++;
            this.selected %= this.strings.length;
        }

        if(WIZARD.input.keyJustPressed(WIZARD.keys.X)){
            if(this.selected == 0){
                WIZARD.scene.setCurrent("mission_select", 500, wiz);
            }else if(this.selected == 1){
                MAFIA.state.load();
                WIZARD.scene.setCurrent("mission_select", 500, wiz);
            }else if(this.selected == 2){
                console.log("Changing palette");
            }
        }
    },
    render: function(wiz){
        wiz.clear(MAFIA.constants.originalColors[2]);
        wiz.drawImage("title_bg", 0, 0);

        for(var i = 0; i < this.strings.length; i++){
            if(this.selected == i){
                wiz.drawText(">" + this.strings[i], this.logoBody.x, this.logoBody.y + (i * 8), "font");
            }else{
                wiz.drawText(" " + this.strings[i], this.logoBody.x, this.logoBody.y + (i * 8), "font");
            }
        }
    },
    onExit: function(wiz){
        MAFIA.transitionEffects.fadeNormalToBright();
    }
};

var scene_mission_select = {
    logoBody: WIZARD.physics.createAABB(4, 112, 85, 32),
        selected: 0,
        strings: [MAFIA.strings.getString("start_mission"), MAFIA.strings.getString("shop")],

        onEnter: function(wiz){
        MAFIA.transitionEffects.fadeBrightToNormal();
    },
    update: function(wiz){
        if(WIZARD.input.keyJustPressed(WIZARD.keys.UP)){
            this.selected --;
            if(this.selected == -1) this.selected = this.strings.length - 1;
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.DOWN)){
            this.selected ++;
            this.selected %= this.strings.length;
        }

        if(WIZARD.input.keyJustPressed(WIZARD.keys.X)){
            if(this.selected == 0){
                if(MAFIA.progress.level == 0){
                    WIZARD.scene.setCurrent("walk", 500, wiz);
                }else if(MAFIA.progress.level == 1){
                    WIZARD.scene.setCurrent("walk", 500, wiz);
                }else if(MAFIA.progress.level == 2){
                    WIZARD.scene.setCurrent("walk", 500, wiz);
                }

                console.log("Mission " + MAFIA.progress.level + " selected.");
                //MAFIA.scenes.setCurrent(MAFIA.scenes.walk, 500, wiz);
            }else if(this.selected == 1){

            }else if(this.selected == 2){
                //TODO: sonido éxito(ta-chán)
                MAFIA.state.save();
            }
        }else  if(WIZARD.input.keyJustPressed(WIZARD.keys.C)){
            WIZARD.scene.setCurrent("menu", 500, wiz);
        }
        if(WIZARD.input.keyJustPressed(WIZARD.keys.X)){

        }
    },
    render: function(wiz){
        wiz.clear(MAFIA.constants.originalColors[1]);

        for(var i = 0; i < this.strings.length; i++){
            if(this.selected == i){
                wiz.drawText(">" + this.strings[i], this.logoBody.x, this.logoBody.y + (i * 8), "font");
            }else{
                wiz.drawText(" " + this.strings[i], this.logoBody.x, this.logoBody.y + (i * 8), "font");
            }
        }

        for(var i = 0; i < 10; i++) {
            wiz.drawSprite("menu", i * 16, 0, 4, 0);
            if (i == 4 || i == 9) {
                if(i > MAFIA.progress.level){
                    wiz.drawSprite("menu", i * 16, 0, 3, 1);
                }else{
                    wiz.drawSprite("menu", i * 16, 0, 3, 0);
                }
            }else {
                if(i > MAFIA.progress.level){
                    wiz.drawSprite("menu", i * 16, 0, 2, 1);
                }else{
                    wiz.drawSprite("menu", i * 16, 0, 2, 0);
                }
            }
        }
        wiz.drawAnimation("menu", "menu_mission_cursor", MAFIA.progress.level * 16, 0);

        wiz.drawText(MAFIA.strings.getString("mission_" + MAFIA.progress.level+"_1"), 0, 48, "font");
        wiz.drawText(MAFIA.strings.getString("mission_" + MAFIA.progress.level+"_2"), 0, 56, "font");
    },

    onExit: function(wiz){
        MAFIA.transitionEffects.fadeNormalToBright();
    }
};

var scene_walk = {
    entities: [],
    tiles: [],

    onEnter: function(wiz){
        MAFIA.transitionEffects.fadeBrightToNormal();
    },
    update: function(wiz){
        WIZARD.scene.updateEntities(this, wiz);

        if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
            WIZARD.scene.setCurrent("car", 500, wiz);
        }
    },
    render: function(wiz){
        WIZARD.scene.renderEntitiesAndLayers(this, wiz);
        MAFIA.scrollingText.show("Glitch city", WIZARD.camera.x, WIZARD.camera.y + 136, wiz);
    },
    onExit: function(wiz){
        MAFIA.transitionEffects.fadeNormalToBright();
    }
};

var scene_car = {
    entities: [],
    tiles: [],

    onEnter: function(wiz){
        MAFIA.transitionEffects.fadeBrightToNormal();
        //MAFIA.maps.loadMapToCurrentScene(MAFIA.maps.test);
    },
    update: function(wiz){
        for(var i = 0; i < this.entities.length; i++){
            this.entities[i].update(wiz);
        }
        if(WIZARD.input.keyJustPressed(WIZARD.keys.SPACEBAR)){
            WIZARD.scene.setCurrent("walk", 500, wiz);
        }
    },
    render: function(wiz){
        // for(var i = 0; i < this.tiles0.length; i++){
        //     this.tiles0[i].render(wiz);
        // }
        // MAFIA.entities.sortEntities(this.entities);
        for(var i = 0; i < this.entities.length; i++){
            this.entities[i].render(wiz);
        }
        // for(var i = 0; i < this.tiles1.length; i++){
        //     this.tiles1[i].render(wiz);
        // }
    },
    onExit: function(wiz){
        MAFIA.transitionEffects.fadeNormalToBright();
    }
};