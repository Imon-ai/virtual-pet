var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var hour;

//create feed and lastFed variable here
var feedButton,lastFed,lastF,lastFedAM;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedButton = createButton("Feed The Dog");
  feedButton.position(680,95);
  feedButton.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastFedAM = lastFed-12;

  //write code to read fedtime value from the database 
  lastF = database.ref('feedtime');
  lastF.on("value",read_feedTime);
 
  //write code to display text lastFed time here
  fill("white");
  if(lastFed<=12&&lastFed>=0){
    text("Last Feed : "+ lastFed  +" AM",200,35);
  }else if(lastFed===12){
    text("Last Feed : 12 PM",200,35);
  }else{
   text("Last Feed : "+ lastFed % 12+" PM",200,35);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function read_feedTime(data){
  
   lastFed=data.val();
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS = foodS-1;
  database.ref('/').update({
    Food:foodS 
  })

  foodObj.getFedTime(lastFed);

  database.ref('/').update({
    feedtime:hour()
  })

  

  database.ref('/').update({
    feedtime:lastFed
  }) 
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

