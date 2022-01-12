


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-rpg ting',
    width: 1200,
    height: 800,
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
    },
    scene: {  
      preload: preload,
      create: create,
      update: update,
    }
  };

  let game = new Phaser.Game(config)
  let player
  let cursors
  let run

  function preload() {
        this.load.image ('tilesVillage',"../assets/villagestuff.png")
        this.load.image ('tilesForest',"../assets/forest.png")
        this.load.image ('tilesWater',"../assets/Waterfall2.png")
        this.load.tilemapTiledJSON('mapVillage', "../assets/StartVillage.json")
        this.load.spritesheet('player', "../assets/appa.png", {frameWidth: 64, frameHeight: 64})
        //this.load.atlas('player',"../assets/player.png" ,"../assets/player.json")
  }

  function create(){
    const Village = this.make.tilemap({key: "mapVillage"})

    const TilesVillage = Village.addTilesetImage("World", "tilesVillage")
    const TilesForest = Village.addTilesetImage("forest", "tilesForest")
    const TilesWater = Village.addTilesetImage("water", "tilesWater")


    const allTiles = [TilesForest, TilesVillage, TilesWater];
   
    //world layers
    const ground = Village.createLayer("Ground", allTiles, 0, 0)
    const highlayer = Village.createLayer("Higher ground", allTiles, 0, 0)
    const House = Village.createLayer("Houses", allTiles, 0, 0)
    const roof = Village.createLayer("roof", allTiles, 0, 0)
    const Ladders = Village.createLayer("Ladders", allTiles, 0, 0)
    const Misc = Village.createLayer("Miscellaneous", allTiles, 0, 0)
    

    //House.setDepth(10)
    roof.setDepth(10)
    //Misc.setDepth(10)//Change trees to high layer
    highlayer.setDepth(10)
    Ladders.setDepth(10)

    //Player
    const spawnPoint = Village.findObject(
        "Player",
        obj => obj.name === "Spawn Point"

    )

    //player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'player')
   // player = new player.Physics.matter.Sprite(this.matter.game,0,0, "player","appa-2.png" )
    player= this.matter.add.sprite(spawnPoint.x, spawnPoint.y, "player")
   // this.physics.world.bounds.setTo(0, 0, 1300, 1200);
    player.body.collideWorldBounds=true


    //collision
    House.setCollisionByProperty({collides:true}) 
    Misc.setCollisionByProperty({collides:true})  
    ground.setCollisionByProperty({collides:true})
    



     //animating

     const anims = this.anims
     
     anims.create({
         key: "left",
         frames: anims.generateFrameNames("player", {start: 4, end: 7}),
         frameRate: 10,
         repeat: -1
 
     })
     
   
     anims.create({
         key: "right",
         frames: anims.generateFrameNames("player", {start: 8, end: 11}),
         frameRate: 10,
         repeat: -1
 
     })
     
     anims.create({
         key: "front",
         frames: anims.generateFrameNames("player", {start: 0, end: 3}),
         frameRate: 10,
         repeat: -1
 
     })
     
    anims.create({
         key: "back",
         frames: anims.generateFrameNames("player", {start: 12, end: 15}),
         frameRate: 10,
         repeat: -1
 
     })
 
    //Camera
    const camera = this.cameras.main
    camera.startFollow(player)
    camera.setBounds(0, 0, Village.widthInPixels, Village.heightInPixels)
     /*
    const debug = this.add.graphics().setAlpha(0.75);
    ground.renderDebug(debug, {
     tileColor: null,
     collidingTileColor: new Phaser.Display.Color(180, 50, 250, 255),
     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
     });
     House.renderDebug(debug, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(180, 50, 250, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        });
        Misc.renderDebug(debug, {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(180, 50, 250, 255),
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            });
            */
  }

  function update(){
    //const prevVelocity = player.body.velocity.clone()
    //player.body.setVelocity(0)
    cursors = this.input.keyboard.createCursorKeys()
    run = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)


    //movement

    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-100)
        if (run.isDown)
        {
            player.body.setVelocityX(-200)
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(100)
        if (run.isDown)
        {
            player.body.setVelocityX(200)
        }
    }
    else if (cursors.up.isDown)
    {
        player.body.setVelocityY(-100)
        if (run.isDown)
        {
            player.body.setVelocityY(-200)
        }
    }
    else if (cursors.down.isDown)
    {
        player.body.setVelocityY(100)
        if (run.isDown)
        {
            player.body.setVelocityY(200)
        }
    }

    if (cursors.left.isDown)
    {
       player.anims.play("left", true)
    }
    else if (cursors.right.isDown)
    {
        player.anims.play("right", true)
    }
    else if (cursors.up.isDown)
    {
        player.anims.play("back", true)
    }
    else if (cursors.down.isDown)
    {
        player.anims.play("front", true)
    }
    
    else
    {
        player.anims.stop()

        //front animate
        
        if(prevVelocity.x < 0) 
            player.setTexture("player", "left")
        else if (prevVelocity.x > 0)
            player.setTexture("player", "right")
        else if (prevVelocity.y < 0)
            player.setTexture("player", "back")
        else if (prevVelocity.y > 0)
            player.setTexture("player", "front")
    }

  }