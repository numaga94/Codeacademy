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
    return `${myString + arr[arr.length - 2].item} and ${arr[arr.length - 1].item}`;
  }
  if (arr.length === 2) {
    return `${arr[arr.length - 2].item} and ${arr[arr.length - 1].item}`;
  }
  return arr[arr.length - 1].item;
};

console.log(groceries([{ item: 'Carrots' }, { item: 'Hummus' }, { item: 'Pesto' }, { item: 'Rigatoni' }]));
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

const doorImage1 = document.querySelector('#door1');
const doorImage2 = document.querySelector('#door2');
const doorImage3 = document.querySelector('#door3');
const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let openDoor1;
let openDoor2;
let openDoor3;
let numClosedDoors = 3;
function randomChoreDoorGenerator() {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor1 = spaceDoorPath;
      openDoor2 = botDoorPath;
      openDoor3 = beachDoorPath;
      break;
    default:
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor3 = botDoorPath;
  }
}

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  }
  return false;
};

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  }
  return true;
};

const startButtom = document.querySelector('#start');
const currentlyPlaying = true;
const gameOver = (status) => {
  if (status === 'win') {
    startButtom.textContent = 'You win! Play again?';
  } else {
    startButtom.textContent = 'Game over! Play again?';
  }
  currentlyPlaying = false;
};

const doorPlay = (door) => {
  numClosedDoors--;
  console.log(numClosedDoors);
  if (!numClosedDoors) {
    gameOver('win');
  } else if (isBoot(door)) {
    gameOver();
  }
};

doorImage1.addEventListener('click', () => {
  if (isClicked(doorImage1) && currentlyPlaying) {
    doorImage1.src = openDoor1;
    doorPlay(doorImage1);
  }
});

doorImage2.addEventListener('click', () => {
  if (isClicked(doorImage2) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    doorPlay(doorImage2);
  }
});

doorImage3.addEventListener('click', () => {
  if (isClicked(doorImage3) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    doorPlay(doorImage3);
  }
});

randomChoreDoorGenerator();
