
      const rockButton = document.querySelector(".js-rock-button");
      const paperButton = document.querySelector(".js-paper-button")
      const scissorsButton = document.querySelector(".js-scissors-button");
      const outputScore = document.querySelector(".js-output-score");
      const outputPicks = document.querySelector(".js-output-picks");
      const outputScoreBoard = document.querySelector(".js-output-scoreboard");
      const resetButton = document.querySelector(".js-reset-button");
      const autoplayButton = document.querySelector(".js-auto-play-button");

      //setting orginal scoreboard
      let result = '';
      let intervalId;
      let isAutoPlaying = false;
      let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
      };      
      //button functions
      rockButton.addEventListener('click', () => {
        playGame('rock');
      })
      paperButton.addEventListener('click', () => {
        playGame('paper');
      })
      scissorsButton.addEventListener('click', () => {
        playGame('scissors');
      })
      resetButton.addEventListener('click', () => { 
        resetScore();
      })
      autoplayButton.addEventListener('click', () => { 
        autoPlay();
      })
      render();
      function render() {
        outputScoreBoard.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
      }

      function autoPlay(){
        if (!isAutoPlaying) {
          clearInterval(intervalId);
          isAutoPlaying = true;
          autoplayButton.innerHTML = 'Playing ...'
          intervalId = setInterval(() => {
          const autoplayMove = computerPlay();
          playGame(autoplayMove);
        }, 1000);
        } else if (isAutoPlaying) {
          clearInterval(intervalId);
          isAutoPlaying = false;
          autoplayButton.innerHTML = 'Auto Play'
        }
        
      }
      function playGame(pickMove) {
        const computerMove = computerPlay();
        if (pickMove === 'paper') {
          if (computerMove === 'paper') {
            result = 'Tie.';
          } else if (computerMove === 'rock') {
            result = 'You win.';
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
          }
        }
        if (pickMove === 'rock') {
          if (computerMove === 'paper') {
            result = 'You lose.';
          } else if (computerMove === 'rock') {
            result = 'Tie.';
          } else if (computerMove === 'scissors') {
            result = 'You win.';
          }
        }
        if (pickMove === 'scissors') {
          if (computerMove === 'paper') {
            result = 'You win.';
          } else if (computerMove === 'rock') {
            result = 'You lose.';
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
          }
        }
        updateScore(result)
        outputScore.innerHTML = result;
        outputPicks.innerHTML = `You <img class="icon1" src="icons/${pickMove}-emoji.png"> <img class="icon1" src="icons/${computerMove}-emoji.png"> Computer`
      }
      function computerPlay() {
        let computerMove = '';
        const computerPick = Math.random();
        if (computerPick >= 0 && computerPick < 1/3) {
          computerMove = 'rock';
        } else if (computerPick >= 1/3 && computerPick < 2/3) {
          computerMove = 'paper';
        } else if (computerPick >= 2/3 && computerPick < 1) {
          computerMove = 'scissors'
        }
        return computerMove
      }
      function updateScore(result) {
        if (result === 'You win.') {
          score.wins += 1;
        } else if (result === 'You lose.') {
          score.losses += 1;
        } else if (result === 'Tie.') {
          score.ties += 1;
        }
        outputScoreBoard.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
        localStorage.setItem('score', JSON.stringify(score));
      }
      function resetScore() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        outputScoreBoard.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
        localStorage.setItem('score', JSON.stringify(score));
      }

