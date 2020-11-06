/*
The .filter() Method
Another useful iterator method is .filter(). Like .map(), .filter() returns a new array. However, .filter() returns an array of elements after filtering out certain elements from the original array. The callback function for the .filter() method should return true or false depending on the element that is passed to it. The elements that cause the callback function to return true are added to the new array. Take a look at the following example:

const words = ['chair', 'music', 'pillow', 'brick', 'pen', 'door']; 

const shortWords = words.filter(word => {
  return word.length < 6;
});
words is an array that contains string elements.
const shortWords = declares a new variable that will store the returned array from invoking .filter().
The callback function is an arrow function has a single parameter, word. Each element in the words array will be passed to this function as an argument.
word.length < 6; is the condition in the callback function. Any word from the words array that has fewer than 6 characters will be added to the shortWords array.
Let’s also check the values of words and shortWords:

console.log(words); // Output: ['chair', 'music', 'pillow', 'brick', 'pen', 'door']; 
console.log(shortWords); // Output: ['chair', 'music', 'brick', 'pen', 'door']
Observe how words was not mutated, i.e. changed, and shortWords is a new array.
*/

// Call the .filter() method on randomNumbers to return values that are less than 250. Save them to a new array called smallNumbers, declared with const

const randomNumbers = [375, 200, 3.14, 7, 13, 852];

// Call .filter() on randomNumbers below
const smallNumbers = randomNumbers.filter((num) => {
  return num < 250;
});

console.log(smallNumbers);

//  Invoke .filter() on the favoriteWords array to return elements that have more than 7 characters. Save the returned array to a const variable named longFavoriteWords.

const favoriteWords = [
  'nostalgia',
  'hyperbole',
  'fervent',
  'esoteric',
  'serene',
  'nostalgia',
  'hyperbole',
];

// Call .filter() on favoriteWords below
const longFavoriteWords = favoriteWords.filter((word) => {
  return word.length > 7;
});

console.log(longFavoriteWords);

// call .filter(value, index) and .indexOf() to remove duplicates
const unique = longFavoriteWords.filter((value, index) => {
  return longFavoriteWords.indexOf(value) !== index;
});

console.log(unique);

// call .filter(value, index) and .indexOf() to find duplicates
const duplicates = longFavoriteWords.filter((value, index) => {
  return longFavoriteWords.indexOf(value) === index;
});

console.log(duplicates);
