var giga;
var bird,coin1,coin2;
var Abird,Cbird;
var bg;
var ground1,ground2,ground;
var checkpoint;
var birdImg,gigaImg,coinImg,bgImg,groundImg1,groundImg2,checkpointImg;
var AbirdImg,CbirdImg;
var score =0 ;
var start,startIMG;
var GameOver,GameoverImage;
var gmover,gmoverIMG;
var health;
var health1,health2,health3;
var health1Image;
var bgm,gom,ccm,gsm,jm;

speed = 3;



function preload(){
  bgImg = loadImage('Images/Background 1.jpg');

  birdImg = loadAnimation('Images/Bird1.png','Images/Bird2.png','Images/Bird3.png','Images/Bird4.png');
  AbirdImg = loadAnimation('Images/ABird1.png','Images/ABird2.png','Images/ABird3.png','Images/ABird4.png');
  CbirdImg = loadAnimation('Images/CBird1.png','Images/CBird2.png','Images/CBird3.png','Images/CBird4.png');

  gigaImg = loadAnimation('Images/Giga1.png', 'Images/Giga2.png', 'Images/Giga3.png','Images/Giga4.png','Images/Giga5.png','Images/Giga6.png','Images/Giga7.png','Images/Giga8.png');
  coinImg = loadImage('Images/Coin.png');
  
  groundImg1 = loadImage('Images/Ground 1.png');
  groundImg2 = loadImage('Images/Ground 2.png');
  checkpointImg = loadAnimation('Images/Checkpoint1.png','Images/Checkpoint2.png');

  startIMG = loadImage('Images/start (2).png');
  health1Image = loadImage('Images/health.png');

  GameoverImage = loadImage('Images/gameover2.png');
  gmoverIMG = loadImage('Images/gamover.png');

  bgm=loadSound("Audio/bgmusic.mp3");
  gom=loadSound("Audio/gameend.wav");
  ccm=loadSound("Audio/coincollecting.wav");
  gsm=loadSound("Audio/gamestart.wav");
  jm=loadSound("Audio/jump.mp3");

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(displayWidth/2,displayHeight/2,50,50);
  giga = createSprite(displayWidth/2-200, displayHeight-190, 50, 50);

  ground = createSprite(displayWidth/2,displayHeight-150,900,10);
  checkpoint = createSprite(400,570,100,100);

  bg.addImage(bgImg);
  bg.scale = 1.2;
  bg.velocityY = 4;

  giga.addAnimation("gigasmile",gigaImg);
  giga.scale = 0.65;
  giga.velocityY = 5;
  giga.debug = true;
  giga.setCollider("circle",0,0,75);

  checkpoint.addAnimation("reached",checkpointImg);
  checkpoint.scale = 0.5;

  groundGroup = createGroup();

  coinGroup = createGroup();

  health1=createSprite(500,50,20,20)
  health1.addImage(health1Image);
  health1.scale = 0.3;

  health2=createSprite(550,50,20,20)
  health2.addImage(health1Image);
  health2.scale = 0.3;

  health3=createSprite(600,50,20,20)
  health3.addImage(health1Image);
  health3.scale = 0.3;

  health=7;

  start = createSprite(displayWidth/2,350,20,20);
  start.addImage(startIMG);
  start.scale = 0.15;

  GameOver= createSprite(500,240,20,20);
  GameOver.addImage(GameoverImage);
  GameOver.scale = 0.05;

  gmover = createSprite(500,340,20,20);
  gmover.addImage(gmoverIMG);
  gmover.scale=0.2;

  bird= new Group();
  Abird= new Group();
  Cbird= new Group();

}

