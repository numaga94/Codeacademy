const Calculate = {
  factorial(inputNum) {
    if (typeof inputNum !== 'number') {
      throw Error('.factorial method takes only number as input');
    }
    if (inputNum === 0) {
      return 1;
    }
    for (let i = inputNum - 1; i > 0; i--) {
      inputNum *= i;
    }
    return inputNum;
  }
};

export default Calculate;
