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

const player = new Player();