function draw() {
  background("white");

  GameOver.visible = false;
  gmover.visible = false;

  if(health>6){
    health1.visible = false;
    health2.visible = false;
    health3.visible = false;
    
    if(mousePressedOver(start)){
      start.visible = false;
      bgm.play();
    } 
    giga.visible = false;
  }

  bg.velocityY = 3 

  if(bg.y>displayHeight-250){
    bg.y = displayHeight/2;
  }

  giga.collide(ground);
  giga.collide(groundGroup);

  if (health> 0 && health < 7){
    console.log(score);
    
    if(bird.collide(giga)){
      health = health-2
      bird.destroyEach()
      gsm.play();
      
    }
  
    if(Abird.collide(giga)){
      health = health-2
      Abird.destroyEach()
      gsm.play();
    }
  
    if(Cbird.collide(giga)){
      health = health-2
      Cbird.destroyEach()
      gsm.play();
    }

    giga.visible = true;
    health1.visible = true;
    health2.visible = true;
    health3.visible = true;

    if (World.frameCount % 100 ==0){
      speed = speed+1;
      }
      
      GameOver.visible = false;
      gmover.visible=false;
      start.visible = false;
      
      if(keyDown(LEFT_ARROW)){
        giga.x = giga.x-5;
      }
    
      if(keyDown(RIGHT_ARROW)){
        giga.x = giga.x+5;
      }
    
      if(keyDown(UP_ARROW)&&giga.y>=158)
      {
        //giga.velocityY = giga.velocityY-5;
        giga.velocityY=-12;
      }
      
      giga.velocityY=giga.velocityY + 0.6;

      spawnGround();
      spawnCoin();

      var select_obstacle = Math.round(random(1,4));

  if (World.frameCount % 500 == 0) {
    if (select_obstacle == 1) {
    obstacle_1();
    } else if (select_obstacle == 2) {
      obstacle_2();
    } else if (select_obstacle == 3) {
      obstacle_3();
    } 
  }

  var select_obstacle2 = Math.round(random(1,4));
  if (World.frameCount % 300 == 0) {
    if (select_obstacle2 == 1) {
    obstacle_1();
    } else if (select_obstacle2 == 2) {
      obstacle_2();
    } else if (select_obstacle2 == 3) {
      obstacle_3();
    } 
  }

  if(giga.isTouching(coinGroup)){
    score = score + 2;
    coinGroup.destroyEach();    
  }

  if(health<6 && health == 4){
    health3.visible = false;
  }

  if(health<4 && health ==2){
    health2.visible=false;
    health3.visible=false;
  }

  if(health<2 && health ==0){
    health1.visible=false;
    health2.visible=false;
    health3.visible=false;
  
    gom.play();
  }
}
  else{
    if(health <1){
      GameOver.visible = true;
      gmover.visible = true;
  
    if(mousePressedOver(gmover)){
      score=0;
      health=6;
      //speed=3;
      
      health1.visible = true;
      health2.visible = true;
      health3.visible = true;
      
      health1.scale = 0.3;
      health2.scale = 0.3;
      health3.scale = 0.3;
      }
    }
  } 

  drawSprites();

if(health<7 ){
  fill("red");
  textSize(40);

  //score = score + Math.round(getFrameRate()/60);
  text("Score: ", displayWidth/2-50,40);
  //text("Score:"+ score,displayWidth/2-50,40);

 
  if(health<7 && health>0){
    fill("red");
    textSize(40);
  //text(score, 555,50);
  text("Score:"+ score,displayWidth/2-50,40);
  }
  else{
    if(health==0){
      fill("red");
      textSize(40);
      text("0",displayWidth/2-50 ,40);
    }
  }
}
  
}
function spawnCoin(){
  if(World.frameCount%190===0){
  coin1 = createSprite(ground1.x,(ground1.y-70),30,30);
  coin1.addImage(coinImg);
  coin1.scale = 0.2;

  coin1.velocityY =3;

  coin2 = createSprite(ground2.x,(ground2.y-70),30,30);
  coin2.addImage(coinImg);
  coin2.scale = 0.2;

  coin2.velocityY =3;

  coinGroup.add(coin1);
  coinGroup.add(coin2);
  }
}

function spawnGround(){
  if(World.frameCount%190===0){
    ground1 = createSprite(100,0,40,10);
    ground1.debug = true;

    ground2 = createSprite(displayWidth-100,-200,40,10);
    ground2.debug = true;

    groundGroup.add(ground1);
    groundGroup.add(ground2);

    ground1.addImage(groundImg1);
    ground2.addImage(groundImg2);

    ground1.scale = 0.25;
    ground2.scale = 0.25;

    ground1.velocityY = 3;
    ground2.velocityY = 3;

    ground1.lifetime = 500;
    ground2.lifetime = 500;
  }
}

function obstacle_1() {
  var bird_ = createSprite(300,Math.round(random(20, 600)), 10, 10);
  bird_.addAnimation("birdfly",birdImg);
  
  bird_.velocityX = 3;
  bird_.lifetime = 700;
  bird_.scale = 0.5;
  bird.add(bird_);

}

function obstacle_2() {
  var Abird_ = createSprite(300,Math.round(random(20, 600)), 10, 10);
  Abird_.addAnimation("Abirdfly",AbirdImg);
  Abird_.velocityX = 3;
  Abird_.lifetime = 700;
  Abird_.scale = 0.5;
  Abird.add(Abird_);
  

}

function obstacle_3() {
  var Cbird_ = createSprite(300,Math.round(random(20, 600)), 10, 10);
  Cbird_.addAnimation("Cbirdfly",CbirdImg);
  Cbird_.lifetime = 700;
  Cbird_.scale = 0.5;
  Cbird_.velocityX = 3;
  Cbird.add(Cbird_);

}
