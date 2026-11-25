// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Start the game after validating player name
function startGame() {
    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, " + name + "!";
    document.getElementById("startTime").innerHTML = "Started: " + Date();
}

// Return a random choice for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Play a single round
function playRound(playerChoice) {
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();

    // Update both images
    document.getElementById("playerImg").src = "img/" + playerChoice + ".png";
document.getElementById("computerImg").src = "img/" + computerChoice + ".png";

    const resultEl = document.getElementById("result");
    let roundResult = "";

    // Decide winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw!";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultEl.innerHTML = "You Win!";
        resultEl.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose!";
        resultEl.style.color = "red";
    }

    // Update scoreboard and results array
    roundCount++;
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add new row to history table
    const historyTable = document.getElementById("history");
    historyTable.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Count wins using a for loop and show summary
function showSummary() {
    if (results.length === 0) {
        alert("No rounds played yet.");
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    const winPercent = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercent + "%.";
}

// Reset scores, array, table, and messages
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";

    // Reset history table back to header row only
    document.getElementById("history").innerHTML =
        "<tr>" +
            "<th>Round</th>" +
            "<th>You</th>" +
            "<th>Computer</th>" +
            "<th>Result</th>" +
        "</tr>";
}