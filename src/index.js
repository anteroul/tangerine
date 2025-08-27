let score = 0;
let lives = 3;
let currentWord = "";
let correctAnswer = "";
let definitions = [];
let debugMode = false;

// Initialize UI events
let scoreCounter = document.getElementById("score");
let lifeCounter = document.getElementById("lives");
document.getElementById("debug").addEventListener("click", () => toggleDebugMode());

// Load dictionary and initialize game
fetch('../assets/dictionary.json')
    .then(response => response.json())
    .then(data => {
        const hanziDict = data.reduce((dict, entry) => {
            dict[entry.simplified] = entry.pinyinRead;
            return dict;
        }, {});

        definitions = data.reduce((dict, entry) => {
            dict[entry.pinyinRead] = entry.definition;
            return definitions;
        }, {});

        // Initialize UI events
        document.getElementById("submit").addEventListener("click", () => checkAnswer(hanziDict));
        document.getElementById("submit").addEventListener("click", () => nextQuestion(hanziDict));
        
        // Start first question
        nextQuestion(hanziDict);
    })
    .catch(error => console.error("Error loading dictionary:", error));

// Get a random word + pinyin
function getRandomChineseWord(dict) {
    const words = Object.keys(dict);
    const rand = Math.floor(Math.random() * words.length);
    const randomWord = words[rand];
    return { word: randomWord, pinyinRead: dict[randomWord] };
}

// Display new question
function nextQuestion(dict) {
    scoreCounter.innerText = score;
    lifeCounter.innerText = lives;
    const { word, pinyinRead } = getRandomChineseWord(dict);
    currentWord = word;
    correctAnswer = pinyinRead;
    if (debugMode) {
        console.log(pinyinRead);
        console.log(definitions[pinyinRead].toString());
    }
    document.getElementById("question").textContent = `${word}`;
    document.getElementById("input_field").value = "";
}

// Validate user's answer
function checkAnswer(dict) {
    const userAnswer = document.getElementById("input_field").value.trim();
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        alert(`Correct! 🎉 \n\nDefinition: "${definitions[correctAnswer].toString()}"`);
    } else {
        lives--;
        alert(`Wrong! The correct answer was: "${correctAnswer}"`);
        if (lives <= 0) {
            alert("Game Over!");
            resetGame(dict);
        }
    }
}

function toggleDebugMode() {
    debugMode = !debugMode;
    console.log("Debug mode: " + debugMode);
}

function resetGame(dict) {
    lives = 3;
    score = 0;
    nextQuestion(dict);
}