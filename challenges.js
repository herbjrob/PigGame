var scores, roundScore, activePlayer, diceDom, prevDice, currentDice, finalScore, gamePlaying;

diceDom1 = document.getElementById('dice-1');
diceDom2 = document.getElementById('dice-2');


document.querySelector('.btn-roll').addEventListener('click', function() {
	
	prevDice = currentDice;
	currentDice = Math.floor(Math.random() * 6) + 1;
	
	if (gamePlaying) {
		// Check value of prevDice and update it accordingly
		if (prevDice > 0){

			// Update UI Display
			document.getElementById('current-' + activePlayer).textContent = roundScore;
			diceDom2.style.display = 'block';
			diceDom2.src = 'dice-' + prevDice + '.png';
		}
		
		// Check if a one was rolled	
		if (currentDice === 1) {

			// Switch Players
			changePlayers();

		// Check if two sixes were rolled
		} else if (currentDice === 6 && prevDice === 6) {
			// Update round and global scores
			scores[activePlayer] = 0;
	
			// Update UI
			document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

			
			// Switch Players
			changePlayers();
			
		} else {
			// Update round score
			roundScore += currentDice;
		
			// Update UI Display
			document.getElementById('current-' + activePlayer).textContent = roundScore;
			diceDom1.style.display = 'block';
			diceDom1.src = 'dice-' + currentDice + '.png';
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add Current score to global score
		scores[activePlayer] += roundScore;

		// Update UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

		// Check for winner
		if (scores[activePlayer] >= finalScore){
			gamePlaying = false;
			document.getElementById('name-' + activePlayer).textContent = 'Winner!!!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		} else {
			changePlayers();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', function() {
	finalScore = parseInt(document.querySelector('.final-score').value);

	if (isNaN(finalScore)) {
		alert('Please enter a valid number for Final Score.');
	} else {
		initalize();
	}
});

function changePlayers() {

	// Reset round score
	roundScore = 0;
	currentDice = 0;
	
	// Update UI Display
	document.getElementById('current-' + activePlayer).textcontent = roundScore;
	diceDom1.style.display = 'none';
	diceDom2.style.display = 'none';	
	
	// Updating Players
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
	
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
}



function initalize() {
	// Resetting all variables
	scores = [0, 0];
	roundScore = 0;
	currentDice = 0;
	activePlayer = 0;
	gamePlaying = true;

	// Resetting Player Names
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	// Resetting all displayed Scores
	document.getElementById('score-0').textContent = 0;
	document.getElementById('score-1').textContent = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;

	// Resetting Acitve Player
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

	// Remove dice from display
	diceDom1.style.display = 'none'
	diceDom2.style.display = 'none'

}