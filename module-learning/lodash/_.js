const { templateSettings } = require('lodash');

const _ = {
  /**
     * Here is a summary of the method:
    
    .clamp() takes three arguments: a number, a lower bound, and an upper bound
    .clamp() modifies the provided number to be within the two provided bounds
    If the provided number is smaller than the lower bound, it will return the lower bound as the final number
    If the number is larger than the upper bound, it will return the upper bound as the final number
    If the number is already within the two bounds, it will return the number as the final number
    
    doc .clamp() @ https://lodash.com/docs/4.17.15#clamp
     */

  clamp(number, lower, upper) {
    const lowerClampedValue = Math.max(number, lower);
    const clampedValue = Math.min(lowerClampedValue, upper);
    return clampedValue;
  },

  /**
     * Here is a summary of the method:
    
    .inRange() takes three arguments: a number, a start value, and an end value
    .inRange() checks to see if the provided number falls within the range specified by the start and end values
    If the provided number is smaller than the start value, .inRange() will return false
    If the provided number is larger than or equal to the end value, .inRange() will return false
    If the provided number is within the start and end values, .inRange() will return true
    If no end value is provided to the method, the start value will be 0 and the end value will be the provided start value
    If the provided start value is larger than the provided end value, the two values should be swapped
    
    doc .inRange() @ https://lodash.com/docs/4.17.15#inRange
     */

  inRange(number, start, end) {
    if (!end) {
      end = start;
      start = 0;
    }
    if (start > end) {
      let swapVal = end;
      end = start;
      start = swapVal;
    }
    return number >= start && number < end;
  },

  /**
     * Here is a summary of what your method should do:
    
    .words() takes one argument: a string
    .words() splits the string into an array of words
    A word is defined by a space-separated string of characters, so each space character, ' ', indicates the end of one word and the start of the next
    Note: You may have noticed in the documentation that this function has a pattern parameter. Your method does not need to accept the additional pattern parameter, we will only split our string into words based on spaces
    
    doc .words() @ https://lodash.com/docs/4.17.15#words
     */

  words(myString) {
    return myString.split(' ');
  },

  /**
     * Here is a summary of what your method should do:
    
    .pad() takes two arguments: a string and a length
    .pad() adds spaces evenly to both sides of the string to make it reach the desired length
    Extra padding is added to the end of the string if an odd amount of padding is required to reach the specified length
    Your method does not need to accept the additional chars parameter; we will only add space characters to pad our string
    
    doc .pad() @ https://lodash.com/docs/4.17.15#pad
     */

  pad(myString, myPadding) {
    if (typeof myString === 'string' && typeof myPadding === 'number') {
      const myLength = myString.length;
      const totalPadding = myPadding - myLength;
      if (totalPadding > 0) {
        const startPadding = Math.floor(totalPadding / 2);
        const endPadding = Math.round(totalPadding / 2);
        return ' '.repeat(startPadding) + myString + ' '.repeat(endPadding);
      } else {
        return myString;
      }
    }
  },

  /**
     * Here is a summary of what your method should do:
    
    .has() takes two arguments: an object and a key
    .has() checks to see if the provided object contains a value at the specified key
    .has() will return true if the object contains a value at the key and will return false if not
    Your method does not need to accept the additional path parameter; we will only check for unnested values
    
    doc .has() @ https://lodash.com/docs/4.17.15#has
     */

  has(obj, key) {
    return Object.keys(obj).includes(key);
  },

  /**
    * Here is a summary of what your method should do:
    
    .invert() takes one argument: an object
    .invert() iterates through each key / value pair in the provided object and swaps the key and value
    
    doc .invert() @ https://lodash.com/docs/4.17.15#invert
    */

  invert(obj) {
    // console.log(obj);
    let keys = Object.keys(obj);
    // console.log('keys: ' + keys);
    let newObj = {};
    for (let i = 0; i < keys.length; i++) {
      newObj[obj[keys[i]]] = keys[i];
    }
    // console.log(newObj);
    return newObj;
  },

  // version given on codeacademy
  invert(object) {
    let invertedObject = {};
    for (let key in object) {
      const originalValue = object[key];
      invertedObject[originalValue] = key;
    }
    return invertedObject;
  },

  /**
     * Here is a summary of what your method should do:
    
    .findKey() takes two arguments: an object and a predicate function — a function that returns a boolean value
    .findKey() iterates through each key / value pair in the provided object and calls the predicate function with the value
    .findKey() returns the first key that has a value that returns a truthy value from the predicate function
    .findKey() returns undefined if no values return truthy values from the predicate function
    
    doc .findKey() @ https://lodash.com/docs/4.17.15#findKey
     */

  findKey(obj, func) {
    let keys = Object.keys(obj);
    for (let key of keys) {
      if (func(obj[key])) {
        return key;
      }
      return undefined;
    }
    // return undefined;
  },

  // version given on codeacademy
  findKey(object, predicate) {
    for (let key in object) {
      let value = object[key];
      let predicateReturnValue = predicate(value);
      if (predicateReturnValue) {
        return key;
      }
    }
    undefined;
    return undefined;
  },

  /**
     * Here is a summary of what your method should do:
    
    .drop() takes two arguments: an array and a number representing the number of items to drop from the beginning of the array
    .drop() returns a new array which contains the elements from the original array, excluding the specified number of elements from the beginning of the array
    If the number of elements to drop is unspecified, your method should drop one element
    
    doc .drop() @ https://lodash.com/docs/4.17.15#drop
     */

  drop(arr, num) {
    // console.log('num is: ' + num);
    if (typeof num === 'undefined') {
      arr.shift();
      return arr;
    } else if (num === 0) {
      return arr;
    } else {
      return arr.slice(num);
    }
  },

  // version given on caodeacademy
  drop(arr, num) {
    if (num === undefined) {
      num = 1;
    }
    return arr.slice(num, arr.lenght);
  },

  /**
     * Here is a summary of what your method should do:
    
    .dropWhile() takes two arguments: an array and a predicate function
    The supplied predicate function takes three arguments: the current element, the current element index, and the whole array
    .dropWhile() creates a new copy of the supplied array, dropping elements from the beginning of the array until an element causes the predicate function to return a falsy value
    
    doc .dropWhile() @ https://lodash.com/docs/4.17.15#dropWhile
     */

  dropWhile(arr, func) {
    const falsyIndex = arr.findIndex(
      (element, index) => !func(element, index, arr)
    );
    return this.drop(arr, falsyIndex);
  },

  /**
     * Here is a summary of what your method should do:
    
    .chunk() takes two arguments: an array and a size
    .chunk() breaks up the supplied array into arrays of the specified size
    .chunk() returns an array containing all of the previously-created array chunks in the order of the original array
    If the array can’t be broken up evenly, the last chunk will be smaller than the specified size
    If no size is supplied to the method, the size is set to 1
    
    doc .chunk() @ https://lodash.com/docs/4.17.15#chunk
     */

  // my verion of code
  //   chunk(arr, size){
  //     if(size === undefined){
  //       size = 1;
  //       let newArr = [];
  //       arr.forEach(element =>{
  //         newArr.push([element])
  //       })
  //       return newArr;
  //     } else if(size > arr.length || size <= 0){
  //       return arr;
  //     } else{
  //       let totalChunks = Math.floor(arr.length / size)+1;
  //       let sizeOfLastChunk = arr.length % size;
  //       if(!sizeOfLastChunk){
  //         sizeOfLastChunk = size
  //       }
  //       let newArr = [];
  //       let oldArr = arr;
  //       while (totalChunks > 0){
  //         let swapBasket = [];
  //         for(let i = 0; i < size; i++){
  //           // console.log(oldArr[i]);
  //           if(typeof oldArr[i] !== 'undefined'){
  //             swapBasket.push(oldArr[i]);
  //           } else{
  //             break;
  //           }
  //         }
  //         if(swapBasket.length > 0){
  //           newArr.push(swapBasket);
  //           console.log(swapBasket);
  //         }
  //         swapBaset = [];
  //         oldArr = this.drop(oldArr, size);
  //         // console.log(oldArr);

  //         totalChunks -= 1;
  //       }
  //       return newArr;
  //     }
  //   }

  // version given on codeacademy
  chunk(array, size = 1) {
    let arrayChunks = [];
    for (let i = 0; i < array.length; i += size) {
      let arrayChunk = array.slice(i, i + size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  },
};

// console.log(_.inRange(9, 5, 15));   // true
// console.log(_.inRange(-5, 5, 15));  // false
// console.log(_.inRange(9, 15, 5));   // true
// console.log(_.inRange(9, 5));       // false
// console.log(_.inRange(1, 1, 3));    // true

// console.log(_.pad('hi', 6))   // '||hi||'
// console.log(_.pad('hi', 5))   // '|hi||'
// console.log(_.pad('hi', 1))   // 'hi'

// let object = { 'a': 1, 'c': 2, 'b': 5 };
// console.log(_.has(object, 'a'));

// console.log(_.invert(object));

// arr = [1,2,3,4,5,6];
// console.log(_.drop(arr));
// console.log(_.drop(arr, 8));
// console.log(_.drop(arr, 0));

arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
console.log(_.chunk(arr, 7));
console.log(_.chunk(arr, 2));
console.log(_.chunk(arr, 3));

// Do not write or modify code below this line.
module.exports = _;
