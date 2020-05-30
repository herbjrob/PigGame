var scores, roundScore, activePlayer, domDice, gamePlaying;

initalize();

document.querySelector(".btn-roll").addEventListener('click', function() {
	
	if (gamePlaying) {
		// Setting variables to be used and rolling dice
		var dice = Math.floor(Math.random() * 6) + 1;

		// Storing dice value and displaying corrosponding dice
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		// Checking if dice greater than 1
		if (dice > 1) {
		roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			switchPlayer();
		}
	}
});

document.querySelector(".btn-hold").addEventListener('click', function() {
	if (gamePlaying) {
		// Adding round score to total score
		scores[activePlayer] += roundScore;

		// Update UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	
		// Check for winner
		if (scores[activePlayer] >= 10) {
			document.getElementById('name-' + activePlayer).textContent = 'WINNER!!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			switchPlayer();
		}
	}

});



document.querySelector(".btn-new").addEventListener('click', initalize);


function switchPlayer() {
	roundScore = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	diceDOM.style.display = 'none'
}

function initalize() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	diceDOM = document.querySelector('.dice');
	gamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}