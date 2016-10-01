var MAFIA = MAFIA || {};

MAFIA.constants = {

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

};