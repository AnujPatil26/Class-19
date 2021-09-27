var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }
    if (keyDown("left_arrow")) {
      ghost.x -= 2
    }
    if (keyDown("right_arrow")) {
      ghost.x += 2
    }
    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    ghost.velocityY += 0.1;
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    Spawn();
    drawSprites();

  }
if(gameState === "end"){
  textSize(24);
  fill("yellow");
  stroke("yellow");
  text("Game Over",230,300);
  
}


}

function Spawn() {
  if (frameCount % 100 === 0) {
    door = createSprite(300, -50)
    door.addImage(doorImg);
    climber = createSprite(300, 10);
    climber.addImage(climberImg);
    invisibleBlock = createSprite(300, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120, 400))
    climber.x = door.x;
    invisibleBlock.x = door.x;
    climber.velocityY = 2;
    invisibleBlock.velocityY = 2;
    climber.lifetime = 300;
    invisibleBlock.lifetime = 300;
    door.velocityY = 2;
    door.lifetime = 300;
    ghost.depth = door.depth;
    ghost.depth += 1;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  }

}