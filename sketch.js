var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle,  obstacle1image, obstacle2image, obstacle3image, obstacle4image, obstacle5image, obstacle6image, obstacleGroup
var score=0
var PLAY=1
var STOP=0
var gamestate=1
var newImage;
var gameOver, gameOverImage;
var restart, restartImage;
var diesound, jumpsound, checkpointsound
localStorage["HighestScore"]=0



function obstacles(){

  if(frameCount % 60 === 0){
  obstacle=createSprite(500, 170, 50, 50)
  obstacle.velocityX=-(4 +3*score/1000)    
     var imagenumber=Math.round(random (1,6))
     switch(imagenumber){
       case 1:obstacle.addImage(obstacle1image);
       break;
       case 2:obstacle.addImage(obstacle2image);
       break;
       case 3:obstacle.addImage(obstacle3image);
       break;
       case 4:obstacle.addImage(obstacle4image);
       break;
       case 5:obstacle.addImage(obstacle5image);
       break;
       case 6:obstacle.addImage(obstacle6image);
       break;
       default:break    
    }
     obstacle.scale=0.5
     obstacle.depth=2
         obstacleGroup.add(obstacle);
         if(obstacleGroup.x<0){
           obstacleGroup.destroyEach();
           
           
         }
  }
  
  
}

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 obstacle1image=loadImage("obstacle1.png");
  obstacle2image=loadImage("obstacle2.png");
  obstacle3image=loadImage("obstacle3.png");
  obstacle4image=loadImage("obstacle4.png");
  obstacle5image=loadImage("obstacle5.png");
  obstacle6image=loadImage("obstacle6.png");
  gameOverimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  diesound=loadSound("die.mp3");               
  jumpsound=loadSound("jump.mp3");
  checkpointsound=loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  cloudGroup=createGroup();
  obstacleGroup=createGroup();
  trex.debug=true
  trex.setCollider("circle", 0, 0, 50)
  
  
  gameOver = createSprite (300, 100, 400, 10)
  gameOver.addImage("gameOver", gameOverimage);
  gameOver.scale=0.6
  
  
  restart = createSprite (300, 130, 400, 10)
  restart.addImage("restart", restartimage);
  restart.scale=0.4

}

function draw() {
  background(180);
  textSize(15)
  text("Score: "+score, 500, 50);
 text ("Highest Score: "+localStorage["HighestScore"], 10, 50)
  if (score>0 &&score%200===0){
      checkpointsound.play();
      
      }
  
  trex.collide(invisibleGround);
  
  
  drawSprites();

  if(gamestate===1){
     ground.velocityX = -(6+3*score/1000);
   
     score=score+Math.round(frameCount%1===0)
    gameOver.visible=false
    restart.visible=false
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    jumpsound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
       //spawn the clouds
  spawnClouds();
      obstacles();
    if(obstacleGroup.isTouching (trex)){
      gamestate=0
      diesound.play();
      
    }
   
     
       
       
       
       
  
    
   }
   
  else if(gamestate===0){
         ground.velocityX=0
    obstacleGroup.setVelocityEach(0, 0)
         cloudGroup.setVelocityEach(0,0) 
        
        gameOver.visible=true
          restart.visible=true
    if(mousePressedOver(restart)){
      restartfunction();
      
      
      
    }
     }
 
      
      
      
  
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -(7 +score/1000);
    
    
    //assigning lifetime to the variable
    if(cloudGroup.x<0){
      cloudGroup.destroyEach()
      
    }
    // 600/7=86
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGroup.add(cloud)
    }
}
  function restartfunction(){
    gamestate=1
    obstacleGroup.destroyEach()
    cloudGroup.destroyEach()
    if(localStorage["HighestScore"]<score){
       
       localStorage["HighestScore"]=score
       
     
       }
     
      console.log(localStorage["HighestScore"])
    score=0
    
    
    
  }

