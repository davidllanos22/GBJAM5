var MAFIA = MAFIA || {};

MAFIA.constants = {
    originalColors:[
        "#000000",
        "#686868",
        "#b7b7b7",
        "#FFFFFF"
    ],
    colors: [
        WIZARD.utils.hexToRgb(0x101f27),
        WIZARD.utils.hexToRgb(0x356953),
        WIZARD.utils.hexToRgb(0x85c070),
        WIZARD.utils.hexToRgb(0xdefacf)
    ],
    playerSpeed: 0.06,
    playerCarSpeed: 0.5
};

MAFIA.globals = {
    currentColors: MAFIA.constants.colors,
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

MAFIA.scrollingText = {
    textToShow: "",
    count: 0,
    show: function(text, x, y, wiz){
        var speed = 100;
        var thiz = this;
        WIZARD.time.createTimer("scrollingText", speed, function(){
            wiz.playSound("talk");
            thiz.textToShow = text.substr(0, thiz.count );
            thiz.count++;
        }, text.length + 1, false);
        wiz.drawText(this.textToShow, x, y);
    },
    reset: function(){
        this.textToShow = "";
        this.count = 0;
        if(WIZARD.timers["scrollingText"] != null) delete WIZARD.timers["scrollingText"];
    }
};

MAFIA.utils = {


};