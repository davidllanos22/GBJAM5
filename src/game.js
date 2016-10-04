var MAFIA = MAFIA || {};


var colors = [
    [
        WIZARD.utils.hexToRgb(0x101f27),
        WIZARD.utils.hexToRgb(0x356953),
        WIZARD.utils.hexToRgb(0x85c070),
        WIZARD.utils.hexToRgb(0xdefacf)
    ],
    [
        WIZARD.utils.hexToRgb(0x1d1d1d),
        WIZARD.utils.hexToRgb(0x444935),
        WIZARD.utils.hexToRgb(0x808a62),
        WIZARD.utils.hexToRgb(0xbcc897)
    ],
    [
        WIZARD.utils.hexToRgb(0x201203),
        WIZARD.utils.hexToRgb(0x205b57),
        WIZARD.utils.hexToRgb(0xac7074),
        WIZARD.utils.hexToRgb(0xd7eddf)
    ],
    [
        WIZARD.utils.hexToRgb(0x47496c),
        WIZARD.utils.hexToRgb(0x317474),
        WIZARD.utils.hexToRgb(0x68bb63),
        WIZARD.utils.hexToRgb(0x96e47c)
    ],
    [
        WIZARD.utils.hexToRgb(0x555b77),
        WIZARD.utils.hexToRgb(0x457874),
        WIZARD.utils.hexToRgb(0x46eb47f),
        WIZARD.utils.hexToRgb(0xe5f48b)
    ]

];

MAFIA.constants = {
    debug: false,
    originalColors:[
        "#000000",
        "#686868",
        "#b7b7b7",
        "#FFFFFF"
    ],
    colors: [
        [
            WIZARD.utils.hexToRgb(0x101f27),
            WIZARD.utils.hexToRgb(0x356953),
            WIZARD.utils.hexToRgb(0x85c070),
            WIZARD.utils.hexToRgb(0xdefacf)
        ],
        [
            WIZARD.utils.hexToRgb(0x1d1d1d),
            WIZARD.utils.hexToRgb(0x444935),
            WIZARD.utils.hexToRgb(0x808a62),
            WIZARD.utils.hexToRgb(0xbcc897)
        ],
        [
            WIZARD.utils.hexToRgb(0x201203),
            WIZARD.utils.hexToRgb(0x205b57),
            WIZARD.utils.hexToRgb(0xac7074),
            WIZARD.utils.hexToRgb(0xd7eddf)
        ],
        [
            WIZARD.utils.hexToRgb(0x47496c),
            WIZARD.utils.hexToRgb(0x317474),
            WIZARD.utils.hexToRgb(0x68bb63),
            WIZARD.utils.hexToRgb(0x96e47c)
        ],
        [
            WIZARD.utils.hexToRgb(0x555b77),
            WIZARD.utils.hexToRgb(0x457874),
            WIZARD.utils.hexToRgb(0x46eb47f),
            WIZARD.utils.hexToRgb(0xe5f48b)
        ]

    ],
    playerSpeed: 0.1,
    playerCarSpeed: 0.5,
    bulletSpeed: 0.5,
    bulletTime: 2000, //ms
    bulletMuzzleFlashTime: 150,
    bulletDamage: 1,
    enemyHealth: 2

};

MAFIA.globals = {
    setCurrentColorIndex: function(index){
        //console.log("Changing color index: " + index);
        this.currentColorIndex = index;
    },
    setCurrentColorArray: function(array){
        //console.log("Changing color array: " + array);
        this.currentColorArray = array;
    },
    currentColorIndex: 0,
    currentColorArray: MAFIA.constants.colors[0]
};

MAFIA.progress = {
    score: 0,
    cash: 0
};

MAFIA.state = {
    load: function(){
        var progress = JSON.parse(WIZARD.state.load("mafia"));
        if(progress != null){
            console.log("State loaded.");
            MAFIA.progress = progress;
        }
    },

    save: function(){
        console.log("State saved.");
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
        "start": "empezar",
        "load": "cargar",
        "change_palette": "cambiar paleta"

    },
    "en":{
        "start": "start",
        "load": "load",
        "change_palette": "change palette"

    }
};

