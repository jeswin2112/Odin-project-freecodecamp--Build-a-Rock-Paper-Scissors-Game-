// Global variables
let humanScore = 0;
let computerScore = 0;
let round = 1;
const totalRounds = 3; // Play best of 3

// DOM elements
const buttons = document.querySelectorAll('button:not(#reset)');
const resultDiv = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const gameOverDiv = document.getElementById('game-over');
const resetButton = document.getElementById('reset');

// Function to get computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Function to play a single round
function playRound(humanChoice) {
    if (round > totalRounds) return;
    
    const computerChoice = getComputerChoice();
    let result = '';
    
    if (humanChoice === computerChoice) {
        result = `Round ${round}: It's a tie! Both chose ${humanChoice}`;
    } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        humanScore++;
        result = `Round ${round}: You win! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        result = `Round ${round}: You lose! ${computerChoice} beats ${humanChoice}`;
    }
    
    // Update the UI
    resultDiv.textContent = result;
    scoreDiv.textContent = `You: ${humanScore} - Computer: ${computerScore}`;
    
    // Check if game is over
    if (round >= totalRounds) {
        endGame();
    } else {
        round++;
    }
}

// Function to end the game
function endGame() {
    buttons.forEach(button => button.disabled = true);
    resetButton.style.display = 'inline-block';
    
    if (humanScore > computerScore) {
        gameOverDiv.textContent = '🎉 You win the game! 🎉';
    } else if (computerScore > humanScore) {
        gameOverDiv.textContent = '😢 Computer wins the game! 😢';
    } else {
        gameOverDiv.textContent = '🤝 The game is a tie! 🤝';
    }
}

// Function to reset the game
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    round = 1;
    resultDiv.textContent = 'Choose your move!';
    scoreDiv.textContent = 'You: 0 - Computer: 0';
    gameOverDiv.textContent = '';
    resetButton.style.display = 'none';
    buttons.forEach(button => button.disabled = false);
}

// Event Listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        playRound(button.id);
    });
});

resetButton.addEventListener('click', resetGame);

// Initialize the game
resetGame();
