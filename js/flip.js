// Access DOM
let frontCard = document.getElementById('front-card');
let backCard = document.getElementById('back-card');
let deckList = document.getElementById('deck-list');
let loadDeck = document.getElementById('load-deck');
let flipCard = document.querySelector('.flip-card-inner');
let buttons = document.getElementById('button-bar');
let deckTitle = document.getElementById('deck-title');
let tracker = document.getElementById('tracker');


//access local storage
let retrievedKeys = localStorage.getItem('keys');
let parsedKeys = JSON.parse(retrievedKeys);
let retrievedDecks = [];

if(retrievedKeys){
  for(let i=0;i<parsedKeys.length;i++){
    retrievedDecks.push(JSON.parse(localStorage.getItem(parsedKeys[i])));
  }
}

//Card tracker function - displays which card in the deck you are viewing
function cardTracker(){
  tracker.textContent = `${cardCounter+1}/${max+1}`;
}

// Create Deck List
for(let i = 0; i < parsedKeys.length; i++){
  let liElement = document.createElement('li');
  // liElement.textContent = parsedKeys[i];
  liElement.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${parsedKeys[i]}`;
  deckList.appendChild(liElement);
}
// liElement.setAttribute('id', 'li-style');

// Event Handlers
let cardCounter = 0;
let currentDeck = 0;

let max = retrievedDecks[currentDeck].length - 1;
let min = 0;
console.log(max);

function handleClick(e) {
  if (e.target.value === 'right-arrow' || e.target.id === 'right-arrow-icon') {
    cardCounter++;
  } else if (e.target.value === 'left-arrow' || e.target.id === 'left-arrow-icon') {
    cardCounter--;
  }

  if (cardCounter > max) {
    cardCounter = min;
  }
  if (cardCounter < min) {
    cardCounter = max;
  }
  // display index
  frontCard.textContent = retrievedDecks[currentDeck][cardCounter].front;
  backCard.textContent = retrievedDecks[currentDeck][cardCounter].back;
  //update card tracker
  cardTracker();
}

function handleSubmit(e) {
  e.preventDefault();

  for (let i = 0; i < parsedKeys.length; i++){
    if (e.target.name.value.toLowerCase() === parsedKeys[i].toLowerCase()){
      frontCard.textContent = retrievedDecks[i][0].front;
      backCard.textContent = retrievedDecks[i][0].back;
      currentDeck = i;
      //rename headed based on selected deck
      deckTitle.textContent = e.target.name.value;
      //update card tracker
      cardTracker();
    }
  }
}

function handleToggle() {
  flipCard.classList.toggle('is-flipped');
}

// Event Listeners
buttons.addEventListener('click', handleClick);
loadDeck.addEventListener('submit', handleSubmit);
flipCard.addEventListener('click', handleToggle);
