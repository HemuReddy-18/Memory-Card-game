const cardsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let flippedCards = [];
let matchedCards = [];

// Function to shuffle the cards array
function shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Function to create the game board and cards
function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; 

    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-value', card);
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

// Function to flip the card
function flipCard() {
    const card = this;
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !flippedCards.includes(card) && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        card.textContent = card.getAttribute('data-value');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Function to check if the two flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        // Visual feedback for matched cards
        card1.classList.add('matched');
        card2.classList.add('matched');

        if (matchedCards.length === cardsArray.length) {
            let won = document.getElementById('won');
            won.innerHTML = 'You Won!';
            setTimeout(() => { startGame(); }, 2000);  // Restart the game after 2 seconds
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
    }
}

// Function to start the game
function startGame() {
    matchedCards = [];
    flippedCards = [];
    // Hide the "You Won!" message when restarting
    let won = document.getElementById('won');
    won.innerHTML = '';  // Clear the "You Won!" message
    
    shuffle(cardsArray);
    createBoard();
}

// Adding event listener to restart button
document.getElementById('restart-btn').addEventListener('click', startGame);

// Initialize the game
startGame();
