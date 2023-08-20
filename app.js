//accessing all the elements in page
let body = document.querySelector('body');
let h3 = document.querySelector('h3');
let boxOne = document.querySelector('#one');
let boxTwo = document.querySelector('#two');
let boxThree = document.querySelector('#three');
let boxFour = document.querySelector('#four');
let boxColors = [
    "rgb(188, 13, 70)",
    "rgb(27, 195, 141)",
    "rgb(6, 168, 235)",
    "rgb(254, 173, 119)"
]

//storing game level in a variable
let level = 1;

//storing the box buttons in array
const buttons = [boxOne, boxTwo, boxThree, boxFour];

//squence
let gameSequence = [];
let userSequence = [];

//game status
let gameStatus = false;

//random box selector (index)
function randomButton() {
    return boxIndex = Math.floor(Math.random()*4);
}

//adding functionality to start the game
body.addEventListener("keydown", function (event) {
    if(gameStatus==false) {
        gameStatus = true;
        h3.innerText = `level ${level}`
        randomButton()
        // console.log(boxIndex)
        setTimeout(() => {
            buttons[boxIndex].style.backgroundColor = "rgb(255,255,255)"
            setTimeout(function () {
                buttons[boxIndex].style.backgroundColor = boxColors[boxIndex];
        }, 50)
        }, 1500);
        gameSequence.push(boxIndex)
        // console.log(gameSequence)
    }
})

let i;
let statusGame = "gameOver"
function checker() {
    for(i=0 ; i<=userSequence.length-1 ; i++){
        if (userSequence[i]!=gameSequence[i]) {
            return statusGame = "gameOver";
        }
        // else if (i<gameSequence.length-1) {
        //     return statusGame = "onGoing";
        // }
        else if (userSequence[i]==gameSequence[gameSequence.length-1] && userSequence.length==gameSequence.length) {
            return statusGame = "correct";
        }
        else if (userSequence.length-1>gameSequence.length-1) {
            return statusGame = "gameOver"
        }
    }
}


//user input for game
for(button of buttons) {
    button.addEventListener("click", function (event) {
        let ansIndex = buttons.indexOf(event.target)
        // console.dir(ansIndex)
        userSequence.push(ansIndex);

        console.log(gameSequence)
        console.log(userSequence)

        checker()
        console.log(statusGame)
        // checking if the answer is correct and continuing
        if(statusGame=="correct") {
            h3.innerText = `level ${level}`
            randomButton()
            setTimeout(() => {
                buttons[boxIndex].style.backgroundColor = "rgb(255,255,255)"
                setTimeout(function () {
                    buttons[boxIndex].style.backgroundColor = boxColors[boxIndex];
            }, 50)
            }, 1500);
            level = level + 1;
            h3.innerText = `level ${level}`
            gameSequence.push(boxIndex);
            userSequence = [];
            statusGame = "onGoing";
        } else if (statusGame=="gameOver"){
            h3.innerHTML = `<i>Game Over!</i><br>Your score is ${level}<br>Press any key to play again`
            gameSequence = [];
            userSequence = [];
            level = 1
            gameStatus = false
        }
    })
}
