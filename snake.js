const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'green';

const blockSize=20;
const WIDTH = Math.ceil((canvas.offsetWidth-10) /blockSize) * blockSize;
const HEIGHT = Math.ceil((canvas.offsetHeight-10) /blockSize) * blockSize;

const soundGameOver = new Audio("gameOver.wav");
const soundPoint = new Audio("eat.wav");


let mouse={x:undefined,y:undefined};
let snake=[{ x: undefined, y:undefined }];

let intervalMoves;
let direction;
let score;


function startTheGame(){
        snake[0].x=WIDTH/2;
        snake[0].y=HEIGHT/2;

        direction='left';
        startLength=10;
        snake.length=startLength;
        score=0;

        for(let i=1;i<startLength;i++){
            snake[i]={x:snake[0].x+i*blockSize,y:snake[0].y};
        }

        // localStorage.clear();
        generateMouse();

        intervalMoves=setInterval(moveSnake,200);
}



    function draw(){
        //snake
        len=snake.length;
        if(snake.length==undefined){
            len=startLength;
        }
        for(let i =0; i<len; i++){
            ctx.fillStyle='green';
            ctx.fillRect(snake[i].x, snake[i].y, blockSize, blockSize);
            // ctx.fillText(i, snake[i].x, snake[i].y)
        }

        //mouse
        // ctx.fillStyle='red';
        // ctx.fillRect(mouse.x, mouse.y, blockSize, blockSize);
        drawMouse(mouse.x, mouse.y);
       
        //score
        ctx.fillStyle='black';
        ctx.font = "20px Arial";
        ctx.fillText("Score: "+ score, 8, 20);
    }

    function generateMouse(){
         // Returns a random integer from 0 to 100:
         let random_width= Math.floor(Math.random() * (WIDTH+1-20));
         let random_height= Math.floor(Math.random() * (HEIGHT+1-20));
         mouse.x= Math.ceil((random_width)/blockSize)*blockSize;
         mouse.y= Math.ceil((random_height)/blockSize)*blockSize;
           
    }

    function moveHead(){
        dx=0;
        dy=0;
        
        if(direction=='right'){
            dx=blockSize;
        }
        if(direction=='left'){
            dx=-blockSize;
        }
        if(direction=='up'){
            dy=-blockSize;
        }
        if(direction=='down'){
            dy=blockSize;
        }

        let block=snake[0];

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


    function moveBlocks(){
        if(snake[0].x==mouse.x && snake[0].y ==mouse.y){
            snake.length++;
            snake[snake.length-1]={x:0,y:0};
            score++;
            generateMouse();
            soundPoint.play();
        }
            for(let i=snake.length-1;i>0;i--){
                snake[i].x=snake[i-1].x;
                snake[i].y=snake[i-1].y;
            }
    }

    async function moveSnake() {
            ctx.clearRect(0,0,WIDTH,HEIGHT);
           
            moveBlocks();
            moveHead();
            isBiten();

            draw();
            
            tick=true;
    }

    function isBiten(){
        for(let i=1;i<snake.length; i++){
            if(snake[0].x==snake[i].x && snake[0].y==snake[i].y){
                soundGameOver.play();
                clearInterval(intervalMoves);
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
                    case "ArrowUp": if(direction!='down'){ direction='up';} break; 
                    case "ArrowDown": if(direction!='up') { direction='down';} break; 
                    case "ArrowLeft": if(direction!='right') {direction='left';} break;
                    case "ArrowRight": if(direction!='left') {direction='right';} break; 
                    }
            }
            tick=false;
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

            startTheGame();
        }

        


startTheGame();



