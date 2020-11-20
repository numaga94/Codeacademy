/**
 * A shift cipher takes a plain text message and shifts each letter forward in the alphabet by a given number. For example, a shift cipher with a shift of 1 would turn the string 'hello' to 'ifmmp'.

Create a class ShiftCipher that takes the numerical value of the shift as a constructor parameter. The class should have two methods:

encrypt: takes a plain text string and returns a capitalized string with each letter shifted forward in the alphabet based on the set shift value.
decrypt: takes an encrypted message and returns a lower case string with each letter shifted back in the alphabet based on the set shift value.
In both methods, any character outside the alphabet should remain the same.
But if a character is shifted outside the alphabet in either direction it should be wrapped around to the other side. For example, encrypting a y with a shift of 4 results in C and decrypting an A with a shift of 1 result in z.
Example:

const cipher = new ShiftCipher(2);
cipher.encrypt('I love to code!'); // returns 'K NQXG VQ EQFG!'
cipher.decrypt('K <3 OA RWRRA'); // returns 'i <3 my puppy'

Unicode table: https://en.wikipedia.org/wiki/List_of_Unicode_characters
 */

// Write class below
class ShiftCipher {
  constructor(num) {
    if (typeof num === 'number') {
      this._num = num;
    }
  }

  encrypt(pleinText) {
    const arr = [];
    for (let i = 0; i < pleinText.length; i++) {
      // console.log(i);
      //   console.log(pleinText.charAt(i));
      const pleinTextUpper = pleinText.toUpperCase();
      const charCode = pleinTextUpper.charCodeAt(i);

      if (charCode > 90 || charCode < 65) {
        arr.push(pleinTextUpper.charAt(i));
      } else if (charCode + this._num > 90) {
        arr.push(String.fromCharCode(charCode + this._num - 26));
      } else {
        arr.push(String.fromCharCode(charCode + this._num));
      }
    }
    // console.log(`${pleinText} => ${arr.join('')}`);
    return arr.join('');
  }

  decrypt(encryptedText) {
    const arr = [];
    for (let i = 0; i < encryptedText.length; i++) {
      // console.log(i);
      //   console.log(pleinText.charAt(i));
      const pleinTextUpper = encryptedText.toUpperCase();
      const charCode = pleinTextUpper.charCodeAt(i);

      if (charCode < 65 || charCode > 90) {
        arr.push(pleinTextUpper.charAt(i));
      } else if (charCode - this._num < 65) {
        arr.push(String.fromCharCode(charCode - this._num + 26));
      } else {
        arr.push(String.fromCharCode(charCode - this._num));
      }
    }
    // console.log(`${pleinText} => ${arr.join('')}`);
    return arr.join('').toLowerCase();
  }
}

const cipher = new ShiftCipher(2);
console.log(cipher.encrypt('I love to code!')); // returns 'K NQXG VQ EQFG!'
console.log(cipher.decrypt('K NQXG VQ EQFG!')); // returns 'I love to code!'
console.log(cipher.encrypt('i <3 my puppy')); // returns 'K <3 OA RWRRA'
console.log(cipher.decrypt('K <3 OA RWRRA')); // returns 'i <3 my puppy'

const superCipher = new ShiftCipher(3);
console.log(superCipher.decrypt('ABCDEFG')); // with a shift of 3, expected 'xyzabcd'.

const lastChipher = new ShiftCipher(1);
console.log(lastChipher.encrypt('XYZ')); // expected 'YZA'
