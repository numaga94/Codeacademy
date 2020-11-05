/* eslint-disable no-param-reassign */

const creditCardValidator = (stringOfCardNumber) => {
  /**
   * This object is about to apply luhn algorithm to check the credit card validty
   * reference page of luhn algorithm: https://en.wikipedia.org/wiki/Luhn_algorithm
   * source of card numbers are from : https://www.freeformatter.com/credit-card-number-generator-validator.html
   *
   *
   */

  return {
    stringOfCardNumber,
    cardArray: null,
    luhnSum: null,
    cardNumber: null,
    cardIssuer: null,
    cardValidity: null,
    cardInfo: null,

    isCardVaild() {
      /**
       * convert a string to an array of number
       * any numbers exceding 16 digits must be inputted as a string
       * performe a luhn check of number validity
       * identify the issue bank of the card
       */

      this.cardArray = this.stringOfCardNumber.toString().split('').map(parseFloat);
      this.numberformattor();
      this.idInvalidCardByCompanies();
      this.luhnCheck();
      this.cardInfo = { 'Card number': this.cardNumber, 'Card issuer': this.cardIssuer, 'Card validity': this.cardValidity };
    },

    luhnCheck() {
      /**
       * it takes an array like [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
       * apply luhn algorithm to check cards validity
       * return a boolean value
       */

      let sum = this.cardArray[this.cardArray.length - 1];
      for (let i = 0; i < this.cardArray.length - 1; i++) {
        let value = this.cardArray[i];
        if (i % 2 === 0) {
          value *= 2;
        }
        if (value > 9) {
          value -= 9;
        }
        sum += value;
      }

      this.luhnSum = sum;

      if (sum % 10 === 0) {
        this.cardValidity = true;
      } else {
        this.cardValidity = false;
      }
    },

    numberformattor() {
      /**
       * https://stackoverflow.com/questions/36833366/format-credit-card-number
       */

      // let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      // let matches = v.match(/\d{13,19}/g);
      // let match = (matches && matches[0]) || '';
      // let match = value;
      const parts = [];

      for (i = 0; i < this.stringOfCardNumber.length; i += 4) {
        parts.push(this.stringOfCardNumber.slice(i, i + 4));
      }

      if (parts.length > 0) {
        this.cardNumber = parts.join(' ');
      } else {
        this.cardNumber = this.stringOfCardNumber;
      }
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
        const swapVal = end;
        end = start;
        start = swapVal;
      }
      return number === start || number === end;
    },

    idInvalidCardByCompanies() {
      /**
       * it takes an this.cardArray like [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
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

      // speccial check of Visa card with 13 digits
      if (this.cardArray[0] === 4 && this.cardArray.length === 13) {
        this.cardIssuer = 'Visa';
      }

      // regular check based on list given
      for (const key in validCardInitialRanges) {
        if (
          key.toString() === this.cardArray.slice(0, key.length).join('') &&
          this.withinRange(
            this.cardArray.length,
            validCardInitialRanges[key][validCardInitialRanges[key].length - 2],
            validCardInitialRanges[key][validCardInitialRanges[key].length - 1]
          )
        ) {
          this.cardIssuer = `${validCardInitialRanges[key][0]}`;
        }
      }

      // exceptional check for Discover
      if (!this.cardIssuer) {
        for (let i = 622126; i <= 622925; i++) {
          if (i.toString() === this.cardArray.slice(0, i.toString().length).join('') && this.withinRange(this.cardArray.length, 16, 19)) {
            this.cardIssuer = 'Discover';
          }
        }
      }

      // exceptional check for JCB
      if (!this.cardIssuer) {
        for (let k = 3528; k <= 3589; k++) {
          if (k.toString() === this.cardArray.slice(0, k.toString().length).join('') && this.withinRange(this.cardArray.length, 16, 19)) {
            this.cardIssuer = 'JCB';
          }
        }
      }

      // exceptional check for Mastercard
      if (!this.cardIssuer) {
        for (let j = 222100; j <= 272099; j++) {
          if (j.toString() === this.cardArray.slice(0, j.toString().length).join('') && this.cardArray.length === 16) {
            this.cardIssuer = 'MasterCard';
          }
        }
      }

      // exceptional check for UnionPay
      if (!this.cardIssuer) {
        for (let c = 622126; c <= 622925; c++) {
          if (c.toString() === this.cardArray.slice(0, c.toString().length).join('') && this.withinRange(this.cardArray.length, 16, 19)) {
            this.cardIssuer = 'UnionPay';
          }
        }
      }

      if (!this.cardIssuer) {
        this.cardIssuer = 'unknown';
      }
    }
  };
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

const realCards = [
  '4973559959580309',
  '5137420082059283',
  '6217908500001991617',
  '6210986510012885898',
  '6013821000626830784',
  '6225760008219524',
  '6217856300020055847',
  '3544717251851619160'
];

// calling .isCardValid()
realCards.forEach((value) => {
  const myCard = creditCardValidator(value);
  myCard.isCardVaild();
  console.log(myCard);
  // console.log(myCard.cardIssuer, myCard.cardNumber, myCard.cardValidity);
  // console.log(myCard.cardInfo);
});
