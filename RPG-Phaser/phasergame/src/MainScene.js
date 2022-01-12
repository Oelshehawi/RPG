import Player from "./player.js"

export default class MainScene extends Phaser.Scene {
    
    constructor()
    {
        super("MainScene");
        
    }
    
    preload()
    {
        Player.preload(this)
        this.load.image ('tilesVillage',"../assets/villagestuff.png")
        this.load.image ('tilesForest',"../assets/forest.png")
        this.load.image ('tilesWater',"../assets/Waterfall2.png")
        this.load.tilemapTiledJSON('mapVillage', "../assets/StartVillage.json")
    }
    
    create()
    {
        const Village = this.make.tilemap({key: "mapVillage"})

        const TilesVillage = Village.addTilesetImage("World", "tilesVillage")
        const TilesForest = Village.addTilesetImage("forest", "tilesForest")
        const TilesWater = Village.addTilesetImage("water", "tilesWater")


        const allTiles = [TilesForest, TilesVillage, TilesWater];
   
    //world layers
        const ground = Village.createStaticLayer("Ground", allTiles, 0, 0)
        const highlayer = Village.createStaticLayer("Higher ground", allTiles, 0, 0)
        const House = Village.createStaticLayer("Houses", allTiles, 0, 0)
        const roof = Village.createStaticLayer("roof", allTiles, 0, 0)
        const Ladders = Village.createStaticLayer("Ladders", allTiles, 0, 0)
        const Misc = Village.createStaticLayer("Miscellaneous", allTiles, 0, 0)
        
        

        House.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(House)
        Misc.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(Misc)
        highlayer.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(highlayer)
        ground.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(ground)
        roof.setCollisionByProperty({collides:true})
        this.matter.world.convertTilemapLayer(roof)

    

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
        this.player = new Player({scene:this, x: spawnPoint.x, y:spawnPoint.y, texture:'player'})
        //this.player= this.matter.add.sprite(spawnPoint.x, spawnPoint.y, "player")
        
        this.player.inputKeys = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            })
            //Camera
            const camera = this.cameras.main
            camera.startFollow(this.player)
            camera.setBounds(0, 0, Village.widthInPixels, Village.heightInPixels)

    }

    update(){
        this.player.update();
    }






}