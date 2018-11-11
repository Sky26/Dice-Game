/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/**
 * DOM: document object model
 * Structured representation of an HTML document
 * The DOM is used to connect webpages to scripts like javascript
 * For each HTML box, there is an object in the DOM that we can access and interact with.
 */

/**
 * Events: Notifications that are sent to notify the code that something happened (clicking, resizing, scrolling, pressing)
 * Event listener: A function that performs an action based on a certain event, it wait for it to happen
 */

// global variables
var scores, roundScore, activePlayer, gamePlaying, oldDice;

init();

// anonymous function
document.querySelector(".btn-roll").addEventListener("click", function() {
	if (gamePlaying) {
		// Random number
		var dice1 = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;

		// Display the result
		document.getElementById("dice-1").style.display = "block";
		document.getElementById("dice-2").style.display = "block";
		document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
		document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

		if (dice1 !== 1 && dice2 !== 1) {
			// Add score
			roundScore += dice1 + dice2;
			document.querySelector(
				"#current-" + activePlayer
			).textContent = roundScore;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector(".btn-hold").addEventListener("click", function() {
	if (gamePlaying) {
		// Add current score to global score
		scores[activePlayer] += roundScore;

		// update the UI
		document.querySelector("#score-" + activePlayer).textContent =
			scores[activePlayer];

		var input = document.querySelector(".final-score").value;
		var winningScore;

		// Undefined, 0, null, "" are COERCED to false, anything else is COERCED to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector("#name-" + activePlayer).textContent =
				"WINNER!";
			document.querySelector(".dice-1").style.display = "none";
			document.querySelector(".dice-2").style.display = "none";
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.add("winner");
			document
				.querySelector(".player-" + activePlayer + "-panel")
				.classList.remove("winner");

			gamePlaying = false;
		} else {
			// Next player
			nextPlayer();
		}
	}
});

// init = when someone click, call the function
// init() = automatically executed
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
	// Next player
	activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
	roundScore = 0;

	document.querySelector("#current-0").textContent = "0";
	document.querySelector("#current-1").textContent = "0";

	// document.querySelector('.player-0-panel').classList.remove('active');
	// document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	document
		.querySelector(".player-" + activePlayer + "-panel")
		.classList.add("active");

	document.getElementById("dice-1").style.display = "none";
	document.getElementById("dice-2").style.display = "none";
}
