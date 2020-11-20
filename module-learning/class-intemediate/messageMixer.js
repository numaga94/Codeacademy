const MessageMixer = {
  countCharacter(inputString, inputCharacter) {
    let count = 0;
    const string = inputString.toLowerCase();
    const character = inputCharacter.toLowerCase();
    for (let i = 0; i < string.length; i++) {
      if (string[i] === character) {
        count++;
      }
    }
    return count;
  },

  capitalizeFirstCharacterOfWords(string) {
    const arr = string.split(' ');
    for (let i = 0; i < arr.length; i++) {
      const word = arr[i];
      arr[i] = word[0].toUpperCase() + word.substring(1);
    }
    return arr.join(' ');
  },

  reverseWord(word) {
    return word.split('').reverse().join('');
  },

  reverseAllWords(sentence) {
    const words = sentence.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = this.reverseWord(words[i]);
    }
    return words.join(' ');
  },

  replaceFirstOccurence(string, toBeReplaced, replaceWith) {
    return string.replace(toBeReplaced, replaceWith);
  },

  replaceAllOccurrences(string, toBeReplaced, replaceWith) {
    return string.split(toBeReplaced).join(replaceWith);
  },

  encode(string) {
    const replacementObject = { a: '@', s: '$', i: '!', o: '0' };
    for (const key in replacementObject) {
      string = this.replaceAllOccurrences(string, key, replacementObject[key]);
    }
    return string;
  },

  displayMessage() {
    console.log(this.countCharacter('What is the color of the sky?', 't'));
    console.log(this.capitalizeFirstCharacterOfWords('What is the color of the sky?'));
    console.log(this.reverseWord('What is the color of the sky?'));
    console.log(this.reverseAllWords('What is the color of the sky?'));
    console.log(this.replaceFirstOccurence('What is the color of the sky?', 'sky', 'water'));
    console.log(this.encode('What is the color of the sky?'));
  }
};

function palindrome(str) {
  return `${str} ${MessageMixer.reverseWord(str)}`;
}

function pigLatin(sentence, character) {
  return sentence.split(' ').join(`${character} `);
}

export { MessageMixer, palindrome, pigLatin };
