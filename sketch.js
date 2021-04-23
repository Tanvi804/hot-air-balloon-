var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  var balloonPosition=database.ref('balloon/position')
  balloonPosition.on("value",readposition,showError)

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI

function writePosition(x,y){
  database.ref('balloon/position').set({x:position.x + x , y:position.y + y})
}

function readposition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
  }

  function showError(){
console.log("error in writing to the database");
  }


function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    writePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale
    
  }
  else if(keyDown(RIGHT_ARROW)){
    writePosition(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale
    
  }
  else if(keyDown(UP_ARROW)){
    writePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.01
    
  }
  else if(keyDown(DOWN_ARROW)){
    writePosition(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale-0.01
  
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
