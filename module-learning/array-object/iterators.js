const cities = [
  'Orlando',
  'Dubai',
  'Edinburgh',
  'Aix-en-provence',
  'Chennai',
  'Accra',
  'Denver',
  'Eskisehir',
  'Medellin',
  'Yokohama',
];

const nums = [1, 50, 75, 200, 350, 525, 1000];

// .forEach() is used to execute the same code on every element in an array but does not change the array and returns undefined.
cities.forEach((city) => console.log('Have you visited ' + city + '?'));
// Have you visited Orlando?
// Have you visited Dubai?
// Have you visited Edinburgh?
// Have you visited Aix-en-provence?
// Have you visited Chennai?
// Have you visited Accra?
// Have you visited Denver?
// Have you visited Eskisehir?
// Have you visited Medellin?
// Have you visited Yokohama?

// a smiliar for..of loop does the same
for (let city of cities) {
  console.log(`Have you visited ${city}?`);
}

// .filter() checks every element in an array to see if it meets certain criteria and returns a new array with the elements that return truthy for the criteria.
const longCities = cities.filter((city) => city.length > 7);
console.log(longCities);
// [ 'Edinburgh',
//   'Aix-en-provence',
//   'Eskisehir',
//   'Medellin',
//   'Yokohama' ]

// .reduce() iterates through an array and takes the values of the elements and returns a single value.
const word = cities.reduce((acc, currVal) => {
  return acc + currVal[0];
}, 'C');
console.log(word); // return CODEACADEMY

// .map() executes the same code on every element in an array and returns a new array with the updated elements.
const smallerNums = nums.map((num) => num - 5);
console.log(smallerNums); // return [ -4, 45, 70, 195, 345, 520, 995 ]

// .findIndex() returns the index of the first element of an array which satisfies a condition in the callback function. It returns -1 if none of the elements in the array satisfies the condition.
const firstWordWithY = cities.findIndex((city) => city[0] === 'Y');
console.log(firstWordWithY); // return 9, index of the first city starts with letter Y
console.log(cities[firstWordWithY]); // return 'Yokohama'

// .some() method that will return a boolean value if any of elements in the array meets condition
console.log(smallerNums.some((num) => num < 0)); // return true

// .every() method that will return a boolean value if every elements in the array meet condition
console.log(smallerNums.every((num) => num < 0)); // return false

// anthor great article that walks throught most commonly used mehtods of iteration
// https://www.digitalocean.com/community/tutorials/how-to-use-array-methods-in-javascript-iteration-methods
