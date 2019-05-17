const numDisplayed = document.getElementsByClassName("number")
const suitDisplayed = document.getElementsByClassName("suit")
const higher = document.getElementById("higher")
const lower = document.getElementById("lower")
const currentState = document.getElementsByClassName("state")
const restart = document.getElementById("restart")
const player = document.getElementById("player")
let cards = {
    currentPlayer: 0,
    currentCard: [0, 0],
    nextCard: [0, 0]
}

const generateDeck = () => {
    // Function to generate a new deck of cards
    // Puts the deck key in the cards object to the deck generated

    // Generates an array of the form [0, 1, ... , n-1]
    let array = [...Array(13).keys()]

    // Adds 1 to each digit so array is of the form [1, 2, ... , n]
    array = array.map(function (value) {
        return value + 1;
    })

    // Reset cards.deck to have no values in it
    cards.deck = []
    // For every number in a deck
    for (num of array) {
        // For every suit in a deck
        for (suit of ['Spade', 'Heart', 'Club', 'Diamond']) {
            // Add a card to cards.deck
            cards.deck.push([num, suit])
        }

    }
}

const pickNewCard = () => {
    // Function to pick a new random card out of the deck

    // Pick a random number within the length of the list
    let random = Math.floor(Math.random() * cards.deck.length)

    // Remove the random number from the deck
    // Then set the removed card as the next card
    cards.nextCard[cards.currentPlayer] = cards.deck.splice(random, 1)[0]
}

const checkIfCorrect = (card1, card2, direction) => {
    // Takes two cards and checks if the direction the user picked is correct
    if (card1[0] < card2[0] && direction == 'higher') {
        return true
    } else if (card1[0] > card2[0] && direction == 'lower') {
        return true
    } else {
        return false
    }
}

const nextPlayer = () => {
    cards.currentPlayer = (cards.currentPlayer + 1) % 2
    player.innerHTML = `It's now player ${cards.currentPlayer}s go`
}

const resetGame = () => {
    // Generates new deck
    generateDeck()

    // Picks a new card and sets next card equal to the one coming out
    pickNewCard()
    displayNewCard()
    nextPlayer()

    pickNewCard()
    displayNewCard()
    nextPlayer()

    player.innerHTML = "It's player 0s go"
}

const displayNewCard = () => {
    // Makes the next card the current card
    cards.currentCard[cards.currentPlayer] = cards.nextCard[cards.currentPlayer]
    numDisplayed[cards.currentPlayer].innerHTML = cards.currentCard[cards.currentPlayer][0]
    suitDisplayed[cards.currentPlayer].innerHTML = cards.currentCard[cards.currentPlayer][1]
}

higher.addEventListener('click', () => {
    pickNewCard()
    console.log(cards.currentCard[cards.currentPlayer], cards.nextCard[cards.currentPlayer], 'higher')
    if (checkIfCorrect(cards.currentCard[cards.currentPlayer], cards.nextCard[cards.currentPlayer], 'higher')) {
        displayNewCard()
    } else {
        currentState[cards.currentPlayer].innerHTML = `Haha, you suck! Next card was ${cards.nextCard[cards.currentPlayer][0]} of ${cards.nextCard[cards.currentPlayer][1]}s`
    }
    nextPlayer()
});

lower.addEventListener('click', () => {
    pickNewCard()
    console.log(cards.currentCard[cards.currentPlayer], cards.nextCard[cards.currentPlayer], 'lower')
    if (checkIfCorrect(cards.currentCard[cards.currentPlayer], cards.nextCard[cards.currentPlayer], 'lower')) {
        displayNewCard()
    } else {
        currentState[cards.currentPlayer].innerHTML = `Haha, you suck! Next card was ${cards.nextCard[cards.currentPlayer][0]} of ${cards.nextCard[cards.currentPlayer][1]}s`
    }
    nextPlayer()
});


restart.addEventListener('click', () => {
    resetGame()
    for (idx of currentState) {
        idx.innerHTML = "Well done, you've not lost yet"
    }
})