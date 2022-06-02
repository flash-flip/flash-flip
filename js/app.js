'use strict';

//declare global variables
let newDeck = [];
let keys = [];

//access DOM
let cardForm = document.getElementById('card-form');
let deckName = document.getElementById('deck-name');

//access local storage
let retrievedKeys = localStorage.getItem('keys');
console.log(retrievedKeys);
let parsedKeys = JSON.parse(retrievedKeys);
console.log(parsedKeys);
let retrievedDecks = [];

if(retrievedKeys){
  for(let i=0;i< parsedKeys.length;i++){
    retrievedDecks.push(JSON.parse(localStorage.getItem(parsedKeys[i])));
    keys.push(parsedKeys[i]);
  }
  console.log(retrievedDecks);
} 

//constructor function - make new deck
function Card(front,back){
  this.front = front;
  this.back = back;

  newDeck.push(this);
}

function handleAddCard(event){
  event.preventDefault();

  new Card(event.target.front.value, event.target.back.value);
  cardForm.reset();
}

function handleDeckName(event){
  event.preventDefault();

  let stringifiedDeck = JSON.stringify(newDeck);
  localStorage.setItem(event.target.title.value,stringifiedDeck);
  newDeck = [];
  keys.push(event.target.title.value);
  let stringifiedKeys = JSON.stringify(keys);
  localStorage.setItem('keys',stringifiedKeys);
  deckName.reset();
}

cardForm.addEventListener('submit',handleAddCard);
deckName.addEventListener('submit',handleDeckName);

//let button1 = document.getElementById("light");

//button1.addEventListener("click", function(){
  //document.body.classList.toggle("light-mode");
  //localStorage.setItem("light-mode");
//})

let backgroundMode = 0;

  document.getElementsByTagName('button')[0].onclick=function() {
    if (backgroundMode == 0) {
      document.getElementById('day-night').style.backgroundColor='#ffffff';
      localStorage.bgcolor = '#ffffff';
      backgroundMode = 1;
      document.getElementById('change-background').innerHTML='Day Mode';
    } else {
      document.getElementById('day-night').style.backgroundColor='#09092d';
      localStorage.bgcolor = '#09092d';
      backgroundMode = 0;
      document.getElementById('change-background').innerHTML='Night Mode';
    }
  }

  //load the bgColor on page load:
  document.getElementById('day-night').style.backgroundColor=localStorage.bgcolor || '#ffffff'

