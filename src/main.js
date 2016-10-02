wizard({
    width: 160,
    height: 144,
    scale: 3,
    pixelArt: true,
    create: function(){
        this.loadImages("player.png", "cars.png", "font.png");
        this.loadSounds("sound01.wav");
        WIZARD.spritesheet.create("player", 16, 32);
        WIZARD.spritesheet.create("cars", 96, 32);
        WIZARD.spritesheet.create("font", 8, 8);
        WIZARD.animation.createFrameAnimation("random", [[0,0]], 500);

        MAFIA.state.load();
        MAFIA.scenes.setCurrent(MAFIA.scenes.splash);
    },

    update: function(){
        MAFIA.scenes.current.update(this);
    },

    render: function(){
        this.clear("#686868");
        MAFIA.scenes.current.render(this);
    }
}).play();
