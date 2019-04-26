const cardsList = Array.from(document.getElementsByClassName('card'));

const refresh = document.querySelector('.restart');

let newList = document.createElement('ul');

let newRatingList = document.createElement('ul');

const container = document.querySelector('.deck-container');

const deck = document.querySelector('.deck');

let opened = [];

const moves = document.querySelector('.moves');

const ratingOne = document.querySelector('.rating.first');

const ratingTwo = document.querySelector('.rating.second');

let ratingArray = [];


let count = 0;

// function to reset the game
function reset(array){
    for (card of cardsList){
        card.className = 'card';
    }
    let currentDeck = document.querySelector('.deck');
    currentDeck.remove();
    newList.setAttribute('class', 'deck');
    let shuffledCards = shuffle(array); //shuffles new deck of cards
    for (const card of shuffledCards) {
        newList.appendChild(card);
    }
    container.appendChild(newList);
    count = 0; //resets the move counter
    moves.innerHTML = count; //changes move counter back to 0
    ratingOne.className = 'rating first'; //resets the star rating
    ratingTwo.className = 'rating second';
    seconds.innerHTML = 0; //changes timer back to 0
    time = 0; //resets the time
    modal.style.display = 'none'; //hides the modal display
    cardMatchCount = 0; //resets card match tracker
    starCount = 3; //resets star rating tracker
    clearInterval(gameTimer); //clears the 1 second interval on the timer function
    gameTimer = setInterval(timer, 1000); //adds the 1 second interval back to the timer function
}

//timer function
let time = 0;
let gameTimer = setInterval(timer, 1000);

function timer() {
    time++;
    seconds.innerHTML = time
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//function that opens cards
function cardOpen(){
    if (event.target.className === 'card'){ //prevents anything except for unturned cards to be clicked
        event.target.className = 'card open';
        opened.push(event.target); //pushed card to 'opened' array
        count ++; //increases move counter for every click
        moves.innerHTML = count; //updates move counter
        gameRating(count); //updates star rating based on amount of moves
    }
    if (opened.length === 2){ //if statement to execute match function if 'opened' array has two cards
        container.removeEventListener('click', cardOpen); //prevents additional cards from being opened
        isCardEqual(opened);
    }
}

container.addEventListener('click', cardOpen);

let cardMatchCount = 0;
const modal = document.querySelector('.modal');

//function to check if cards match
function isCardEqual(opened){
    if (opened[0].innerHTML == opened[1].innerHTML){
        opened[0].className = 'card match';
        opened[1].className = 'card match';
        opened.length = 0; //resets 'opened' array to empty
        cardMatchCount ++; //update card match tracker
        if (cardMatchCount === 8){ //if statement used to display victory modal at end of game
            modal.style.display = 'block';
            document.querySelector('.time').innerHTML = time;
            document.querySelector('.star-count').innerHTML = starCount;
            clearInterval(gameTimer); //stop the timer once victory condition is met
            if (starCount === 1){
                document.querySelector('.singular-or-plural').innerHTML = 'star';
            }else{
                document.querySelector('.singular-or-plural').innerHTML = 'stars';
            }
        }
        if (opened.length === 0){ //if statement to add event listener back to 'click'
            container.addEventListener('click', cardOpen);
        }
    }else{ //timeout to prevent additional actions when two cards do not match
        opened[0].className = 'card nomatch';
        opened[1].className = 'card nomatch';
        setTimeout(function(){cardsNoMatch(opened)}, 1000);
    }
}

//function that hides cards and resets 'opened' array when cards do not match
function cardsNoMatch(opened){
    opened[0].className = 'card';
    opened[1].className = 'card';
    opened.length = 0;
    if (opened.length === 0){
        container.addEventListener('click', cardOpen);
    }
}

//keeps track of star count to print on victory modal
let starCount = 3;

//function that hides stars based on number of moves performed
function gameRating(count){
    if (count === 29){
        starCount --;
        document.querySelector('.rating.second').className = 'rating second hidden';
    }else if (count === 39){
        starCount --;
        document.querySelector('.rating.first').className = 'rating first hidden';
    }
}



