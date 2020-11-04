/* eslint-disable no-param-reassign */

const creditCardValidator = {
  /**
   * This object is about to apply luhn algorithm to check the credit card validty
   * reference page of luhn algorithm: https://en.wikipedia.org/wiki/Luhn_algorithm
   * source of card numbers are from : https://www.freeformatter.com/credit-card-number-generator-validator.html
   *
   *
   */
  cardArray: null,
  cardNumber: null,
  cardIssuer: null,
  cardValidity: null,
  cardInfo: null,

  isCardVaild(anyString) {
    /**
     * convert a string to an array of number
     * performe a luhn check of number validity
     * identify the issue bank of the card
     */

    this.cardArray = anyString.toString().split('').map(Number);
    this.cardNumber = this.cc_format(this.cardArray.join(''));
    this.cardIssuer = this.idInvalidCardByCompanies(this.cardArray);
    this.cardValidity = this.luhnCheck(this.cardArray);
    // this.cardNumber = this.chunk(this.cardArray, Math.floor(this.cardArray.length % 4) + 1);
    this.cardInfo = { 'Card number': this.cardNumber, 'Card issuer': this.cardIssuer, 'Card validity': this.cardValidity };
  },

  luhnCheck(array) {
    /**
     * it takes an array like [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
     * apply luhn algorithm to check cards validity
     * return a boolean value
     */

    let sum = array[array.length - 1];
    for (let i = 0; i < array.length - 1; i++) {
      let value = array[i];
      if (i % 2 === 0) {
        value *= 2;
      }
      if (value > 9) {
        value -= 9;
      }
      sum += value;
    }
    return sum % 10 === 0;
  },

  cc_format(value) {
    /**
     * https://stackoverflow.com/questions/36833366/format-credit-card-number
     */

    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{13,19}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    return value;
  },

  withinRange(number, start, end) {
    /**
     * a function to check the range of card's number
     * return a boolean value
     */
    if (!end) {
      end = start;
      start = 0;
    }
    if (start > end) {
      let swapVal = end;
      end = start;
      start = swapVal;
    }
    return number === start || number === end;
  },

  idInvalidCardByCompanies(array) {
    /**
     * it takes an array like [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
     * check the card issuer by card's IIN range and its digital length
     * return a string
     */

    // Credit card issuer             Starts with (IIN Range)                                       Length (number of digits)
    // American Express	              34, 37	                                                      15
    // Diners Club - Carte Blanche	  300, 301, 302, 303, 304, 305	                                14
    // Diners Club - International	  36	                                                          14
    // Diners Club - USA & Canada	    54	                                                          16
    // Discover	                      6011, 622126 to 622925, 644, 645, 646, 647, 648, 649, 65	    16-19
    // InstaPayment	                  637, 638, 639	                                                16
    // JCB	                          3528 to 3589	                                                16-19
    // Maestro	                      5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763	        16-19
    // MasterCard	                    51, 52, 53, 54, 55, 222100-272099	                            16
    // Visa	                          4	                                                            13-16-19
    // Visa Electron	                4026, 417500, 4508, 4844, 4913, 4917	                        16

    const validCardInitialRanges = {
      34: ['American Express', 0, 15],
      37: ['American Express', 0, 15],
      300: ['Diners Club - Carte Blanche', 0, 14],
      301: ['Diners Club - Carte Blanche', 0, 14],
      302: ['Diners Club - Carte Blanche', 0, 14],
      303: ['Diners Club - Carte Blanche', 0, 14],
      304: ['Diners Club - Carte Blanche', 0, 14],
      305: ['Diners Club - Carte Blanche', 0, 14],
      36: ['Diners Club - International', 0, 14],
      6011: ['Discover', 16, 19],
      644: ['Discover', 16, 19],
      645: ['Discover', 16, 19],
      646: ['Discover', 16, 19],
      647: ['Discover', 16, 19],
      648: ['Discover', 16, 19],
      649: ['Discover', 16, 19],
      65: ['Discover', 16, 19],
      637: ['InstaPayment', 0, 16],
      638: ['InstaPayment', 0, 16],
      639: ['InstaPayment', 0, 16],
      5018: ['Maestro', 16, 19],
      5020: ['Maestro', 16, 19],
      5038: ['Maestro', 16, 19],
      5893: ['Maestro', 16, 19],
      6304: ['Maestro', 16, 19],
      6759: ['Maestro', 16, 19],
      6761: ['Maestro', 16, 19],
      6762: ['Maestro', 16, 19],
      6763: ['Maestro', 16, 19],
      51: ['MasterCard', 0, 16],
      52: ['MasterCard', 0, 16],
      53: ['MasterCard', 0, 16],
      54: ['MasterCard / Diners Club - North America', 0, 16],
      55: ['MasterCard', 0, 16],
      4: ['Visa', 16, 19],
      4026: ['Visa Electron', 0, 16],
      417500: ['Visa Electron', 0, 16],
      4508: ['Visa Electron', 0, 16],
      4844: ['Visa Electron', 0, 16],
      4913: ['Visa Electron', 0, 16],
      4917: ['Visa Electron', 0, 16]
    };

    let issuer;

    // speccial check of Visa card with 13 digits
    if (array[0] === 4 && array.length === 13) {
      issuer = 'Visa';
    }

    // regular check based on list given
    for (let key in validCardInitialRanges) {
      if (
        key.toString() === array.slice(0, key.length).join('') &&
        this.withinRange(
          array.length,
          validCardInitialRanges[key][validCardInitialRanges[key].length - 2],
          validCardInitialRanges[key][validCardInitialRanges[key].length - 1]
        )
      ) {
        issuer = `${validCardInitialRanges[key][0]}`;
      }
    }

    // exceptional check for Discover
    if (!issuer) {
      for (let i = 622126; i <= 622925; i++) {
        if (i.toString() === array.slice(0, i.toString().length).join('') && this.withinRange(array.length, 16, 19)) {
          issuer = 'Discover';
        }
      }
    }

    // exceptional check for JCB
    if (!issuer) {
      for (let k = 3528; k <= 3589; k++) {
        if (k.toString() === array.slice(0, k.toString().length).join('') && this.withinRange(array.length, 16, 19)) {
          issuer = 'JCB';
        }
      }
    }

    // exceptional check for Mastercard
    if (!issuer) {
      for (let j = 222100; j <= 272099; j++) {
        if (j.toString() === array.slice(0, j.toString().length).join('') && array.length === 16) {
          issuer = 'MasterCard';
        }
      }
    }

    if (!issuer) {
      issuer = 'unknown';
    }

    return issuer;
  }
};

// All valid credit card numbers
const valid1 = '4539677908016808';
const valid2 = '5535766768751439';
const valid3 = '371612019985236';
const valid4 = '6011144340682905';
const valid5 = '4539404967869666';

// All invalid credit card numbers
const invalid1 = '4532778771091795';
const invalid2 = '5795593392134643';
const invalid3 = '375796084459914';
const invalid4 = '6011127961777935';
const invalid5 = '5382019772883854';

// Can be either valid or invalid
const mystery1 = '344801968305414';
const mystery2 = '5466100861620239';
const mystery3 = '6011377020962656203';
const mystery4 = '4929877169217093';
const mystery5 = '4913540463072523';

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5
];

const realCards = [4973559959580309, 5137420082059283];

// calling .isCardValid()
let myCard = creditCardValidator;
realCards.forEach((value) => {
  myCard.isCardVaild(value);
  // console.log(myCard);
  // console.log(myCard.cardIssuer, myCard.cardNumber, myCard.cardValidity);
  console.log(myCard.cardInfo);
});
