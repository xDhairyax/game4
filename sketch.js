var player,playerImg;
var bg;
var enemy,enemyImg;
var ground;
var upArrow,rightArrow,leftArrow,downArrow,shootBullet;
var bullet,bulletImg;
var count=0;
var gameState=1;
var kills=0;
var enemiesGroup,bulletGroup;
var bg2,bg3;
var boss1,boss2,boss3;
var boss1Bullet;
var boss1bulletGroup;
var boss2bullet;
var boss2bulletGroup;

function preload(){
  playerImg=loadImage("images/player.png");
  bg=loadImage("images/bg.jpeg");
  enemyImg=loadImage("images/enemies.png");
  bulletImg=loadImage("images/normalBullet.jpg");
  bg2=loadImage("images/bg2.gif");
  boss1=loadImage("images/boss1.jpeg");
  bossBullet=loadImage("images/SMbullet.png");
  bg3=loadImage("images/bg3.jpeg");
  boss2=loadImage("images/boss2.jpeg");
  boss3=loadImage("images/boss3.jpeg");

}


function setup(){
  createCanvas(displayWidth-20,displayHeight-20);

  ground=createSprite(displayWidth/2,displayHeight-200,displayWidth,20);
  ground.visible=false;
  

  player=createSprite(100,displayHeight-250,50,50);
  player.addImage("player",playerImg);
  player.scale=0.25;


  upArrow=createButton("JUMP");
upArrow.position(displayWidth-400,displayHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;

});

downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })

  shootBullet=createButton("SHOOT");
  shootBullet.position(displayWidth-400,displayHeight-350);
  shootBullet.mousePressed(()=>{
    bulletGroup.setVelocityXEach(50);
    bulletGroup.setVisibleEach(true);
  })



  enemiesGroup=new Group();
  bulletGroup=new Group();
  boss1bulletGroup=new Group();
  boss2bulletGroup=new Group();

}


function draw(){

  upArrow=createButton("JUMP");
  upArrow.position(displayWidth-400,displayHeight-300);
  upArrow.mousePressed(()=>{
    player.y=player.y-50;
  
  });

  downArrow=createButton("DOWN");
downArrow.position(displayWidth-400,displayHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(displayWidth-350,displayHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(displayWidth-450,displayHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })

  createBullet();

  if(gameState===1){
  background(bg);

  textSize(50);
  stroke(255);
  text("KILLS:"+kills,displayWidth/2,200);
  //camera.position.x=player.x;
  //camera.position.y=displayHeight/2;
player.collide(ground);
enemiesGroup.collide(ground);
//if(keyIsDown(UP_ARROW)){
 // bulletGroup.visible=true;
  //bulletGroup.velocityX=50;
//}
if(enemiesGroup.isTouching(bulletGroup)){
  enemiesGroup.destroyEach();
  bulletGroup.destroyEach();
  kills=kills+1;
}
if(enemiesGroup.isTouching(player)){
  gameState=7;
}
spawnEnemy();


if(kills>10){
  gameState=2;
}
  }

  if(gameState===2){
    background(bg);
    var boss=createSprite(displayWidth-300,displayHeight-500,50,50);
    boss.addImage("bossIMAGE",boss1);

    player.x=200;
    player.y=600;
    boss.collide(ground);

    Boss1Bullet();
 
    if(boss1bulletGroup.isTouching(player)){
      boss1bulletGroup.destroyEach();
     // player.destroy();
      gameState=7;
    }

    //write condition of gameState going to 3


  }

  if(gameState===3){
    background(bg3);
    player.x=200;
    player.y=600;

    spawnEnemy();
  
    if(enemiesGroup.isTouching(bulletGroup)){
      enemiesGroup.destroyEach();
      bulletGroup.destroyEach();
      kills=kills+1;
    }

      if(kills>15){
        gameState=4;
      }
    
    if(enemiesGroup.isTouching(player)){
     // player.destroy;
      gameState=7
    }

  }

if(gameState===4){
  background(boss2);
    
  Boss2Bullet();

  if(boss2bulletGroup.isTouching(player)){
    boss1bulletGroup.destroyEach();
    //player.destroy();
    gameState=7
  }

  //write condition of gameState going to 5


}

if(gameState===5){
  background(bg2);

  spawnEnemy();

  player.x=200;
  player.y=600;


  if(enemiesGroup.isTouching(player)){
    gameState=7;
  }

  if(enemiesGroup.isTouching(bulletGroup)){
    enemiesGroup.destroyEach();
    bulletGroup.destroyEach();
    kills=kills+1;
  }

  if(kills>20){
    gameState=6;
    }
  }

  if(gameState===6){
    background(boss3);

    
  }

  drawSprites();
}

function Boss2Bullet(){
  if(frameCount % 100===0){
    var Bbullet2=createSprite(400,400,30,30);
    Bbullet2.addImage("bullets1",bossBullet);
    Bbullet2.scale=0.3;

    Bbullet2.velocityY=6;

    Bbullet.lifetime=180;

    boss2bulletGroup.add(Bbullet2);

  }
}

function Boss1Bullet(){
  if(frameCount % 100===0){
  var Bbullet=createSprite(600,550,30,30);
  Bbullet.addImage("bullets",bossBullet);
  Bbullet.scale=0.3

  Bbullet.velocityX=-5;

  Bbullet.lifetime=150;

  boss1bulletGroup.add(Bbullet);

}
}

function spawnEnemy(){
if(frameCount % 160===0 && count<10){
var enemy=createSprite(displayWidth,displayHeight-250,50,50);
  enemy.addImage("enemy",enemyImg);
  enemy.scale=0.7;
 count++
enemy.velocityX=-10;
enemy.velocityY=4;
 var rand=Math.round(random(1,3));
 if(rand===1){
   enemy.y=150;
 }
 else if(rand===2){
   enemy.y=displayHeight/2;
 }
 else{
 enemy.y=displayHeight-250;
 }
enemiesGroup.add(enemy);
}
}

function createBullet(){
  var bullet=createSprite(100,displayHeight-250,50,50);
  bullet.addImage("gun",bulletImg);
  bullet.x=player.x;
  //bullet.y=World.mouseY;
  bullet.visible=false;
  bullet.scale=0.1;

  bulletGroup.add(bullet);
}
