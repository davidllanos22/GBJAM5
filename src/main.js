wizard({
    width: 160,
    height: 144,
    scale: 3,
    pixelArt: true,
    create: function(){
        this.loadImages("player.png", "cars.png", "font.png", "effects.png", "tiles.png", "title_bg.png", "menu.png");
        this.loadSounds("talk.wav", "bootup.mp3", "shot.wav", "hit.wav");
        WIZARD.spritesheet.create("player", 16, 32);
        WIZARD.spritesheet.create("cars", 96, 32);
        WIZARD.spritesheet.create("font", 8, 8);
        WIZARD.spritesheet.create("effects", 16, 16);
        WIZARD.spritesheet.create("tiles", 16, 16);
        WIZARD.spritesheet.create("menu", 16, 16);

        WIZARD.animation.createFrameAnimation("player_idle_down", [[0,0]], 100);
        WIZARD.animation.createFrameAnimation("player_walk_down", [[1,0],[0,0],[2,0],[0,0]], 300);
        WIZARD.animation.createFrameAnimation("player_idle_up", [[0,1]], 100);
        WIZARD.animation.createFrameAnimation("player_walk_up", [[1,1],[0,1],[2,1],[0,1]], 300);
        WIZARD.animation.createFrameAnimation("player_idle_left", [[0,2]], 100);
        WIZARD.animation.createFrameAnimation("player_walk_left", [[0,2]], 100);
        WIZARD.animation.createFrameAnimation("player_idle_right", [[0,3]], 100);
        WIZARD.animation.createFrameAnimation("player_walk_right", [[0,3]], 100);

        WIZARD.animation.createFrameAnimation("enemy_idle_down", [[7,0]], 100);

        WIZARD.animation.createFrameAnimation("menu_mission_cursor", [[0,0], [1,0]], 200);

        MAFIA.scenes.setCurrent(MAFIA.scenes.car, 0, this);
    },

    update: function(){
        if(WIZARD.input.keyJustPressed(WIZARD.keys.ONE)){
            MAFIA.globals.setCurrentColorIndex(0);
            MAFIA.globals.setCurrentColorArray(MAFIA.constants.colors[0]);
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.TWO)){
            MAFIA.globals.setCurrentColorIndex(1);
            MAFIA.globals.setCurrentColorArray(MAFIA.constants.colors[1]);
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.THREE)){
            MAFIA.globals.setCurrentColorIndex(2);
            MAFIA.globals.setCurrentColorArray(MAFIA.constants.colors[2]);
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.FOUR)){
            MAFIA.globals.setCurrentColorIndex(3);
            MAFIA.globals.setCurrentColorArray(MAFIA.constants.colors[3]);
        }else if(WIZARD.input.keyJustPressed(WIZARD.keys.FIVE)){
            MAFIA.globals.setCurrentColorIndex(4);
            MAFIA.globals.setCurrentColorArray(MAFIA.constants.colors[4]);
        }
        MAFIA.scenes.current.update(this);
    },

    render: function(){
        this.clear(MAFIA.constants.originalColors[3]);
        MAFIA.scenes.current.render(this);
    }
}).play();
