const startBtn = document.getElementById("start-btn");
const canvas = document.getElementById("canvas");
const startScreen  = document.querySelector(".start-screen");
const checkpointScreen = document.querySelector(".checkpoint-screen");

const checkpointMessage = document.querySelector(".checkpoint-screen > p");





const ctx = canvas.getContext("2d");
canvas.width = innerWidth;  //// paint width
canvas.height = innerHeight;   ///paint he


const gravity = 0.5;  /// gravity for going down 
let isCheckpointCollisionDetectionActive = true;


const proportionalSize = (size) => {  /// setting size of screen with proportions

    return innerHeight < 500 ? Math.ceil((size / 500) * innerHeight) : size;  


}

class Platform {    /// Platforms UI
    constructor(x,y){
       this.position = {
            x,
            y,
        }

        this.width = 200;
        this.height = proportionalSize(40);


    }

    draw(){
        ctx.fillStyle = "#acd157";
        ctx.fillRect(this.position.x, this.position.y,  this.width,this.height);


    };



}    



class Player {
    constructor(){
        this.position = {    /// player position
            x : proportionalSize(10),
            y : proportionalSize(400)
        };

        this.velocity = {  /// x y speed of objet
            x : 0,
            y : 0
        }

        this.width = proportionalSize(40);  ///size of object 
        this.height = proportionalSize(40);
    }


    draw(){   /// creating object look
        ctx.fillStyle = "#99c9ff";
        ctx.fillRect(this.position.x, this.position.y,this.width, this.height);

    }


    update(){
        this.draw()
        
        this.position.x += this.velocity.x;  /// movoing object
        this.position.y += this.velocity.y;
    
    
    
        if (this.position.y + this.height + this.velocity.y  <= canvas.height)
        {
            
            if(this.position.y < 0)
            {
                this.position.y = 0;
                this.velocity.y = gravity  ;

            }

            this.velocity.y  += gravity;
        }
        else 
        {
            this.velocity.y = 0;

        }



        if (this.position.x < this.width)   /// checking left X
        {
            this.position.x  = this.width;

        }


        if ( this.position.x >= canvas.width -2*this.width) //checking right x
        {
            this.position.x = canvas.width - 2 * this.width;
        }




    }




}


class CheckPoint {
    constructor(x,y,z){
        this.position = {
            x,
            y,
        }

        this.width = proportionalSize(40);
        this.height = proportionalSize(70);




    }



}





const player = new Player();



const platformPositions  = [    /// Platform postition

  
{ x: 500, y: proportionalSize(450) },
{ x: 700, y: proportionalSize(400) },
{ x: 850, y: proportionalSize(350) },
{ x: 900, y: proportionalSize(350) },
{ x: 1050, y: proportionalSize(150) },
{ x: 2500, y: proportionalSize(450) },
{ x: 2900, y: proportionalSize(400) },
{ x: 3150, y: proportionalSize(350) },
{ x: 3900, y: proportionalSize(450) },
{ x: 4200, y: proportionalSize(400) },
{ x: 4400, y: proportionalSize(200) },
{ x: 4700, y: proportionalSize(150) },
    
    

];


const platforms  = platformPositions.map((platform)=> new Platform(platform.x, platform.y)); /// creating new plaform with given positions 




const animate = () => {  /// player movement  animation  by pressing keys

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clearing old canvas
    platforms.forEach((platform)=>{

        platform.draw();

    })

    player.update();

    if (keys.rightKey.pressed  && player.position.x < proportionalSize(400))   /// speding up by pressing key
    {
        player.velocity.x = 5;
        
    }
    else if (keys.leftKey.pressed && player.position.x > proportionalSize(100))    // stopping by pressing key
    {
        player.velocity.x = -5;
    }
    else {      // not moving
        player.velocity.x = 0;   
    }



    if(keys.rightKey.pressed && isCheckpointCollisionDetectionActive)  /// moving screen right
    {

        platforms.forEach((platform)=>{

            platform.position.x -=5;
            
        })


    }
    else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive)   // moving screen left
    {
        platforms.forEach((platform)=>{

            platform.position.x +=5;
            
        })
    }



    platforms.forEach((platform) => {

        const collisionDetectionRules = [   /// uper collision
            player.position.y + player.height <= platform.position.y,
            player.position.y + player.height + player.velocity.y >= platform.position.y,
            player.position.x >= platform.position.x - player.width/2,
            player.position.x <= platform.position.x + platform.width - player.width / 3,
        ];


        if (collisionDetectionRules.every((rule)=> rule === true))
        {

            player.velocity.y = 0;
            return;

        }  

        const platformDetectionRules = [      /// down colision
            player.position.x >= platform.position.x - player.width / 2,
            player.position.x <=
            platform.position.x + platform.width - player.width / 3,
            player.position.y + player.height >= platform.position.y,
            player.position.y <= platform.position.y + platform.height,
        ];

        if(platformDetectionRules.every((rule)=> rule))
        {
            player.position.y = platform.position.y + player.height;
            player.velocity.y = gravity;
            
        }
        


    })
}


const keys = {     // player action keys 
    rightKey : { pressed : false},
    leftKey : {pressed : false}

}


const movePlayer = (key,xVelocity, isPressed)  => {

    if(!isCheckpointCollisionDetectionActive)
    {
        player.velocity.x = 0;
        player.velocity.y = 0;
        return;
    }

    switch (key){

        case  "ArrowLeft" : ///going left 
            keys.leftKey.pressed = isPressed 
            if (xVelocity === 0)
            {
                player.velocity.x = xVelocity;
            }
            player.velocity.x -= xVelocity;
            break;



        case  "Spacebar" : /// jumping 
            player.velocity.y -= 8;
            break;

        case  " " :  /// jumping 
            player.velocity.y -= 8; 
            break;

        case  "ArrowUp" : /// jumping 
            player.velocity.y -= 8;
            break;


        case  "ArrowRight" : /// going right 
           keys.rightKey.pressed = isPressed;
           if(xVelocity ===0)
           {
            player.velocity.x = xVelocity;

           }
           player.velocity.x += xVelocity;
    }

}




const startGame = () => {

    canvas.style.display = "block";
    startScreen.style.display= "none";
    animate();

}

startBtn.addEventListener("click", startGame)


window.addEventListener("keydown" , ({key})=>{

    movePlayer(key,8, true);

})


window.addEventListener("keyup", ({key})=>{

    movePlayer(key, 0,false);

})