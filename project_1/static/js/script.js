// Challenge 1: Calculate your age in days
function clickMe() {
    var birthYear = prompt("What year were you born?")
    var ageInDayss = (2020 - birthYear) * 365
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode("You are " + ageInDayss + " days")
    h1.setAttribute('id', 'ageInDayss')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-results').appendChild(h1)
}

function reset() {
    document.getElementById('ageInDayss').remove()
}

// Challenge 2: Generate Cat gifs
function generateCat() {
    var image = document.createElement('img')
    var div = document.getElementById('flex-cat-gen')
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image)
}

// Challenge 3: Rock, Paper Scissor
function rpsGame(yourChoice) {
    console.log(yourChoice)
    var humanChoice, botChoice
    humanChoice = yourChoice.id  // e.g. rock paper or scissor
    botChoice = numberToChoice(randToRpsInt()) // e.g. rock paper or scissor
    result = decideWinner(humanChoice, botChoice)
    message = finalMessage(result)
    rpsFrontEnd(humanChoice, botChoice, message)
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissor'][number]
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissor': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissor': 0, 'rock': 1, 'paper': 0.5},
        'scissor': {'scissor': 0.5, 'rock': 0, 'paper': 1}
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice]
    var computerScore = rpsDatabase[computerChoice][yourChoice]
    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost', 'color': 'red'}
    } else if (yourScore === 0.5) {
        return {'message': 'You tied', 'color': 'yellow'}
    } else {
        return {'message': 'You Won', 'color': 'green'}
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }

    //Lets remove all the images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    // Recreate back results
    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var messageDiv = document.createElement('div')

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' width='150px' height='150px' style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding:30px'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' width='150px' height='150px' style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>"

    document.getElementById('flex-box-rps-id').appendChild(humanDiv)
    document.getElementById('flex-box-rps-id').appendChild(messageDiv)
    document.getElementById('flex-box-rps-id').appendChild(botDiv)
}


// Challenge 4: Change the Color of all buttons
var all_buttons = document.getElementsByTagName('button');

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1])
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green') {
        buttonsGreen();
    } else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-danger')
    }
}

function buttonsGreen() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonColorReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning']
    for (let i = 0; i < all_buttons.length; i++) {
        let randomNum = Math.floor(Math.random() * 4)
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomNum])
    }
}


// Challenge 5 How Blackjack works
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7':7, '8': 8, '9':9, '10': 10,
        'J': 10, 'Q':10, 'K': 10, 'A': [1, 10]
    },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a')
const winSound = new Audio('static/sounds/cash.mp3')
const lossSound = new Audio('static/sounds/aww.mp3')

//this is a better way than getelement. dont have to put onclick anymore
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal)

function blackjackHit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard()
        showCard(YOU, card)
        updateScore(card, YOU)
        showScore(YOU)
    }
}

function randomCard() {
    let randNum = Math.floor(Math.random() * 13)
    return blackjackGame['cards'][randNum]
}

function showCard(activePlayer, card) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img')
        cardImage.src = `static/images/${card}.png`
        cardImage.height = 100
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }   
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false

        let yourImages = document.querySelector('#your-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
    
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove()
        }
    
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove()
        }
    
        YOU['score'] = 0
        DEALER['score'] = 0
    
        document.querySelector('#your-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').textContent = 0
        document.querySelector('#blackjack-result').textContent = "Let's Play"
    
        document.querySelector('#your-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'
        document.querySelector('#blackjack-result').style.color = "black"

        blackjackGame['turnsOver'] = false
    }
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        // If adding 11 keeps me below 21, add 11. Otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card]
    }   
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }   
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function dealerLogic() {
    blackjackGame['isStand'] = true

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);
        sleep(1000);
    }
    if (DEALER['score'] >  15) {
        blackjackGame['turnsOver'] = true
        let winner = computeWinner()
        showResult(winner)
    }
}

// Compute winner and return who just won and update the wins, draws, and losses
function computeWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        // condition: higher score than dealer or when dealer burst
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            blackjackGame['wins'] ++
            winner = YOU
        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses'] ++
            winner = DEALER
        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws'] ++
        }

    // condition: when you burst but dealer doesnt
    } else if (YOU['score'] > 21 && DEALER['score'] <=21) {
        blackjackGame['losses'] ++
        winner = DEALER

    // condition: when you and dealer burst
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws'] ++
    }
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins']
            message = 'You won!'
            messageColor = 'green'
            winSound.play()
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses']
            message = 'You lost!'
            messageColor = 'red'
            lossSound.play()
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws']
            message = 'You drew!'
            messageColor = 'black'
        }
    
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
    }
}

