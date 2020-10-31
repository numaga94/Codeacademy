const cards = ['diamond', 'spade', 'heart', 'club'];

// Write your code below
let currentCard = 0;
while (currentCard < cards.length) {
  if (cards[currentCard] === 'spade') {
    console.log(`index of spade is ${currentCard + 1}`);
    break;
  } else {
    currentCard++;
  }
}