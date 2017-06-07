function Miaurenz(images, goal, experience){
  
  this.images = images;
  this.feeling = "HAPPY";
  this.pos = new p5.Vector(width/2, height/2);
  this.actIMG = this.images[0];
  this.speed = 1;
   this.stepSize = this.speed*width/1000;
  this.currentGoal = goal;
  this.goalVector = new p5.Vector(this.currentGoal.pos.x - this.pos.x, this.currentGoal.pos.y - this.pos.y);
  this.distanceToGoal = mag(this.goalVector.x, this.goalVector.y);
  this.activityInProgress = false;
  
  this.happynessLvL = experience.happynessLvL;
  this.hungerLvL = experience.hungerLvL;
  this.travelDist = experience.travelDist;
  //this.experience = {this.happynessLvL, this.hungerLvL, this.travelDist};
  
  
  this.show = function(){
    
    this.showDistanceToGoal();
    this.showTravelDistance();
    
    imageMode(CENTER);
    if(this.goalVector.heading() <= -PI / 2 || this.goalVector.heading() >= PI / 2){
    push();
    image(this.actIMG, this.pos.x, this.pos.y, this.actIMG.width/10, this.actIMG.height/10);
    pop();
    
    }else{
      
    push();
       translate(this.pos.x, this.pos.y);
       scale(-1, 1);
       translate(-this.pos.x, -this.pos.y);
       image(this.actIMG, this.pos.x, this.pos.y, this.actIMG.width/10, this.actIMG.height/10);
    pop();
    }
       imageMode(CORNER);
       
       
  }
  
  this.move = function(){
    
    this.updateGoals(this.currentGoal);
    this.updateStepsize();
    
    if(this.distanceToGoal > this.stepSize){
    this.pos.x +=  this.stepSize * this.goalVector.x/this.distanceToGoal;
    this.pos.y += this.stepSize * this.goalVector.y/this.distanceToGoal;
    this.travelDist += dist(0,0,this.stepSize * this.goalVector.x/this.distanceToGoal,this.stepSize * this.goalVector.y/this.distanceToGoal);
      
    }else{
      //this.travelDist += mag(this.currentGoal.pos-this.pos);
      this.pos = this.currentGoal.pos;
       
      
      if(!this.activityInProgress && this.currentGoal.label != "Idle"){
        this.currentGoal.label = "Idle";
      }
    }
  }
  
  this.updateGoals = function(){
    
    if(this.currentGoal !== null){
    this.goalVector = createVector(this.currentGoal.pos.x - this.pos.x, this.currentGoal.pos.y - this.pos.y);
    this.distanceToGoal = mag(this.goalVector.x, this.goalVector.y);
    
    }else{
      print("invalid Goal");
    }
  }
  
  this.updateStepsize = function(){
    this.stepSize = this.speed*width/1000;
  }
  
  this.showDistanceToGoal = function(){
    
    push();
    stroke(0,255-constrain(this.distanceToGoal,0,255),0);
    strokeWeight(2);
    line(this.pos.x,this.pos.y,this.currentGoal.pos.x,this.currentGoal.pos.y);
    pop();
  }
  
  this.showTravelDistance = function(){
    
    push();
    textSize(20);
    text(floor(this.travelDist), this.pos.x, this.pos.y-25);
    pop();
    
  }
  
}