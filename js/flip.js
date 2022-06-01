// Access DOM
let frontCard = document.getElementById('front-card');
let backCard = document.getElementById('back-card');
let deckList = document.getElementById('deck-list');
let loadDeck = document.getElementById('load-deck');
let flipCard = document.querySelector('.flip-card-inner');

//access local storage
let retrievedKeys = localStorage.getItem('keys');
// console.log(retrievedKeys[0]);
let parsedKeys = JSON.parse(retrievedKeys);
console.log(parsedKeys);
let retrievedDecks = [];

if(retrievedKeys){
  for(let i=0;i<parsedKeys.length;i++){
    retrievedDecks.push(JSON.parse(localStorage.getItem(parsedKeys[i])));
  }
  console.log(retrievedDecks);
} 

// Create Deck List
for(let i = 0; i < parsedKeys.length; i++){
  let liElement = document.createElement('li');
  liElement.textContent = parsedKeys[i];
  deckList.appendChild(liElement);
}


// Event Handlers

let cardCounter = 0;
let currentDeck = 0;

let buttons = document.getElementById('button-bar');

function handleClick(e){
  let max = retrievedDecks[currentDeck].length - 1;
  let min = 0;
console.log(cardCounter);
    // display index
    frontCard.textContent = retrievedDecks[currentDeck][cardCounter].front;
    backCard.textContent = retrievedDecks[currentDeck][cardCounter].back;

  if (e.target.value == 'right-arrow'){
    cardCounter++;
  } else if (e.target.value == 'left-arrow') {
    cardCounter--;
  }

  if (cardCounter > max){
    cardCounter = min;
    console.log('max');
  }
  
  if (cardCounter < min){
    cardCounter = max;
    console.log('min');
  }
}

function handleSubmit(e){
  e.preventDefault();

  for (let i = 0; i < parsedKeys.length; i++){
    if (e.target.name.value == parsedKeys[i]){
      frontCard.textContent = retrievedDecks[i][0].front;
      backCard.textContent = retrievedDecks[i][0].back;
      currentDeck = i;
    }
  }
}

function handleToggle() {
  flipCard.classList.toggle('is-flipped');
}

// Event Listeners
buttons.addEventListener('click', handleClick);
loadDeck.addEventListener('submit', handleSubmit);
flipCard.addEventListener('click', handleToggle)