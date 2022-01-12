import MainScene from "./MainScene.js"


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-rpg ting',
    width: 1200,
    height: 800,
    scene:[MainScene],
    scale:{
        zoom:1.5,
    },
    physics: {
        default: "matter",
          matter: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    plugins: {
        scene: [
            {
                plugin: PhaserMatterCollisionPlugin,
                key: 'matterCollision',
                mapping: 'matterCollision'
            }

        ]
    }
   
  }

  new Phaser.Game(config);
