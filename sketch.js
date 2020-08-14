  var dog1,dog2;
  var database,foodS,foodStock;
  var feed,addFood;
  var feedTime,LastFed;
  var foodobject;

  function preload()
  {
    dog1 = loadImage("images/dog1.png");
    dog2 = loadImage("images/dog2.png");
  }

  function setup() {
    createCanvas(700, 400);
    database = firebase.database();

    dog = createSprite(500,250,20,20);
    dog.addImage(dog1);
    dog.scale = 0.2

    foodStock = database.ref('Food');
    foodStock.on("value",readStock);

    feed = createButton("Feed the Dog");
    feed.position(550,130);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food ");
    addFood.position(750,130);
    addFood.mousePressed(addFoods);

    foodobject = new food();
  }


  function draw() {  
    background(46, 139, 87);
    foodobject.display();
    
    fedTime = database.ref('FeedTime');
    fedTime.on("value",function(data){
      LastFed = data.val();
    });
    
    fill("blue");
    textSize(30);
    if(LastFed >= 12){
      text("LastFed : " + LastFed % 12 + " PM" ,250,50);
    }else if(LastFed === 0){
      text("LastFed : 12 PM" ,250,50);
    }else{
      text("LastFed : " + LastFed  + " AM" ,250,50);
    }
    
    drawSprites();
  }

  function readStock(data){
    foodS = data.val();
    foodobject.updateFoodStock(foodS);
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

    foodobject.updateFoodStock (foodobject.getFoodStock()-1);
    database.ref('/').update({
      Food:foodobject.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    foodS++
    database.ref('/').update({
      Food : foodS
    })
  }