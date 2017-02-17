/*
Prime Group jQuery Challenge
jQuery is great! It allows us to do so many things! You and
your group will need to flex everything you know about
Javascript, jQuery, and CSS to tackle this challenge.

The Fruit Market
For this challenge, you will be working with 4 commodities;
Apples, Oranges, Bananas, and Grapes. Delicious, right?

When the application loads, you will need to have information
for each of the commodities, specifically the name and the
market price of each. This information will need to be
displayed in a meaningful way on the DOM (this is not
displayed in the wireframe below, but is a part of the
requirements).

Every 15 seconds, the prices should change however, and with
it, the listed price on the DOM. Specifically, the market
price of each of the items should fluctuate up or down 50
cents (between 1 cent and 50 cents) with each 15 second
interval. Any given fruit is not allowed to go below a cost
of 50 cents, or above the cost of 9 dollars and 99 cents.

The information displayed for each of the fruit should have
a button-like functionality where the user can interact with
each of the fruit displays.

Available to the user is a total cash and an inventory display
that shows how much of each of the fruits they have purchased.
Also in the user display, should be an average purchased price,
 which shows, on average, how much money they have spent on a
 given fruit in their inventory.

Meaning that by clicking on the display for each of the fruits,
allows the user to buy one of the fruits, at market price,
which will be deducted from the total cash. The user is not
allowed to spend more than they have.

The user will start with $100.


Hard Mode
Create a button below each of the Fruit buttons that allows the
User to ‘sell’ one of their fruits of the same type at the current
market price. This will also remove one from their inventory.
The user should be not able to sell fruits they do not already own.

Pro Mode
Limit the application experience to five minutes. At the end,
stop the price fluctuation, sell all of the fruits in their
inventory at current market price, and then display the total
money they earned from the experience.

Master Mode
Try your hand at styling everything using CSS!
*/

var fruitArray = ["Apples", "Oranges", "Bananas", "Grapes", "Kiwis"];

var startingPrice = 5.00 ; //Whole numbers = dollarz
var minSwing = 1; // Whole numbers = cents
var maxSwing = 50; // Whole numbers = cents
var minPrice = 0.50;
var maxPrice = 9.99;
var gameIntervalTime = 1000; //In milliseconds

var startingCash = 100;

var user;

function Fruit(name, price){
  this.name = name;
  this.price = price;
  this.changePrice = function(){
    var priceSwing = randomNumber(minSwing, maxSwing);
    var randomAdjustment = randomNumber(1,2);
    if(randomAdjustment == 1){
      priceSwing = -priceSwing;
    }
    priceSwing = priceSwing/100;
    this.price += priceSwing;
  };
}

function User(){
  this.startingCash = startingCash;
  this.totalCash = startingCash;
}

$(document).ready(function(){
    init();
});

function init(){
    user = new User();
    buildFruits(fruitArray);
    buildDomFruits(fruitArray); // end
    enable();
}

function enable(){
  $("#fruitContainer").on("click", ".fruit-button", clickFruit);

  setInterval(gameInterval, gameIntervalTime);
}

function disable(){
  clearInterval(gameInterval);
}

function clickFruit(){
  var fruit = $(this).data("fruit");
  var price = $(this).data("price");

  if(user.totalCash >= price){
    user["inv" + fruit].push(price);
    user.totalCash -= price;
    console.log(user);
  }

}

function gameInterval(){
  for(var i = 0; i < fruitArray.length; i++){
    fruitArray[i].changePrice();
  }
  //buildDomFruits(fruitArray);
  updateFruitDom();
}

function buildFruits(array){
  for(var i = 0; i < array.length; i++){
    var newFruit = new Fruit(array[i], startingPrice);
    array[i] = newFruit;
    newFruit.changePrice();

    user["inv" + newFruit.name] = [];
  }
  console.log(user);
}

function buildDomFruits(array){
  //$("#fruitContainer").empty();
  for(var i = 0; i < array.length; i++){
    $("#fruitContainer").append("<div class='fruit-button'></div>");
    var $el = $("#fruitContainer").children().last();
    $el.data("fruit", array[i].name);
    $el.data("price", array[i].price);
    $el.append("<p>" + array[i].name + "</p>");
    $el.append("<p class='fruit-price'>" + array[i].price + "</p>");

    array[i].element = $el;
  }
}

function updateFruitDom(){
  for(var i = 0; i < fruitArray.length; i++){
    var fruit = fruitArray[i];
    //fruit.price = fruit.price.toFixed(2);
    fruit.element.find(".fruit-price").text(fruit.price);
    fruit.element.data("price", fruit.price);
  }
}

function randomNumber(min, max){
   return Math.floor(Math.random() * (1 + max - min) + min);
}
