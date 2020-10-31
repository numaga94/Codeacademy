const cards = ['diamond', 'spade', 'heart', 'club'];

// Write your code below
let i = 0;
while (i < cards.length) {
  if (cards[i] === 'spade') {
    console.log(`index of spade is ${i + 1}`);
    break;
  } else {
    i++;
  }
}

// Write your code below
let currentCard;
while (currentCard !== 'spade') {
  currentCard = cards[Math.floor(Math.random() * cards.length)];
  console.log(currentCard);
}