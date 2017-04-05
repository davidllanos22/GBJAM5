var gameboy_vs = `attribute vec2 a_position;
                    uniform sampler2D u_image;
                    varying vec2 f_texcoord;
                     
                    void main(void){
                      vec2 zeroToOne = a_position;
                      vec2 zeroToTwo = zeroToOne * 2.0;
                      vec2 clipSpace = zeroToTwo - 1.0;
                      gl_Position = vec4(clipSpace * vec2(1, -1), 0.0, 1.0);
                      f_texcoord = (clipSpace + 1.0) / 2.0;
                    }
                  `;

var gameboy_fs = `precision mediump float;
                    uniform sampler2D u_image;
                    varying vec2 f_texcoord;
                    
                    const vec3 color1In = vec3(0.0, 0.0, 0.0);
                    const vec3 color2In = vec3(104.0, 104.0, 104.0);
                    const vec3 color3In = vec3(183.0, 183.0, 183.0);
                    const vec3 color4In = vec3(255.0, 255.0, 255.0);
                  
                    uniform vec3 u_color1Out;
                    uniform vec3 u_color2Out;
                    uniform vec3 u_color3Out;
                    uniform vec3 u_color4Out;
                    
                    vec3 convertColor(vec3 color){
                        return vec3(color.r / 255.0, color.g / 255.0, color.b / 255.0);
                    }
                    
                    bool colorEqual(vec3 a, vec3 b){
                        vec3 converted = convertColor(b);
                        vec3 eps = vec3(0.009, 0.009, 0.009);
                        return all(greaterThanEqual(a, converted - eps)) && all(lessThanEqual(a, converted + eps));
                    }
                    
                    void main(void){
                      vec2 texcoord = f_texcoord;
                      vec3 color = texture2D(u_image, texcoord).rgb;
                      
                      if(colorEqual(color, color1In)){
                         color = convertColor(u_color1Out);
                      }else if(colorEqual(color, color2In)){
                         color = convertColor(u_color2Out);
                      }else if(colorEqual(color, color3In)){
                         color = convertColor(u_color3Out);
                      }else if(colorEqual(color, color4In)){
                         color = convertColor(u_color4Out);
                      }
                      
                      gl_FragColor = vec4(color, 1.0);
                     }
                  `;

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

        WIZARD.scene.create("splash", scene_splash);
        WIZARD.scene.create("menu", scene_menu);
        WIZARD.scene.create("mission_select", scene_mission_select);
        WIZARD.scene.create("walk", scene_walk);
        WIZARD.scene.create("car", scene_car);
        WIZARD.scene.setCurrent("walk", 0, this);

        WIZARD.entity.create("player", entity_player);
        WIZARD.entity.create("tile", entity_tile);
        WIZARD.entity.create("solid", entity_solid);

        WIZARD.map.create("mapWalk", mapWalk);
        WIZARD.map.loadToScene("mapWalk", "walk", mapLoader);

        WIZARD.shader.create("gameboy", gameboy_vs, gameboy_fs);
        WIZARD.shader.setCurrent("gameboy");
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
        WIZARD.scene.current.update(this);
    },

    render: function(){
        this.gl.uniform3f(WIZARD.shader.getUniform("gameboy", "u_color1Out"), MAFIA.globals.currentColorArray[0].r,  MAFIA.globals.currentColorArray[0].g,  MAFIA.globals.currentColorArray[0].b);
        this.gl.uniform3f(WIZARD.shader.getUniform("gameboy", "u_color2Out"), MAFIA.globals.currentColorArray[1].r,  MAFIA.globals.currentColorArray[1].g,  MAFIA.globals.currentColorArray[1].b);
        this.gl.uniform3f(WIZARD.shader.getUniform("gameboy", "u_color3Out"), MAFIA.globals.currentColorArray[2].r,  MAFIA.globals.currentColorArray[2].g,  MAFIA.globals.currentColorArray[2].b);
        this.gl.uniform3f(WIZARD.shader.getUniform("gameboy", "u_color4Out"), MAFIA.globals.currentColorArray[3].r,  MAFIA.globals.currentColorArray[3].g,  MAFIA.globals.currentColorArray[3].b);

        this.clear(MAFIA.constants.originalColors[3]);
        WIZARD.scene.current.render(this);
    }
}).play();
