
// var c = document.getElementById("canvas");
// var ctx = c.getContext("2d");
// ctx.beginPath();
// ctx.arc(95,50,40,0,2*Math.PI);
// ctx.fill();
// ctx.stroke();


// -------------------------------------- eyeballs
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let eye;
let theta=0;

// const mouse ={
//     x: undefined,
//     y: undefined
// }

// window.addEventListener("mousemove", function(e){
//     this.mouse.x=e.clientX;
//     this.mouse.y=e.clientY;
//     console.log(mouse.x)
// });

class Eye{
    constructor(x,y,radius){
        this.x=x;
        this.y=y;
        this.radius=radius;
    }

    draw(){
        //eye
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,Math.PI*2, true);
        ctx.fillStyle="black";
        ctx.fill();
        ctx.closePath();

        //pupil

        //iris
        // let iris_dx= mouse.x- this.x;
        // let iris_dy= mouse.y-this.y;
        // let theta= Math.atan2(iris_dy, iris_dx);
        let iris_x= this.x +Math.cos(theta) + this.radius/10;
        let iris_y= this.y +Math.cos(theta) + this.radius/10;
        let irisRadius=this.radius/2;
        ctx.beginPath();
        ctx.arc(iris_x, iris_y, irisRadius,0, Math.PI*2, true);
        ctx.fillStyle="white";
        ctx.fill();
        ctx.closePath();

        console.log(iris_dx);


    }
}

    function init() {
        let eye ={
            x: Math.random() *canvas.width,
            y: Math.random() * canvas.height,
            radius: 100  //5..105
        }
        this.eye= new Eye (eye.x, eye.y, eye.radius);
    }

    function animate(){
        // requestAnimationFrame(animate);
        // ctx.fillStyle = "rgba(0, 0, 0.25)";
        // ctx.fillRect(0,0,canvas.width, canvas.height);
        eye.draw();
    }

    init();
    this.eye.draw();
    // animate();