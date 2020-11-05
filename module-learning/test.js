// const cards = ['diamond', 'spade', 'heart', 'club', 'king', 'double kings'];

// // Write your code below
// let i = 0;
// while (i < cards.length) {
//   if (cards[i] === 'spade') {
//     console.log(`index of spade is ${i + 1}`);
//     break;
//   } else {
//     i++;
//   }
// }

// // Write your code below
// let currentCard;
// while (currentCard !== 'spade') {
//   currentCard = cards[Math.floor(Math.random() * cards.length)];
//   console.log(currentCard);
// }

// const factorial = (num) => {
//   let p = 1;
//   for (let i = 1; i <= num; i++) {
//     p *= i;
//     console.log(p, i);
//   }
//   return p;
// };

// console.log(factorial(6));

// const subLength = (aString, aChar) => {
//   let counter = 0;
//   for (let i = 0; i < aString.length; i++) {
//     if (aString[i] === aChar) {
//       counter++;
//     }
//   }

//   if (counter === 2) {
//     return aString.lastIndexOf(aChar) - aString.indexOf(aChar) + 1;
//   } else {
//     return 0;
//   }
// };

// console.log(subLength('funny', 'n')); // returns 6
// subLength('summer', 'm'); // returns 2
// subLength('digitize', 'i'); // returns 0
// subLength('cheesecake', 'k'); // returns 0

const groceries = (arr) => {
  if (arr.length > 2) {
    let myString = '';
    for (let i = 0; i < arr.length - 2; i++) {
      myString += `${arr[i].item}, `;
      // console.log(myString);
    }
    return `${myString + arr[arr.length - 2].item} and ${
      arr[arr.length - 1].item
    }`;
  }
  if (arr.length === 2) {
    return `${arr[arr.length - 2].item} and ${arr[arr.length - 1].item}`;
  }
  return arr[arr.length - 1].item;
};

console.log(
  groceries([
    { item: 'Carrots' },
    { item: 'Hummus' },
    { item: 'Pesto' },
    { item: 'Rigatoni' },
  ])
);
// returns 'Carrots, Hummus, Pesto and Rigatoni'

console.log(groceries([{ item: 'Bread' }, { item: 'Butter' }]));
// returns 'Bread and Butter'

console.log(groceries([{ item: 'Cheese Balls' }]));
// returns 'Cheese Balls'

// function prettyPrint(array) {
//   let countAarray = array.length;
//   let newString;
//   if (countAarray > 2) {
//     let arrayWithoutLast = array.slice(0, countAarray - 1).join(', ');
//     newString = arrayWithoutLast + ' and ' + array.pop();
//   } else if (countAarray == 2) {
//     newString = array.shift() + ' and ' + array.pop();
//   } else {
//     newString = array.pop();
//   }
//   return newString;
// }

// const card1 = ['diamond', 'spade', 'heart', 'club', 'king', 'double kings'];
// const card2 = ['diamond', 'spade'];
// const card3 = ['diamond'];

// console.log(prettyPrint(card1));
// console.log(prettyPrint(card2));
// console.log(prettyPrint(card3));
