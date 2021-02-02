var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1;
var END =0;
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);



//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
gameEnd = createSprite(200,200);
gameEnd.addAnimation("end",endImg);
gameEnd.scale = 0.8;
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  obstaclesGroup = new Group();
}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
  boy.setCollider("circle",0,0,250);
  //boy.debug = true;
    createCash();
  createDiamonds();
  createJwellery();
  createSword();
  obstacles();
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 100;
      
    }else{
      if(swordGroup.isTouching(boy)|| obstaclesGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        obstaclesGroup.destroyEach();
        gameState = END;
    }
  }
  
  if (gameState===PLAY){
    path.velocityY = 4;
    gameEnd.visible= false;
     }
  if (gameState===END){
    path.velocityY = 0;
    boy.destroy();
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    obstaclesGroup.destroyEach();
    gameEnd.visible= true;
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
    boy.depth = cash.depth;
  boy.depth = boy.depth + 1;
  }
}

function createDiamonds() {
  if (frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  boy.depth = diamonds.depth;
  boy.depth = boy.depth + 1;
}
}

function createJwellery() {
  if (frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
    boy.depth = jwellery.depth;
  boy.depth = boy.depth + 1;
  }
}

function createSword(){
  if (frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  boy.depth = sword.depth;
  boy.depth = boy.depth + 1;
  }
}
function obstacles(){
  if (frameCount%60===0){
  obstacle = createSprite(Math.round(random(50,350)),40, 30,30);
  obstacle.scale= 0.08;
  obstacle.velocityY = 4;
  obstacle.lifetime = 115;
  var position = Math.round(random(1,3));
  switch(position){
    case 1: obstacle.addImage(obstacle1Img);
      break;
      case 2: obstacle.addImage(obstacle2Img);
      break;
      case 3: obstacle.addImage(obstacle3Img);
      break;
      default : break;
  }
  
  obstaclesGroup.add(obstacle);
  }
}