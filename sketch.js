var dog1,dog2;
var database,foodS,foodStock;
var feed,addFood;
var feedTime,LastFed;
var foodObj,milk;

function preload()
{
  dog1 = loadImage("images/dog1.png");
  dog2 = loadImage("images/dog2.png");
}

function setup() {
  createCanvas(600, 500);
  database = firebase.database();

  dog = createSprite(300,250,20,20);
  dog.addImage(dog1);
  dog.scale = .2

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("feed the Dog");
  feed.position(500,145);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700,145);
  addFood.mousePressed(addFoods);

  milk = new food();
}


function draw() {  

  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
  }
  milk.display();

  fill ("black");
  textSize(30);
  text("Food Remaining : " + foodS,150,400);

  drawSprites();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x<=0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}

function feedDog(){
  dog.addImage(dog2);

  foodObj.updateFoodStock (foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}