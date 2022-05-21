const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let image;

const blockSize=20;
const WIDTH = Math.ceil((canvas.offsetWidth-10) /blockSize) * blockSize;
const HEIGHT = Math.ceil((canvas.offsetHeight-10) /blockSize) * blockSize;

const soundGameOver = new Audio("gameOver.wav");
const soundPoint = new Audio("eat.wav");

let score=0;


class Mouse{
    constructor(){
        this.generateMouse();
    }
    mouseParameters={x:undefined,y:undefined};

    generateMouse(){
        // Returns a random integer from 0 to 100:
        let random_width= Math.floor(Math.random() * (WIDTH+1-20));
        let random_height= Math.floor(Math.random() * (HEIGHT+1-20));
        this.mouseParameters.x= Math.ceil((random_width)/blockSize)*blockSize;
        this.mouseParameters.y= Math.ceil((random_height)/blockSize)*blockSize;
          
   }
}

class Snake{
    blocks=[{ x: undefined, y:undefined }];

    intervalMoves;
    direction;
    startLength=10;

    constructor(x,y,direction){
        this.blocks[0].x=x;
        this.blocks[0].y=y;

        this.direction=direction;
        this.intervalMoves=setInterval(moveSnake,200);
        this.blocks.length=10;
        score=0;
        for(let i=1;i<this.startLength;i++){
            this.blocks[i]={x:this.blocks[0].x+i*blockSize,y:this.blocks[0].y};
        }
        svgToCanvas();
    }
    
    moveHead(){
        let dx=0;
        let dy=0;
        
        if(this.direction=='right'){
            dx=blockSize;
        }
        if(this.direction=='left'){
            dx=-blockSize;
        }
        if(this.direction=='up'){
            dy=-blockSize;
        }
        if(this.direction=='down'){
            dy=blockSize;
        }

        let block=this.blocks[0];

        block.x+=dx;
        block.y+=dy;

        if(block.x<0){
           
            block.x=WIDTH-blockSize;
            return;
        }
        else
        if(block.x>=WIDTH){
           
            block.x=0;
            return;
        }

        if(block.y<0){
           
            block.y=HEIGHT-blockSize;
            return;
        }
        else
        if(block.y>=HEIGHT){
           
            block.y=0;
            return;
        }        
            
    }


    moveBlocks(){
        if(this.blocks[0].x==mouse.mouseParameters.x && this.blocks[0].y ==mouse.mouseParameters.y){
            this.blocks.length++;
            this.blocks[this.blocks.length-1]={x:0,y:0};
            score++;
            mouse=new Mouse();
            soundPoint.play();
        }
            for(let i=this.blocks.length-1;i>0;i--){
                this.blocks[i].x=this.blocks[i-1].x;
                this.blocks[i].y=this.blocks[i-1].y;
            }
    }


    
}

let mouse=new Mouse();
let snake=new Snake(WIDTH/2,HEIGHT/2,'left',10);

    function draw(){
        //snake
        ctx.fillStyle = 'green';
        let len=snake.blocks.length;
        if(snake.blocks.length==undefined){
            len=snake.startLength;
        }
        for(let i =0; i<len; i++){
            ctx.fillStyle='green';
            ctx.fillRect(snake.blocks[i].x, snake.blocks[i].y, blockSize, blockSize);
        }

        //mouse
        drawMouse(mouse.mouseParameters.x, mouse.mouseParameters.y);
       
        //score
        ctx.fillStyle='black';
        ctx.font = "20px Arial";
        ctx.fillText("Score: "+ score, 8, 20);
    }


    


    function isBiten(){
        for(let i=1;i<snake.blocks.length; i++){
            if(snake.blocks[0].x ==snake.blocks[i].x && snake.blocks[0].y==snake.blocks[i].y){
                soundGameOver.play();
                clearInterval(snake.intervalMoves);
                setScore(score);

                gameEnd();
            }
        }
    }

        document.addEventListener('keydown', keyDownHandler);
        let tick=true;
        function keyDownHandler (e) {
            var c = e.code; 
            if(tick){
                switch(c) {
                    case "ArrowUp": if(snake.direction!='down'){ snake.direction='up';} break; 
                    case "ArrowDown": if(snake.direction!='up') { snake.direction='down';} break; 
                    case "ArrowLeft": if(snake.direction!='right') {snake.direction='left';} break;
                    case "ArrowRight": if(snake.direction!='left') {snake.direction='right';} break; 
                    }
            }
            tick=false;
        }

        async function moveSnake() {
            ctx.clearRect(0,0,WIDTH,HEIGHT);
           
           
            snake.moveBlocks();
            snake.moveHead();
            
            isBiten();

            draw();
            
            tick=true;
    }


        function gameEnd(){
            document.getElementById("endInfo").style.visibility="visible";
                document.getElementById("score").innerHTML= "your score is: " + score;
                let button=document.getElementById("newGameButton");
                button.addEventListener('click',startNewGame);
        }

        function startNewGame(){
            document.getElementById("endInfo").style.visibility="hidden";
            document.getElementById("scoreTable").innerHTML="";
            document.getElementById("score").innerHTML="";

            snake=new Snake(WIDTH/2,HEIGHT/2,'left',10);;
        }




        //------------add svg to canvas----------
        function svgToCanvas(){
        var svgElement = document.getElementById('mouse');
        let clonedSvgElement = svgElement.cloneNode(true);
        let outerHTML = clonedSvgElement.outerHTML,
        blob = new Blob([outerHTML],{type:'image/svg+xml;charset=utf-8'});
        let URL = window.URL || window.webkitURL || window;
        let blobURL = URL.createObjectURL(blob);
        image = new Image();

        image.src = blobURL;
        }

        function drawMouse(x,y){
        ctx.drawImage(image, x, y, blockSize, blockSize );
        }


