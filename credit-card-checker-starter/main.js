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

// Add your functions below:
function numbers(arrays) {
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
  return arr;
}

function validateCred(array) {
  let sum = array.pop();
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
  console.log(array.join(''), sum % 10 === 0);
}

function findInvalidCards(arrays) {
  const checks = arrays.filter((array) => {
    if (!validateCred(array)) {
      return array;
    }
  });
  return checks;
}

function idInvalidCardCompanies(arrays) {
  // 3 Amex (American Express) 4 Visa 5 Mastercard 6 Discover

  const inValidCardsCompanyNames = [];
  arrays.forEach((array) => {
    switch (array.shift()) {
      case 3:
        if (!inValidCardsCompanyNames.includes('Amex')) {
          inValidCardsCompanyNames.push('Amex');
        }
        break;
      case 4:
        if (!inValidCardsCompanyNames.includes('Visa')) {
          inValidCardsCompanyNames.push('Visa');
        }
        break;
      case 5:
        if (!inValidCardsCompanyNames.includes('Mastercard')) {
          inValidCardsCompanyNames.push('Mastercard');
        }
        break;
      case 6:
        if (!inValidCardsCompanyNames.includes('Discover')) {
          inValidCardsCompanyNames.push('Discover');
        }
        break;
      default:
        if (!inValidCardsCompanyNames.includes('Company not found')) {
          inValidCardsCompanyNames.push('Company not found');
        }
        break;
    }
  });
  // console.log(inValidCardsCompanyNames);
  // let uniqueArray = inValidCardsCompanyNames.filter((value, index) => {
  //   return inValidCardsCompanyNames.indexOf(value) !== index;
  // });
  // return uniqueArray;
  return inValidCardsCompanyNames;
}

const cards = numbers(realCards);
// console.log(cards);
const inVaildCards = findInvalidCards(cards);
// console.log(idInvalidCardCompanies(inVaildCards));
// console.log(inVaildCards);
