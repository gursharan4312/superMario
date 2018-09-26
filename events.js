var vX=0;
var vY=0;

var marioPos =[5,11,0,0]

var marioSpeed = 0.2;

document.addEventListener("keydown",updateViewport);

function updateViewport(e){
    var key = e.keyCode;
    if(key == 39){
        if(stillJumping == false){
            moveRight(); 
        }
    } else if(key == 37){
        if(stillJumping == false){
            moveLeft();
        }
    }else if(key == 32){
        if(stillJumping == false){
            checkJump();
        }
    } 

}

var jumping;
function updateCanvas(){
    ctx.clearRect(0,0,640,448);
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.rect(0,0,640,448);
    ctx.fill();
    drawMario();
    drawBreakableBox();
    drawGround();
    drawMisteryBox();
    drawPots();
}
function checkJump(){
    jumping = setInterval(jump,10);

}