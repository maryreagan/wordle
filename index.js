
import wordleWords from "./answers.js"
const rows = document.getElementsByClassName("idv-guess")
const letterBoxes = document.querySelectorAll(".one-letter")
const modal = document.getElementById("myModal")
const modalContent = document.getElementById("modal-content")
const modalText = document.getElementById("modal-text")
let guess = ""
let ind = 0
let minInd = 0
let maxInd = 5

/* https://www.shecodes.io/athena/73295-how-to-display-the-current-day-of-the-week-and-time-using-javascript#:~:text=%2F%2F%20create%20a%20new%20Date,current%20time%20const%20time%20%3D%20now. */
// create a new Date object
const now = new Date();

// get the current day of the week
const daysOfWeek = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];
const dayOfWeek = daysOfWeek[now.getDay()];

// display the result

/* Get question */

const todaysWords = wordleWords.filter((word) => word.difficulty === dayOfWeek)
const randomIndex = Math.floor(Math.random() * todaysWords.length)
const word = todaysWords[randomIndex].word
console.log(word)


window.addEventListener("keyup", (e) => {
    if(e.key === "Enter") {
        if(guess.length !== 5){
            console.log("not yet!!!!")
        } else {
            if(guess === word){
                modal.style.display = "block"
                modalText.textContent = "You win!"
                modalContent.classList.add("modal-win")
            }
            let checkWord = word
            console.log(checkWord, guess)
            for(let i = 0; i < 5; i++){
                if(checkWord[i] === guess[i]){
                    letterBoxes[i + minInd].style.backgroundColor = "#538d4e"
                    letterBoxes[i + minInd].style.border = "2px solid #538d4e"
                    checkWord = checkWord.slice(0, i) + " " + checkWord.slice(i + 1)
                }
            }
            for(let i = 0; i < 5; i++){
                    if(checkWord.includes(guess[i])){
                        letterBoxes[i + minInd].style.backgroundColor = "#b59f3b"
                        letterBoxes[i + minInd].style.border = "2px solid #b59f3b"
                        checkWord = checkWord.replace(guess[i], " ")
                    } else {
                        if(letterBoxes[i + minInd].style.backgroundColor !== "rgb(83, 141, 78)"){
                        letterBoxes[i + minInd].style.backgroundColor = "#3a3a3c"
                        checkWord = checkWord.replace(guess[i], " ")
                        }
                    }
                }
            guess = ""
            minInd += 5
            maxInd += 5
            if(maxInd >= 34){
                modal.style.display = "block"
                modalText.textContent = "Maybe try again tomorrow..."
                modalContent.classList.add("modal-lose")
            }
        }
    } else if(e.key === "Backspace" || e.key === "Delete") {
        
        if(ind > minInd){
            letterBoxes[ind-1].value = ""
            ind--
            guess = guess.slice(0, -1)
        }
    } else if(e.code === `Key${e.key.toUpperCase()}`){
        if(ind < maxInd){
        letterBoxes[ind].value = e.key.toUpperCase()
        ind++
        guess = guess + e.key.toUpperCase()
        }
    }
})

