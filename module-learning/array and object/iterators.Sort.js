/**
 * .sort() method
 * detailed MDN documentation : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */

const speciesArray = [
  { speciesName: 'shark', numTeeth: 50 },
  { speciesName: 'dog', numTeeth: 42 },
  { speciesName: 'alligator', numTeeth: 80 },
  { speciesName: 'human', numTeeth: 32 },
];

// sort by numbers
const sortSpeciesByTeeth = (arr) => {
  return arr.sort((obj1, obj2) => obj1.numTeeth > obj2.numTeeth);
};

// sort by a - z
const sortSpeciesByAlpabetic = (arr) => {
  return arr.sort((a, b) => {
    let nameA = a.speciesName.toLowerCase();
    let nameB = b.speciesName.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
};

// Feel free to comment out the code below when you're ready to test your function!

console.log(sortSpeciesByTeeth(speciesArray));
console.log(sortSpeciesByAlpabetic(speciesArray));
// Should print [ { speciesName: 'human', numTeeth: 32 },
// { speciesName: 'dog', numTeeth: 42 },
// { speciesName: 'shark', numTeeth: 50 },
// { speciesName: 'alligator', numTeeth: 80 } ]