MAFIA.transitionEffects = {
    fadeNormalToBright: function(){
        console.log("NB");
        var count = 0;
        var index = MAFIA.globals.currentColorIndex;
        WIZARD.time.createTimer("fadeNormalToBright", 100, function(){
            console.log("AAA" + (colors[index].length - 1 - count));
            for(var i = 0; i <  colors[index].length - 1 - count; i++){
                MAFIA.globals.currentColorArray[i] = MAFIA.globals.currentColorArray[i+1];
            }
            count++;
        }, 4, true);
    },

    fadeDarkToNormal: function(){
        console.log("DN");
        var count = 0;
        var index = MAFIA.globals.currentColorIndex;
        var color = colors[index][0];
        MAFIA.globals.currentColorArray = [color, color, color, color];
        WIZARD.time.createTimer("fadeDarkToNormal", 100, function(){
            console.log("AAA" + (colors[index].length - 1));
            for(var i = colors[index].length - 1; i > colors[index].length - 1 - count; i--){
                MAFIA.globals.currentColorArray[i] = colors[index][i - (3 - count)];
            }
            count++;
        }, 4, true);
    },

    fadeBrightToNormal: function(){
        console.log("BN");
        var count = 0;
        var index = MAFIA.globals.currentColorIndex;
        var color = colors[index][3];
        MAFIA.globals.currentColorArray = [color, color, color, color];
        WIZARD.time.createTimer("fadeBrightToNormal", 100, function(){
            for(var i = 0; i < count; i++){
                MAFIA.globals.currentColorArray[i] = colors[index][i + (3 - count)];
            }
            count++;
        }, 4, true);
    },

    fadeNormalToDark: function(){
        console.log("ND");
        var count = 0;
        var index = MAFIA.globals.currentColorIndex;
        WIZARD.time.createTimer("fadeNormalToDark", 100, function(){
            for(var i = colors[index].length; i > count; i--){
                MAFIA.globals.currentColorArray[i] = MAFIA.globals.currentColorArray[i-1];
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

MAFIA.maps = {
    loadMapToCurrentScene: function(map){
        var scene = MAFIA.scenes.current;
        for(var i = 0; i < map.layers.length; i++){
            var width =  map.layers[i].width;

            var out = "";

            for(var j = 0; j < map.layers[i].data.length; j++){
                var x = Math.floor(j % width);
                var y = Math.floor(j / width);
                var id = map.layers[i].data[j] - 1;

                var w = map.layers[i].spriteSheetWidth;
                var xx = Math.floor(id % w);
                var yy = Math.floor(id / w);

                if(x == 19)
                    out += "(" + xx + "," + yy + "), \n\n";
                else
                    out += "(" + xx + "," + yy + "), ";

                if(id != -1){
                    var tiles = i == 0 ? scene.tiles0 : scene.tiles1;
                    MAFIA.entities.addEntity(new MAFIA.entities.tile(x * 16, y * 16, xx, yy, true), tiles);
                }
            }
        }
    },

    test:{
          layers: [
              {
                  data:[11, 12, 19, 20, 10, 11, 13, 14, 15, 16, 17, 11, 11, 12, 19, 20, 10, 11, 11, 11, 35, 36, 43, 44, 34, 35, 37, 38, 39, 40, 41, 35, 35, 36, 43, 44, 34, 35, 35, 35, 59, 60, 67, 68, 58, 59, 61, 62, 63, 64, 65, 59, 59, 60, 67, 68, 58, 59, 59, 59, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 50, 51, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26],
                  height:15,
                  width:20,
                  spriteSheetWidth: 24
              },
              {
                  data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 0, 30, 31, 0, 0, 0, 0, 30, 31, 0, 0, 0, 0, 30, 31, 0, 0, 0, 0, 30, 0, 54, 55, 0, 0, 0, 0, 54, 55, 0, 0, 8, 9, 54, 55, 0, 0, 0, 0, 54, 0, 78, 79, 0, 0, 0, 0, 78, 79, 0, 0, 32, 33, 78, 79, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  height:15,
                  width:20,
                  spriteSheetWidth: 24
              }
          ]
    }
};