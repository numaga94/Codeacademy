const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    if (Array.isArray(field)) {
      this._field = field;
      this._myPostition = { row: 0, col: 0 };
      this._myTrace = [];
    }
  }

  print() {
    this._field.forEach((element) => {
      console.log(element.join(''));
    });
  }

  updateField() {
    this._field[this._myPostition.col][this._myPostition.row] = pathCharacter;
  }

  move() {
    let isHatFound = false;
    this.print();
    while (!isHatFound) {
      let x = 0;
      let y = 0;
      const input = prompt('Which direction do you want to go? "L, R, U, D"');
      const direction = input.toUpperCase();

      if (['L', 'R', 'U', 'D'].includes(direction)) {
        if (direction === 'L') {
          x--;
        } else if (direction === 'R') {
          x++;
        } else if (direction === 'U') {
          y--;
        } else {
          y++;
        }
        // console.log({ direction }, { x }, { y });
        this._myPostition.row += x;
        this._myPostition.col += y;
        if (this._myPostition.row < 0 || this._myPostition.col < 0) {
          throw Error('Attempts to move “outside” the field');
        } else if (this._field[this._myPostition.col][this._myPostition.row] === hat) {
          console.log('Wins by finding their hat');
          this._myTrace.push(this._myPostition);
          this.updateField();
          this.print();
          isHatFound = true;
        } else if (this._field[this._myPostition.col][this._myPostition.row] === hole) {
          console.log('Loses by landing on (and falling in) a hole.');
          this._myTrace.push(this._myPostition);
          this.updateField();
          this.print();
          isHatFound = true;
        } else {
          this._myTrace.push(this._myPostition);
          this.updateField();
          this.print();
        }
      } else {
        throw Error(`${direction} is not a valid direction.`);
      }
    }
  }

  static generateField(rows, columns, percentage = 0.3) {
    if (columns > 0 && rows > 0) {
      const randomField = [];
      const numberOfHolesPerRow = rows * percentage;
      for (let row = 0; row < rows; row++) {
        let holePostitions = [];
        // let counter = 0;
        while (holePostitions.length < numberOfHolesPerRow) {
          const random = Math.floor(Math.random() * columns);
          if (!holePostitions.includes(random)) {
            holePostitions.push(random);
          }
        }
        let randomRow = [];
        for (let col = 0; col < columns; col++) {
          if (holePostitions.includes(col)) {
            randomRow.push(hole);
          } else {
            randomRow.push(fieldCharacter);
          }
        }
        randomField.push(randomRow);
        randomRow = [];
        holePostitions = [];
      }
      randomField[0][0] = pathCharacter;
      randomField[Math.floor(Math.random() * rows)][Math.floor(Math.random() * columns)] = hat;
      return randomField;
    }
  }

  findHat(givenField, target = hat) {
    const hatPosition = [];
    givenField.forEach((rows, row) => {
      rows.forEach((value, col) => {
        if (value === target) {
          hatPosition.push(col, row);
        }
      });
    });
    return hatPosition;
  }

  // nextValidMove(x, y) {
  //   // this.print();
  //   // const startPosition = this.findHat(this._field, pathCharacter);
  //   // console.log(startPosition);
  //   // const x = startPosition[0];
  //   // const y = startPosition[1];
  //   const validNextPosition = [];
  //   // is moving right valid?
  //   if (this._field[y][x + 1] !== hole) {
  //     validNextPosition.push([x + 1, y]);
  //   }
  //   // is moving left valid ?
  //   if (x - 1 > 0 && this._field[y][x - 1] !== hole) {
  //     validNextPosition.push([x - 1, y]);
  //   }
  //   // is moving down valid ?
  //   if (this._field[y + 1][x] !== hole) {
  //     validNextPosition.push([x, y + 1]);
  //   }
  //   // is moving up valid ?
  //   if (y - 1 > 0 && this._field[y - 1][x] !== hole) {
  //     validNextPosition.push([x, y - 1]);
  //   }
  //   if (validNextPosition.length > 0) {
  //     return validNextPosition;
  //   }
  //   console.log('empty return validNextPostion');
  //   return [];
  // }

  // isShorterDistance(positions, targetPosition) {
  //   // console.log(targetPosition);
  //   // console.log(positions);
  //   if (positions.length === 1) {
  //     return positions[0];
  //   }
  //   if (positions.length > 1) {
  //     let shortestPostion = positions[0];
  //     let shortestDistance = Math.sqrt(
  //       Math.pow(shortestPostion[0] - targetPosition[0], 2) + Math.pow(shortestPostion[1] - targetPosition[1], 2)
  //     );
  //     for (let i = 1; i < positions.length; i++) {
  //       if (
  //         Math.sqrt(
  //           Math.pow(positions[i][0] - targetPosition[0], 2) + Math.pow(positions[i][1] - targetPosition[1], 2)
  //         ) < shortestDistance &&
  //         this._field[positions[i][1]][positions[i][0]] !== pathCharacter
  //       ) {
  //         shortestPostion = positions[i];
  //         shortestDistance = Math.sqrt(
  //           Math.pow(positions[i][0] - targetPosition[0], 2) + Math.pow(positions[i][1] - targetPosition[1], 2)
  //         );
  //       }
  //     }

  //     return shortestPostion;
  //   }
  // }

  // MazeSolver() {
  //   const startPosition = this.findHat(this._field, pathCharacter);
  //   const targetPosition = this.findHat(this._field);
  //   this._myPostition.row = startPosition[0];
  //   this._myPostition.col = startPosition[1];
  //   console.log({ startPosition });

  //   let isArrived = false;
  //   while (!isArrived) {
  //     console.log({ targetPosition });
  //     const nextMoves = this.nextValidMove(this._myPostition.row, this._myPostition.col);
  //     if (!nextMoves) {
  //       console.log('Cannot be solved');
  //       this.print();
  //       isArrived = true;
  //     }

  //     console.log({ nextMoves });
  //     const nextMove = this.isShorterDistance(nextMoves, targetPosition);

  //     console.log({ nextMove });

  //     if (!nextMove && Array.isArray(nextMove)) {
  //       console.log('Cannot be solved');
  //       this.print();
  //       isArrived = true;
  //     }

  //     if (this._field[nextMove[1]][nextMove[0]] === hat) {
  //       console.log('Wins by finding their hat');
  //       this._myPostition.row = nextMove[0];
  //       this._myPostition.col = nextMove[1];
  //       this._myTrace.push(this._myPostition);
  //       this.updateField();
  //       this.print();
  //       isArrived = true;
  //     } else {
  //       this._myPostition.row = nextMove[0];
  //       this._myPostition.col = nextMove[1];

  //       this._myTrace.push(this._myPostition);
  //       this.updateField();
  //       this.print();
  //       // console.log('oupoos dead end');
  //       isArrived = false;
  //     }
  //     // console.log('pass to next while loop');
  //   }
  // }
}

const myField = new Field(Field.generateField(10, 20, 0.4));

// console.log(myField);
// myField.print();
myField.move();

// console.log(myField.findHat(myField._field));

// console.log(myField.isShorterDistance(myField.nextValidMove()));

// myField.MazeSolver();
