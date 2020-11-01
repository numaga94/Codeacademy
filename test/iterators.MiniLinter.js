/**
 * Mini Linter
In this project, you will use what you know about iterating over arrays to improve the quality of a paragraph and gather some information about that paragraph.

This is the same type of work that word processing software does. Additionally, you may have heard of linting, a process by which text is evaluated and improved by an application. In this project, you will create a miniature version of a linter using array methods that you have learned.
 */

let story = 'Last weekend, I took literally the most beautiful bike ride of my life. The route is called "The 9W to Nyack" and it actually stretches all the way from Riverside Park in Manhattan to South Nyack, New Jersey. It\'s really an adventure from beginning to end! It is a 48 mile loop and it basically took me an entire day. I stopped at Riverbank State Park to take some extremely artsy photos. It was a short stop, though, because I had a really long way left to go. After a quick photo op at the very popular Little Red Lighthouse, I began my trek across the George Washington Bridge into New Jersey.  The GW is actually very long - 4,760 feet! I was already very tired by the time I got to the other side.  An hour later, I reached Greenbrook Nature Sanctuary, an extremely beautiful park along the coast of the Hudson.  Something that was very surprising to me was that near the end of the route you actually cross back into New York! At this point, you are very close to the end.';

let overusedWords = ['really', 'very', 'basically'];

let unnecessaryWords = ['extremely', 'literally', 'actually' ];

// split the string into individual words and save them in a new array called storyWords.
const storyWords = story.split(' ');

/**
 * There is an array of words that are unnecessary. Iterate over your array to filter out these words. Save the remaining words in an array called betterWords. There are several ways that you could achieve this. 
 */

// frist method is to use .filter() method
const betterWords = storyWords.filter(word => {
  return unnecessaryWords.includes(word) === false;
})
// console.log(betterWords.join(' '));

// second method is to use .forEach() method
const better = [];
storyWords.forEach(word => {
  if (unnecessaryWords.includes(word) === false){
    better.push(word);
  }
})
// console.log(better.join(' '));

// third method is to use for..of loop method
const better1 = [];
for (let word of storyWords){
  if (unnecessaryWords.includes(word) === false){
    better1.push(word);
  }
}
// console.log(better1.join(' '));

/**
 * There is an array of words called overusedWords. These are words overused in this story. You want to let the user of your program know how many times they have used these overused words. There are two ways to achieve this.
 */

// first way is to use .filter() method
const freqOverusedWords = storyWords.filter(word => {
    return overusedWords.includes(word);
  })
//   console.log(freqOverusedWords.length);
  
//   second way is to use .forEach() mehtod
  let counter = 0;
  const frequentlyOverused = storyWords.forEach(word => {
    if(overusedWords.includes(word)){
      counter ++;
    }
  })
//   console.log(counter);
  
//   third way is to use for..of loop
  let counter1 = 0;
  for (let word of storyWords){
    if (overusedWords.includes(word)){
      counter1 ++;
    }
  }
//   console.log(counter1);
  
// fourth way is to use for..of loop
 let really = 0;
 let very = 0;
 let basically = 0;
 for (let word of storyWords){
    if (word === 'really'){
        really ++;
    } else if (word === 'very'){
        very ++;
    } else if (word === 'basically'){
        basically ++;
    }
}
// console.log(really + very + basically);
  
  
  /**
   * count how many sentences are in the paragraph.
   * This may seem tricky, but remember that all of the sentences in this paragraph end with a period (.) or an exclamation mark (!). You could iterate over the array and add 1 to a sentence counter variable for each word that has a period or exclamation mark as its final character.
   */

  // here we have to redo the split by every single letters
  const countSentences = story.split('').filter(word => {
    return ['.', '!', '?'].includes(word);
  })
//   console.log(countSentences.length);

//   Log these items to the console:
//   The word count
//   The sentence count
//   The number of times each overused word appears
//   You could choose to simply log them one by one or, for a challenge, create a function that logs all of them with some formatting.
  
const results = (param1, param2, param3, param4, param5) => {
    console.log(
      `The word count ${param1}\nThe sentence count ${param2}\nThe number of times "really" appears ${param3}\nThe number of times "very" appears ${param4}\nThe number of times "basically" appears ${param5}`
    )
  }
  
  results(storyWords.length, countSentences.length, really, very, basically);

  console.log(storyWords.sort());
  



// Congratulations! You’ve improved the original paragraph and given the user some important information about his or her work. Think about ways in which you can extend this project, potentially by using other JavaScript knowledge you have.

// Here are some ideas:

// For the overused words, remove it every other time it appears.

// Write a function that finds the word that appears the greatest number of times.

// Replaced overused words with something else.
