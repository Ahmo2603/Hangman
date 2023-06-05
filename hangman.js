const words = ["elephant", "tiger", "cheetah", "antilope", "hyena", "giraffe", "shark", "penguin", "bear", "salmon"];
const arrayOfLetters = [];

let mainGameObject = {
    solution: "",
    letters: [],
    cur: "",
    numberOfLetters: 0
};

let scoreDivision = document.querySelector(".score");
let puzzleDivision = document.querySelector(".puzzle");
let lettersDivision = document.querySelector(".letters");
let startButton = document.querySelector(".letters + button");

puzzleDivision.style = "display: flex; flex-direction: row; justify-content: center; gap: 5px;";

function updateScore() {
    scoreDivision.textContent = mainGameObject.numberOfLetters;
    if(mainGameObject.numberOfLetters <= 0) {
        scoreDivision.textContent = "Game over...";
        startButton.style = "display: block; position: relative; left: 550px;";
    }
}

function generatePageElements(elementType, elementParent, elementContent, elementClass) {
    elementType = document.createElement("" + elementType);
    elementType.classList.add(elementClass);
    elementParent = document.querySelector("." + elementParent);
    elementType.textContent = elementContent;
    elementParent.appendChild(elementType);
    return elementType;
}

function builder() {
    lettersDivision.innerHTML = "";
    puzzleDivision.innerHTML = "";
    for(let x = 0; x < mainGameObject.letters.length; x++) {
        var letter = mainGameObject.letters[x];  
        var div = generatePageElements("div", "puzzle", "-", "letter");
        puzzleDivision.style.border = "1px solid black";
        mainGameObject.numberOfLetters++;
    }
    updateScore();
    for(let i = 0; i < 26; i++) {
        let temp = String.fromCharCode(65 + i);
        var div = generatePageElements("div", "letters", temp, "box");
        arrayOfLetters.push(div);
    }
    let checker = (e) => {
        e.target.classList.remove("box");
        e.target.classList.add("boxE");
        e.target.removeEventListener("click", checker);
        e.target.style = "background-color: red;";
        checkLetter(e.target.textContent);
    }
    arrayOfLetters.forEach(function(myDiv) {
        myDiv.addEventListener("click", checker);
    });
}

function startGame() {
    if(words.length != 0) {
        startButton.style = "display: none;";
        mainGameObject.solution = "";
        mainGameObject.letters = [];
        mainGameObject.cur = "";
        mainGameObject.numberOfLetters = 0;
        mainGameObject.cur = words.shift();
        mainGameObject.solution = mainGameObject.cur;
        mainGameObject.letters = mainGameObject.solution.split("");
    }
    builder();
}

function checkLetter(letterInput) {
    mainGameObject.letters.forEach((ele, index) => {
        if(ele.toUpperCase() == letterInput) {
            puzzleDivision.children[index].textContent = letterInput;
            mainGameObject.numberOfLetters--;
            updateScore();
        }
    });
}

startButton.addEventListener("click", startGame);