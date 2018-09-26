var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tiles = new Image();
tiles.src="img/tileset.png";

var marioImg = new Image();
marioImg.src="img/little_mario.png";

let spritesheet;

tiles.addEventListener('load',function(){
    ctx.beginPath();
    ctx.fillStyle = "skyblue";
    ctx.rect(0,0,640,448);
    ctx.fill();
    drawGround();
    drawMisteryBox();
    drawBreakableBox();
    drawMario();
    drawPots();
})


function drawGround(){
    spritesheet = new Spritesheet(tiles,16,16);
    spritesheet.define("ground",0.05,0.05);
    
    for(var i=0;i<=211;i++){
        var boolian = true;
        if(i*32>=vX-32 && i*32<=(vX+640+32)){
            for(var j=0;j<noGround.length;j++){
                  if(i==noGround[j]){
                    boolian = false;
                }  
            }
            if(boolian){
                spritesheet.draw("ground",ctx,(i*32-vX)/32,12);
                spritesheet.draw("ground",ctx,(i*32-vX)/32,13);
            }
        }
    }
    
    bufferGlobal ="";
}
function drawMisteryBox(){
    spritesheet = new Spritesheet(tiles,16,16);
    spritesheet.define("misteryBox",27.05,0.05);
    
    for(var i=0;i<misteryBox.length;i++){
        if(misteryBox[i][0]*32>=vX-32 && misteryBox[i][0]*32<=(vX+640+32)){
            spritesheet.draw("misteryBox",ctx,(misteryBox[i][0]*32-vX)/32,misteryBox[i][1]);
        }
    }
    bufferGlobal ="";
}

function drawBreakableBox(){
    spritesheet = new Spritesheet(tiles,16,16);
    spritesheet.define("breakable",2.05,0.05);
    for(var i=0;i<breakableBox.length;i++){
        if(breakableBox[i][0]*32>=vX-32 && breakableBox[i][0]*32<=(vX+640+32)){
            spritesheet.draw("breakable",ctx,(breakableBox[i][0]*32-vX)/32,breakableBox[i][1]);
        }
    }
    bufferGlobal ="";
}

function drawMario(){
    spritesheet = new Spritesheet(marioImg,16,16);
    spritesheet.define("mario",marioPos[2],marioPos[3]);
    spritesheet.draw("mario",ctx,marioPos[0],marioPos[1]);
}

function drawPots(){
    for(var i=0;i<pot[0].length;i++){
        spritesheet = new Spritesheet(tiles,16,16);
        spritesheet.define("pots",0.125,9.125);
        if(pot[0][i][0]*32>=vX-32 && pot[0][i][0]*32 <= (vX+640+32)){
         spritesheet.draw("pots",ctx,(pot[0][i][0]*32-vX)/32,pot[0][i][1]);
        }
    }
    for(var i=0;i<pot[1].length;i++){
        spritesheet = new Spritesheet(tiles,16,16);
        spritesheet.define("pots",1.125,9.125);
        if(pot[1][i][0]*32>=vX-32 && pot[1][i][0]*32 <= (vX+640+32)){
         spritesheet.draw("pots",ctx,(pot[1][i][0]*32-vX)/32,pot[1][i][1]);
        }
    }
    for(var i=0;i<pot[2].length;i++){
        spritesheet = new Spritesheet(tiles,15,16);
        spritesheet.define("pots",0.125,10.125);
        if(pot[2][i][0]*32>=vX-32 && pot[2][i][0]*32 <= (vX+640+32)){
         spritesheet.draw("pots",ctx,(pot[2][i][0]*32-vX+2)/32,pot[2][i][1]);
        }
    }
    for(var i=0;i<pot[3].length;i++){
        spritesheet = new Spritesheet(tiles,15,16);
        spritesheet.define("pots",1.125,10.125);
        if(pot[3][i][0]*32>=vX-32 && pot[3][i][0]*32 <= (vX+640+32)){
         spritesheet.draw("pots",ctx,(pot[3][i][0]*32-vX-2)/32,pot[3][i][1]);
        }
    }
}


function moveRight(){
    if(vX<6130){
           vX += marioSpeed*32; 
            if(marioPos[0]<15){
                marioPos[0] +=marioSpeed;
            }
            
            marioPos[2] = (marioPos[2]+1)%5;
        }
       updateCanvas();
}

function moveLeft(){
    if(vX>0){
            vX -= marioSpeed*32;
            if(marioPos[0]>4){
               marioPos[0] -=marioSpeed; 
            }
            
        }
        updateCanvas();
}
var gravity = 0.05;
var reachTop = false;
var stillJumping = false;

function jump(){
    vX += 0.03*32;
    var random = Math.floor(Math.random()*2)+7;
    if(marioPos<14){
       marioPos[0] += 0.03; 
    }
    
    if(marioPos[1] <= random){
        reachTop = true;
    }
    if(reachTop == false){
        marioPos[2] =13;
        marioPos[1] -= gravity;
        stillJumping = true;
    } else if(reachTop == true && marioPos[1]<11){
        marioPos[2] = 7;
        marioPos[1] += gravity+0.01;
        stillJumping = true;
    } else if(marioPos[1]>=11){
        clearInterval(jumping);
        reachTop = false;
        marioPos[2] =0;
        marioPos[1] == 11;
        stillJumping = false;
    }
    updateCanvas();
}