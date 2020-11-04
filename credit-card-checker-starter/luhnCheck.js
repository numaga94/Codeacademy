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
  4716345519483255,
  4716390345015277,
  4539804448483701357,
  5598418992432725,
  5523257968003841,
  2720996104334309,
  374173072061008,
  370174930162982,
  374792779167071,
  6011775396204381,
  6011909604903175,
  6011018668850899415,
  3529996436537760,
  3534963493124349,
  3529827731133720751,
  5568775461797755,
  5449379655647879,
  5452405101444142,
  30174555354999,
  30112108779478,
  30226614908692,
  36206164368772,
  36654124450125,
  36041647300583,
  6762829559048571,
  5020822409418888,
  6761931896852110,
  4175006575859432,
  4844439151780576,
  4917497616447530,
  6370625572856964,
  6374097287055165,
  6374078162827159
];

// my functions below:
function numberToArray(arrays) {
  let arr = arrays.map((array) => {
    if (typeof array === 'number') {
      return array
        .toString()
        .split('')
        .map((el) => parseInt(el));
    }
    if (typeof array === 'string') {
      return array.split('').map((el) => parseInt(el));
    }
    if (typeof array === 'array') {
      return array;
    }
  });
  // console.log(arr);
  return arr;
}

// console.log(numberToArray(realCards));

function luhnCheck(array) {
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
}

function idInvalidCardByCompanies(array) {
  /**
   *  Credit card issuer            Starts with (IIN Range)                                       Length (number of digits)
      American Express	            34, 37	                                                      15
      Diners Club - Carte Blanche	  300, 301, 302, 303, 304, 305	                                14
      Diners Club - International	  36	                                                          14
      Diners Club - USA & Canada	  54	                                                          16
      Discover	                    6011, 622126 to 622925, 644, 645, 646, 647, 648, 649, 65	    16-19
      InstaPayment	                637, 638, 639	                                                16
      JCB	                          3528 to 3589	                                                16-19
      Maestro	                      5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763	        16-19
      MasterCard	                  51, 52, 53, 54, 55, 222100-272099	                            16
      Visa	                        4	                                                            13-16-19
      Visa Electron	                4026, 417500, 4508, 4844, 4913, 4917	                        16
   */
  const validCardInitialRanges = {
    34: 'American Express',
    37: 'American Express',
    300: 'Diners Club - Carte Blanche',
    301: 'Diners Club - Carte Blanche',
    302: 'Diners Club - Carte Blanche',
    303: 'Diners Club - Carte Blanche',
    304: 'Diners Club - Carte Blanche',
    305: 'Diners Club - Carte Blanche',
    36: 'Diners Club - International',
    6011: 'Discover',
    644: 'Discover',
    645: 'Discover',
    646: 'Discover',
    647: 'Discover',
    648: 'Discover',
    649: 'Discover',
    65: 'Discover',
    637: 'InstaPayment',
    638: 'InstaPayment',
    639: 'InstaPayment',
    5018: 'Maestro',
    5020: 'Maestro',
    5038: 'Maestro',
    5893: 'Maestro',
    6304: 'Maestro',
    6759: 'Maestro',
    6761: 'Maestro',
    6762: 'Maestro',
    6763: 'Maestro',
    51: 'MasterCard',
    52: 'MasterCard',
    53: 'MasterCard',
    54: 'MasterCard / Diners Club - North America',
    55: 'MasterCard',
    4: 'Visa',
    4026: 'Visa Electron',
    417500: 'Visa Electron',
    4508: 'Visa Electron',
    4844: 'Visa Electron',
    4913: 'Visa Electron',
    4917: 'Visa Electron'
  };

  let issuer;
  for (let key in validCardInitialRanges) {
    if (key.toString() === array.slice(0, key.length).join('')) {
      issuer = `${validCardInitialRanges[key]}`;
    }
  }

  if (!issuer) {
    for (let i = 622126; i <= 622925; i++) {
      if (i.toString() === array.slice(0, i.toString().length).join('')) {
        issuer = 'Discover';
      }
    }
  }

  if (!issuer) {
    for (let j = 222100; j <= 272099; j++) {
      if (j.toString() === array.slice(0, j.toString().length).join('')) {
        issuer = 'MasterCard';
      } else {
        issuer = 'unknown';
      }
    }
  }
  return issuer;
}

// console.log(inValidCardsCompanyNames);
// const uniqueArray = inValidCardsCompanyNames.filter((value, index) => {
//   return inValidCardsCompanyNames.indexOf(value) !== index;
// });
// return uniqueArray;
// return inValidCardsCompanyNames;

function isCardValid(number) {
  const array = numberToArray(number);
  // console.log(array);
  for (let element of array) {
    let cardIssuer = idInvalidCardByCompanies(element);
    // const cardIssuer = 'amex';
    if (luhnCheck(element)) {
      console.log(`Card # ${element.join('')} issued by ${cardIssuer} is vaild.`);
    }
    console.log(`Card # ${element.join('')} issued by ${cardIssuer} is not vaild.`);
  }
}

isCardValid(batch);
