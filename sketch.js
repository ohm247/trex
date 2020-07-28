var  trex,trex_running,trex_collided;
var ground,invisibleground,groundimage;
var cloudsGroup,obstacleGroup,cloudImage;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score = 0
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameOver,restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundimage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,25,25);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5

  ground = createSprite(200,180,400,0);
  ground.addImage(groundimage)

  invisibleground = createSprite(200,190,400,5);
  invisibleground.visible = false;

  cloudsGroup = new Group();
  obstacleGroup = new Group();
  
  
   gameOver = createSprite(300,100);
   restart = createSprite(300,140);
  gameOver.addImage(gameOverimg);
  gameOver.scale = 0.5;
  restart.addImage(restartimg);
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(255);
  
  text("score:"+score,100,100);

  if(gamestate === PLAY ){
    score = score+Math.round(frameRate()/60);
    ground.velocityX = -(6+3*score/100);
if(ground.x < 0 ){
  ground.x = ground.width/2
}
if(keyDown ("space") && trex.y >= 159){
  trex.velocityY = -14
}
trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleground);
  spawnClouds();
  spawnObstacles();
  if(obstacleGroup.isTouching(trex)){
    gamestate = END;
  }
  }
  else if(gamestate === END){
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset()
    }
  }

  
  drawSprites();
}
function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
                break;
     case 2: obstacle.addImage(obstacle2);
                break;
     case 3: obstacle.addImage(obstacle3);
                break;
     case 4: obstacle.addImage(obstacle4);
                break;
     case 5: obstacle.addImage(obstacle5);
                break;
     case 6: obstacle.addImage(obstacle6);
                break;
    default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}