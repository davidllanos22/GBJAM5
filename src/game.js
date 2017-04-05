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
    debug: true,
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
        this.currentColorIndex = index;
    },
    setCurrentColorArray: function(array){
        this.currentColorArray = array;
    },
    currentColorIndex: 0,
    currentColorArray: MAFIA.constants.colors[0]
};

MAFIA.progress = {
    score: 0,
    cash: 0,
    level: 0
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
        "change_palette": "cambiar paleta",
        "start_mission": "empezar mision",
        "shop": "tienda",
        "save": "guardar",
        "mission_0_1": "Elimina a todos los",
        "mission_0_2": "gangsters",

        "mission_1_1": "Descripcion mision 2",
        "mission_1_2": "Descripcion mision 2",

        "mission_2_1": "Descripcion mision 3",
        "mission_2_2": "Descripcion mision 3",

        "mission_3_1": "Descripcion mision 4",
        "mission_3_2": "Descripcion mision 4",

        "mission_4_1": "Descripcion mision 5",
        "mission_4_2": "Descripcion mision 5",

        "mission_5_1": "Descripcion mision 6",
        "mission_5_2": "Descripcion mision 6",

        "mission_6_1": "Descripcion mision 7",
        "mission_6_2": "Descripcion mision 7",

        "mission_7_1": "Descripcion mision 8",
        "mission_7_2": "Descripcion mision 8",

        "mission_8_1": "Descripcion mision 9",
        "mission_8_2": "Descripcion mision 9",

        "mission_9_1": "Descripcion mision 10",
        "mission_9_2": "Descripcion mision 10",

    },
    "en":{
        "start": "new game",
        "load": "load game",
        "change_palette": "change palette",
        "start_mission": "start mission",
        "shop": "shop",
        "save": "save",
        "mission_0_1": "Eliminate all",
        "mission_0_2": "gangsters",

        "mission_1_1": "Description mision 2",
        "mission_1_2": "Description mision 2",

        "mission_2_1": "Description mision 3",
        "mission_2_2": "Description mision 3",

        "mission_3_1": "Description mision 4",
        "mission_3_2": "Description mision 4",

        "mission_4_1": "Description mision 5",
        "mission_4_2": "Description mision 5",

        "mission_5_1": "Description mision 6",
        "mission_5_2": "Description mision 6",

        "mission_6_1": "Description mision 7",
        "mission_6_2": "Description mision 7",

        "mission_7_1": "Description mision 8",
        "mission_7_2": "Description mision 8",

        "mission_8_1": "Description mision 9",
        "mission_8_2": "Description mision 9",

        "mission_9_1": "Description mision 10",
        "mission_9_2": "Description mision 10",
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
        wiz.drawText(this.textToShow, x, y, "font");
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
    current: null,
    loadMapToCurrentScene: function(map){
        this.current = map;
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
                    if(id == 574) { //player
                        console.log("PLAYER");
                        var player = new MAFIA.entities.player(x * 16, y * 16);
                        MAFIA.scenes.current.player = player;
                        MAFIA.entities.addEntity(player, MAFIA.scenes.current.entities);
                    }else if(id == 575) { //enemy
                        console.log("ENEMY");
                        MAFIA.entities.addEntity(new MAFIA.entities.enemy(x * 16, y * 16), MAFIA.scenes.current.entities);
                    }else if(id == 550) { //car
                        console.log("CAR");
                        MAFIA.entities.addEntity(new MAFIA.entities.playerCar(x * 16, y * 16),  MAFIA.scenes.current.entities);
                    }else if(id == 552) { //boss 1
                        console.log("BOSS 1");

                    }else if(id == 527) { //boss 2
                        console.log("BOSS 2");

                    }else{
                        var tiles = i == 0 ? scene.tiles0 : scene.tiles1;
                        MAFIA.entities.addEntity(new MAFIA.entities.tile(x * 16, y * 16, xx, yy, true), tiles);
                    }

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
                  data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 6, 0, 30, 31, 0, 0, 0, 0, 30, 31, 0, 0, 0, 0, 30, 31, 0, 0, 0, 0, 30, 0, 54, 55, 0, 0, 0, 0, 54, 55, 0, 0, 8, 9, 54, 55, 0, 0, 0, 0, 54, 0, 78, 79, 0, 0, 0, 0, 78, 79, 0, 0, 32, 33, 78, 79, 0, 0, 0, 0, 78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 551, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  height:15,
                  width:20,
                  spriteSheetWidth: 24
              }
          ]
    },
    indoor:{
        layers: [
            {
                data:[98, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 122, 98, 99, 145, 146, 147, 148, 145, 145, 145, 145, 146, 147, 148, 145, 145, 145, 146, 147, 148, 145, 97, 99, 169, 170, 171, 172, 169, 169, 169, 169, 170, 171, 172, 169, 169, 169, 170, 171, 172, 169, 97, 99, 193, 194, 195, 196, 193, 193, 193, 193, 194, 195, 196, 193, 193, 193, 194, 195, 196, 193, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 99, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 98, 74, 74, 74, 74, 74, 74, 74, 75, 1, 1, 1, 73, 74, 74, 74, 74, 74, 74, 98],
                height:15,
                width:20,
                spriteSheetWidth: 24
            },
            {
                data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 102, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 126, 126, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 52, 53, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 576, 0, 0, 0, 0, 0, 0, 0, 576, 0, 0, 0, 0, 76, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 76, 77, 0, 0, 0, 0, 103, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 100, 101, 0, 0, 0, 0, 127, 124, 125, 0, 0, 0, 0, 0, 76, 77, 0, 0, 52, 53, 124, 125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 101, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 124, 125, 127, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 29, 102, 0, 576, 0, 0, 0, 0, 0, 0, 0, 576, 0, 0, 0, 0, 0, 0, 0, 52, 53, 126, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 575, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                height:15,
                width:20,
                spriteSheetWidth: 24
            }
        ]
    }

};