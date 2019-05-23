const numDisplayed = document.getElementsByClassName("number")
const suitDisplayed = document.getElementsByClassName("suit")
const higher = document.getElementById("higher")
const lower = document.getElementById("lower")
const currentState = document.getElementsByClassName("state")
const playerNum = document.getElementsByClassName("playerNum")
const restart = document.getElementById("restart")
const player = document.getElementById("player")
const winner = document.getElementById("winner")

for (i=0; i<playerNum.length; i++) {
    playerNum[i].innerHTML = `Player ${i}`
}

let cards = {
    players: currentState.length,
    currentPlayer: 0,
    currentCard: Array(currentState.length),
    nextCard: Array(currentState.length),
    stillIn: Array(currentState.length).fill(true)
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

    if (cards.deck.length === 0) {
        cards.deck = generateDeck()
    }
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
    // Function to find the next player based on who is left in the game

    // Pick the next player
    cards.currentPlayer = (cards.currentPlayer + 1) % cards.players

    // If the player isn't in the game anymore skip over them
    while (!cards.stillIn[cards.currentPlayer]) {
        cards.currentPlayer = (cards.currentPlayer + 1) % cards.players
    }
    // State which player is having a go
    player.innerHTML = `It's now player ${cards.currentPlayer}s go`
}

const checkWinner = () => {
    // Checks how many people are left in the game. If these's only one it's a win
    // for that player. Returns the winner if there is one, otherwise returns false.

    // Make an empty array of potential winners
    winners = []

    // Loops through all possible players
    for (i=0; i<cards.players; i++) {
        // If the player is still in they get added to the list orf potential
        // winners
        if (cards.stillIn[i]) {
            winners.push(i)
        }
    }
    //console.log(winners)

    // Check if there's only one player still in
    if (winners.length === 1) {
        // Return the winner
        return winners[0]
    } else {
        // Return false showing there is no winner
        return false
    }
}

const winCondition = () => {
    // Function to update the game if there is a winner

    // Check if there is a winner
    theWinner = checkWinner()

    // If there is a winner let the players know and update the board
    if (theWinner) {
        // Say a player has won
        winner.innerHTML = `Player ${theWinner} has won!`
        // Reset the game
        resetGame()
        // Put the current state of all players to Press restart
        for (idx of currentState) {
            idx.innerHTML = "Press restart"
        }
    }
}

const resetGame = () => {
    // Function to start a new game. It will generate a new deck of cards,
    // then pick a start card for every player

    // Generates new deck
    generateDeck()

    // Picks a new card and sets next card equal to the one coming out
    for (i = 0; i < cards.players; i++) {
        pickNewCard()
        displayNewCard()
        currentState[i].innerHTML = "Well done, you've not lost yet"
        nextPlayer()
    }

    cards.stillIn = Array(currentState.length).fill(true)
    player.innerHTML = "It's player 0s go"
}

const displayNewCard = () => {
    // All the processes needed to show the next card. This will set the value of 
    // current card equal to the next card then display this new card

    // Makes the next card the current card
    cards.currentCard[cards.currentPlayer] = cards.nextCard[cards.currentPlayer]

    // Display the correct number
    numDisplayed[cards.currentPlayer].innerHTML = cards.currentCard[cards.currentPlayer][0]

    //Display the correct suit
    suitDisplayed[cards.currentPlayer].innerHTML = cards.currentCard[cards.currentPlayer][1]
}

higher.addEventListener('click', () => {
    // Event listener for the higher button. This will look at what the next card
    // will be, if it's higher it will display the card, if it's not it'll troll
    // the player. It will then go onto the next player.

    // See what the next card will be
    pickNewCard()

    // Compare the cards and check if the next is higher
    if (checkIfCorrect(cards.currentCard[cards.currentPlayer],
                        cards.nextCard[cards.currentPlayer],
                        'higher')) {
        // If correct show the next card
        displayNewCard()
    } else {
        // Remove the player from the game
        cards.stillIn[cards.currentPlayer] = false;
        // Tell the player they suck
        currentState[cards.currentPlayer].innerHTML = `Haha, you suck! Next card was ${cards.nextCard[cards.currentPlayer][0]} of ${cards.nextCard[cards.currentPlayer][1]}s`
    }

    // Check if there's a winner and implement win condition if there is
    winCondition();
    // Move onto the next player
    nextPlayer();
});

lower.addEventListener('click', () => {
    // Event listener for the lower button. This will look at what the next card
    // will be, if it's lower it will display the card, if it's not it'll troll
    // the player. It will then go onto the next player.

    pickNewCard()
    if (checkIfCorrect(cards.currentCard[cards.currentPlayer],
                        cards.nextCard[cards.currentPlayer],
                        'lower')) {
        // If correct show the next card
        displayNewCard()
    } else {
        // Remove the player from the game
        cards.stillIn[cards.currentPlayer] = false;
        // Tell the player they suck
        currentState[cards.currentPlayer].innerHTML = `Haha, you suck! Next card was ${cards.nextCard[cards.currentPlayer][0]} of ${cards.nextCard[cards.currentPlayer][1]}s`
    }

    // Check if there's a winner and implement win condition if there is
    winCondition();
    // Move onto the next player
    nextPlayer()
});


restart.addEventListener('click', () => {
    // Event listener for reset button. When pressed will run reset function
    // then put the state for each player to a state where they haven't lost yet.

    resetGame()
    // Remove the 'winner' token at the top
    winner.innerHTML = ""
})