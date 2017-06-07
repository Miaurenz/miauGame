miaurenzIMGs = [];
var imgWidth;
var imgHeight;
var miaurenz;
var saveFileURL = "https://github.com/Miaurenz/miauGame/blob/master/Miaurenz/miaurenz.json";
experience = {};

function preload(){
  
  floorIMG = loadImage("images/floor.png");
  miaurenzStandardIMG = loadImage("images/miaurenz_standard.png");
  experience = loadJSON(saveFileURL);
 
}

function setup() {
  //frameRate(1);
  createCanvas(600,400);
  
  miaurenzIMGs.push(miaurenzStandardIMG);
  
  createMiaurenz(experience);
  
  imgWidth = miaurenzStandardIMG.width/10;
  imgHeight = miaurenzStandardIMG.height/10;
  
  button = createButton('save');
  button.position(width/6, height/8);
  button.mousePressed(saveGame);
  
  button = createButton('load');
  button.position(width/3, height/8);
  button.mousePressed(loadFile);

}

function draw() {
  
  background(floorIMG);
  
  if(miaurenz.currentGoal.label == "Idle"){
    
  idleWalking();
  
  }else{
    
  miaurenz.move();
  miaurenz.show();
  
  }
}

function keyPressed(){
  
  var goal = new Goal("TEST", createVector(mouseX,mouseY));
  miaurenz.currentGoal = goal;
  miaurenz.speed = 5;
  
}

function idleWalking(){
  
  if(miaurenz.pos == miaurenz.currentGoal.pos){
  miaurenz.currentGoal = new Goal("IDLE", createVector(random(imgWidth/2,width-imgWidth/2), random(imgHeight/2,height-imgHeight/2)));
  miaurenz.speed = random(0.5, 2.5);
  
  }
  
  miaurenz.move();
  miaurenz.show();
}

function loadFile(){
  
  experience = loadJSON(saveFileURL, createMiaurenz);
  
}

function saveGame(){
  
  experience.travelDist = miaurenz.travelDist;
  save(experience, saveFileURL);
}

function createMiaurenz(experience){
  if(!experience.travelDist){
    experience.travelDist = 0;
    experience.happynessLvL = 1;
    experience.hungerLvL = 1;
    
    print("loaded Default");
  }else{
    print("loaded saveFile");
  }
    miaurenz = new Miaurenz(miaurenzIMGs, new Goal("DEFAULT", createVector(width/2,height/2)), experience);
}
