var Play = 1;
var End = 0;
var gameState = 1;
var mario,mario_running,mario_collide;
var bg_bg;
var wall,ground,wallImage
var obsImage;
var coins;
var score;
var coinsGroup;
var obsGroup;
var gameover,gameover_img,restart,restart_img;
var jumpsound,diesound,checkpointsound;

function preload(){
 
mario_running = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png")
mario_collide = loadImage("collided.png")
bg_bg = loadImage("bg.png")
wallImage = loadImage("ground2.png")
obsImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png")
coinsImage = loadAnimation("coin1.png","coin1.png","coin3.png","coin4.png","coin5.png")
gameover_img = loadImage("gameover.png")
restart_img = loadImage("restart.png")
jumpsound = loadSound("jump.mp3")
diesound = loadSound("die.mp3")

}

function setup() {
  createCanvas(1000, 600);

 mario = createSprite(100,480,40,40)
 mario.addAnimation("mario_running",mario_running)
 mario.addAnimation("mario_collide",mario_collide)
 mario.scale = 2
 mario.setCollider("circle",0,5,15)

 ground = createSprite(500,517,1000,20)
 ground.visible = false;

 wall = createSprite(500,583,1000,20)
 wall.addImage(wallImage)
 wall.velocityX = -5
 wall.scale = 2
 wall.x = wall.width/2

 score = 0;

 coinsGroup = new Group();
 obsGroup = new Group();

 gameover = createSprite(500,400,50,50)
 gameover.addImage("gameover_img",gameover_img)
 gameover.visible = false

 restart = createSprite(500,300,50,50)
 restart.addImage("restart_img",restart_img)
 restart.visible = false

}

function draw() {
  background(bg_bg);

  mario.collide(ground);

  if(gameState===1){
 
 if(touches.length>0 ||(keyDown("space")&& mario.y>466)){
 mario.velocityY = -23
 jumpsound.play();
 touches = [];
 }
     
 if(wall.x<0){
 wall.x = wall.width/2
 }

 if(obsGroup.isTouching(mario)){
   gameState = 0
   diesound.play();
 }

 if(score>=50){
  wall.velocityX = -7
  coinsGroup.setVelocityXEach(-7)
  obsGroup.setVelocityXEach(-7)
  }

  
     
 spawnobs();
 coin();
     
 mario.velocityY =  mario.velocityY + 1.0;

 for(var i = 0;i<coinsGroup.length;i++){
 if(coinsGroup.get(i).isTouching(mario)){
   score = score+10
   coinsGroup.get(i).remove();
 }
 }
  }

  else if(gameState===0){

    wall.velocityX = 0
    mario.velocityY = 0
    coinsGroup.setVelocityXEach(0)
    coinsGroup.setLifetimeEach(-1)
    obsGroup.setVelocityXEach(0)
    obsGroup.setLifetimeEach(-1)
    mario.changeAnimation("mario_collide",mario_collide)
    gameover.visible = true
    restart.visible = true
    
    if(mousePressedOver(restart)||touches.length>0){
      gameOver();
      touches = [];
    }
  }

  drawSprites();

  textSize(25)
  fill("black")
  text("Score:" + score,10,40)
}

function spawnobs(){

if(frameCount%75 ===0){
  var obstacles = createSprite(1000,480,10,10)
  obstacles.addAnimation("obstacles",obsImage)
  obstacles.velocityX = -5
  obstacles.scale = 1.5
  obstacles.lifetime = 250
  obsGroup.add(obstacles);
}
}

function coin (){
  if(frameCount%80===0){
    var coins = createSprite(1000,random(300,350),10,10)
    coins.addAnimation("coins",coinsImage)
    coins.velocityX = -3
    coins.scale = 0.3
    coins.lifetime = 350
    coinsGroup.add(coins);
}
}

function gameOver (){

  gameState = 1;
  coinsGroup.destroyEach();
  obsGroup.destroyEach();
  score = 0;
  mario.changeAnimation("mario_running",mario_running);
  wall.velocityX = -5
  gameover.visible = false;
  restart.visible = false;

}