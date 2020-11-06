/**
 * an inspirational quote generator program. Every time a user runs a program, they should get a new, randomized output.
 * To make your program truly random, the message that it outputs should be made up of at least three different pieces of data.
 */
const fs = require('fs');

const quoteShuffler = {
  quote: null,
  author: null,
  genre: null,
  fullQuote: null,

  quoteGenerator() {
    const content = fs.readFileSync('./quotes.txt', 'utf-8');
    const cells = content.split(/\r?\n|\r/).map((el) => {
      // console.log(el.split(';'));
      return el.split(';');
    });

    const headings = cells.shift();
    // console.log(headings);

    const obj = cells.map((el) => {
      const obj = {};
      for (let i = 0, l = el.length; i < l; i++) {
        obj[headings[i]] = isNaN(Number(el[i])) ? el[i] : +el[i];
      }
      return obj;
    });

    return obj;
  },

  randomQuote(obj) {
    const randomIndex = Math.floor(Math.random() * obj.length);
    const randomObj = obj[randomIndex];
    this.quote = randomObj.QUOTE;
    this.author = randomObj.AUTHOR;
    this.genre = randomObj.GENRE;
    this.fullQuote = randomObj;
  },

  quoteByGenreAndAuthor(quoteGenre = null, quoteAuthor = null) {
    const obj = this.quoteGenerator();
    // console.log(obj);
    // obj.forEach((element) => console.log(element.GENRE));

    if (quoteGenre && quoteAuthor) {
      const quotes = obj.filter((element) => {
        return (
          element.GENRE.trim().toLowerCase() === quoteGenre.trim().toLowerCase() &&
          element.AUTHOR.trim().toLowerCase() === quoteAuthor.trim().toLowerCase()
        );
      });
      if (quotes.length) {
        return quotes;
      }
    }
    // console.log(quotes);
    if (quoteGenre) {
      const quoteByGenre = obj.filter((element) => {
        return element.GENRE.trim().toLowerCase() === quoteGenre.trim().toLowerCase();
      });
      if (quoteByGenre.length) {
        return quoteByGenre;
      }
      return 'not found';
    }
    if (quoteAuthor) {
      const quoteByAuthor = obj.filter((element) => {
        return element.AUTHOR.trim().toLowerCase() === quoteAuthor.trim().toLowerCase();
      });
      if (quoteByAuthor.length) {
        return quoteByAuthor;
      }
      return 'not found';
    }
  },

  morningQuote(quotoGenre = null, quoteAuthor = null) {
    const quotes = this.quoteByGenreAndAuthor(quotoGenre, quoteAuthor);
    if (quotes === 'not found') {
      console.log(`Ouupoos, can't find any ${quotoGenre} quotes by ${quoteAuthor}.\nWould you like to try another?`);
    } else {
      this.randomQuote(quotes);
      console.log(`"${this.quote}" by ${this.author}`);
    }
  }
};

const myQuote = quoteShuffler;
myQuote.morningQuote(null, 'Kate Beckinsale');
// myQuote.quoteByGenre();
// console.log(myQuote);
