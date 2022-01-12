export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame)
        this.scene.add.existing(this)

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 12,{isSensor:false, label:'playerCollider'})
        let playerSensor = Bodies.circle(this.x, this.y, 24, {isSensor:true, label: 'playerSensor'})
        const compoundBody = Body.create({
            parts:[playerCollider, playerSensor],
            frictionAir: 0.35,
        })
        this.setExistingBody(compoundBody)
        this.setFixedRotation();
    }


    static preload(scene){

        scene.load.spritesheet('player', "../assets/appa.png", {frameWidth: 64, frameHeight: 64})
    }

    get velocity(){
        return this.body.velocity;
    }


    update()
    {
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


        console.log("update")
        const speed = 1.5
        let playerVelocity = new Phaser.Math.Vector2();
        

        //movement
        if(this.inputKeys.left.isDown)
        {
            playerVelocity.x = -1;
            if (this.inputKeys.shift.isDown)
            {
            playerVelocity.x = -1.5
            }
        }
        else if (this.inputKeys.right.isDown)
        {
            playerVelocity.x = 1;
            if (this.inputKeys.shift.isDown)
            {
            playerVelocity.x = 1.5
            }
        }


        if(this.inputKeys.up.isDown)
        {
            playerVelocity.y = -1;
            if (this.inputKeys.shift.isDown)
            {
            playerVelocity.y = -1.5
            }
        }
        else if (this.inputKeys.down.isDown)
        {
            playerVelocity.y = 1;
            if (this.inputKeys.shift.isDown)
            {
            playerVelocity.y = 1.5
            }
        }


        playerVelocity.scale(speed)
        this.setVelocity(playerVelocity.x, playerVelocity.y)



        //animations
        if (this.inputKeys.left.isDown)
        {
           this.anims.play("left", true)
        }
        else if (this.inputKeys.right.isDown)
        {
            this.anims.play("right", true)
        }
        else if (this.inputKeys.up.isDown)
        {
            this.anims.play("back", true)
        }
        else if (this.inputKeys.down.isDown)
        {
            this.anims.play("front", true)
        }
        
        else
        {
            this.anims.stop()
           
    
        }
    

    }

}