let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

// This function will be called at the start of each new round in order to generate the new secret target number, which should return a random integer between 0 and 9.

const generateTarget = () => Math.floor(Math.random() * 10);

// function that takes two numbers and returns the distance

const getAbsoluteDistance = (humanGuess, computerGuess, secretTargetNumber) => {
  let diffHuman = Math.abs(humanGuess - secretTargetNumber);
  let diffComputer = Math.abs(computerGuess - secretTargetNumber);
  return [diffHuman, diffComputer];
}


// This function will be called each round to determine which guess is closest to the target number.

const compareGuesses = (humanGuess, computerGuess, secretTargetNumber = generateTarget()) => {
  let result = getAbsoluteDistance(humanGuess, computerGuess, secretTargetNumber);
  return result[0] >= result[1];
}

//This function will be used to correctly increase the winner’s score after each round.

const updateScore = winner => {
  if (winner === 'human') {
    humanScore++;
  } else if ( winner === 'computer') {
    computerScore++;
  }
}

// This function will be used to update the round number after each round.

const advanceRound = () => currentRoundNumber += 1;
