let score = 0;
let lives = 3;
let currentWord = "";
let correctDefinition = "";

// Initialize UI events
let scoreCounter = document.getElementById("score");
let lifeCounter = document.getElementById("lives");

// Load dictionary and initialize game
fetch('../assets/dictionary.json')
    .then(response => response.json())
    .then(data => {
        const hanziDict = data.reduce((dict, entry) => {
            dict[entry.simplified] = entry.definition.join("; ");
            return dict;
        }, {});

        // Initialize UI events
        document.getElementById("submit").addEventListener("click", () => checkAnswer(hanziDict));
        document.getElementById("submit").addEventListener("click", () => nextQuestion(hanziDict));
        
        // Start first question
        nextQuestion(hanziDict);
    })
    .catch(error => console.error("Error loading dictionary:", error));

// Get a random word + definition
function getRandomChineseWord(dict) {
    const words = Object.keys(dict);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    return { word: randomWord, definition: dict[randomWord] };
}

// Display new question
function nextQuestion(dict) {
    scoreCounter.innerText = score;
    lifeCounter.innerText = lives;
    const { word, definition } = getRandomChineseWord(dict);
    currentWord = word;
    correctDefinition = definition;
    document.getElementById("question").textContent = `What does "${word}" mean?`;
    document.getElementById("input_field").value = "";
}

// Validate user's answer
function checkAnswer() {
    const userAnswer = document.getElementById("input_field").value.trim();
    if (userAnswer.toLowerCase() === correctDefinition.toLowerCase()) {
        score++;
        alert("Correct! 🎉");
    } else {
        lives--;
        alert(`Wrong! The correct answer was: "${correctDefinition}"`);
        if (lives <= 0) {
            alert("Game Over!");
            return;
        }
    }
}
