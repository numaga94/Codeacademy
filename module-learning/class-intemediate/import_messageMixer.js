import { MessageMixer, palindrome, pigLatin } from './messageMixer.js';

function displayMessage() {
  // ...
  console.log(pigLatin('What is the color of the sky?', 'ay '));
  console.log(palindrome('What is the color of the sky?'));
}

displayMessage();

MessageMixer.displayMessage();
