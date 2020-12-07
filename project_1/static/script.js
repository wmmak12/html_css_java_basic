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

