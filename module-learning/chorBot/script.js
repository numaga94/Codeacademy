const doorImage1 = document.querySelector('#door1');
const doorImage2 = document.querySelector('#door2');
const doorImage3 = document.querySelector('#door3');
const botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
const beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
const spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
const closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

const startButtom = document.querySelector('#start');

let currentlyPlaying = true;
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
  //   console.log(door.src);
  if (door.src === closedDoorPath) {
    return false;
  }
  return true;
};

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
  } else if (isBot(door)) {
    gameOver();
  }
};

doorImage1.addEventListener('click', () => {
  if (currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    doorPlay(doorImage1);
  }
});

doorImage2.addEventListener('click', () => {
  if (currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    doorPlay(doorImage2);
  }
});

doorImage3.addEventListener('click', () => {
  if (currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    doorPlay(doorImage3);
  }
});

startButtom.addEventListener('click', () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButtom.textContent = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
});

randomChoreDoorGenerator();
