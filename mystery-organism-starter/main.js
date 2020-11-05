// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum = Math.floor(Math.random() * 1000), dna = mockUpStrand()) => {
  /**
   * factory function pAequorFactory() that has two parameters:
   * The first parameter is number (no two organisms should have the same number).
   * The second parameter is an array of 15 DNA bases.
   * pAequorFactor() should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.
   */

  return {
    specimenNum,
    dna,

    mutate() {
      /**
       * Your team wants you to simulate P. aequor‘s high rate of mutation (change in its DNA).
       * To simulate a mutation, in pAequorFactory()‘s returned object, add the method .mutate().
       * .mutate() is responsible for randomly selecting a base in the object’s dna property and changing the current base to a different base.
       * Then .mutate() will return the object’s dna.
       * For example, if the randomly selected base is the 1st base and it is 'A', the base must be changed to 'T', 'C', or 'G'.
       * But it cannot be 'A' again.
       */

      // console.log(`original DNA = [${this.dna}]`);

      const randomIndex = Math.floor(Math.random() * 15);
      const randomBase = this.dna[randomIndex];
      const randomBaseIndex = Math.floor(Math.random() * 3);
      switch (randomBase) {
        case 'A':
          this.dna[randomIndex] = ['T', 'C', 'G'][randomBaseIndex];
          break;
        case 'T':
          this.dna[randomIndex] = ['A', 'C', 'G'][randomBaseIndex];
          break;
        case 'C':
          this.dna[randomIndex] = ['A', 'T', 'G'][randomBaseIndex];
          break;
        default:
          this.dna[randomIndex] = ['A', 'T', 'C'][randomBaseIndex];
          break;
      }
      // console.log(`Mutated DNA = [${this.dna}]`);
    },

    compareDNA(pAequor = mockUpStrand()) {
      /**
       * Your research team wants to be able to compare the DNA sequences of different P. aequor.
       * You’ll have to add a new method (.compareDNA()) to the returned object of the factory function.
       * .compareDNA() has one parameter, another pAequor object.
       * The behavior of .compareDNA() is to compare the current pAequor‘s .dna with the passed in pAequor‘s .dna and compute how many bases are identical and in the same locations. .compareDNA() does not return anything, but prints a message that states the percentage of DNA the two objects have in common — use the .specimenNum to identify which pAequor objects are being compared.
       *
       * For example:
       * ex1 = ['A', 'C', 'T', 'G']
       * ex2 = ['C', 'A', 'T', 'T']
       *
       * ex1 and ex2 only have the 3rd element in common ('T') and therefore, have 25% (1/4) of their DNA in common.
       * The resulting message would read something along the lines of: specimen #1 and specimen #2 have 25% DNA in common.
       */

      const identicialBases = [];
      for (let i = 0; i < 15; i++) {
        if (pAequor[i] === this.dna[i]) {
          identicialBases.push(this.dna[i]);
        }
      }

      const similarity = ((identicialBases.length / 15) * 100).toFixed(2);
      const randomSpecimenNum = this.specimenNum + 89;

      console.log(`original instance => ex${this.specimenNum} = [${this.dna}]`);
      console.log(`compairing instance => ex${randomSpecimenNum} = [${pAequor}]`);
      console.log(
        parseFloat(similarity) === 0
          ? `ex${this.specimenNum} and ex${randomSpecimenNum} don't have common elements and therefore, have ${similarity}% of their DNA in common.`
          : `ex${this.specimenNum} and ex${randomSpecimenNum} have the common elements [${identicialBases}] and therefore, have ${similarity}% of their DNA in common.`
      );
    },

    willLikelySurvive() {
      /**
       * P. aequor have a likelier chance of survival if their DNA is made up of at least 60% 'C' or 'G' bases.
       * In the returned object of pAequorFactory(), add another method .willLikelySurvive().
       * .willLikelySurvive() returns true if the object’s .dna array contains at least 60% 'C' or 'G' bases.
       * Otherwise, .willLikelySurvive() returns false.
       */
      const survivalBases = this.dna.filter((element) => {
        return element === 'C' || element === 'G';
      });

      const possibilityOfSurvival = ((survivalBases.length / 15) * 100).toFixed(2);
      if (possibilityOfSurvival >= 60) {
        // console.log(`ex${this.specimenNum} = [${this.dna}] has ${possibilityOfSurvival}% possibility of survival.`);
        return true;
      }
      return false;
    },

    complementStrand() {
      /**
       * Create a .complementStrand() method to the factory function’s object that returns the [complementary DNA strand]
       * (http://discoveringthegenome.org/discovering-genome/dna-sequencing/dna-complementary-base-pairing).
       * The rules are that 'A's match with 'T's and vice versa. Also, 'C's match with 'G's and vice versa.
       * Use the .compareDNA() to find the two most related instances of pAequor.
       */

      let complementPair = [];
      for (let i = 0; i < 15; i++) {
        switch (this.dna[i]) {
          case 'A':
            complementPair.push('T');
            break;
          case 'T':
            complementPair.push('A');
            break;
          case 'C':
            complementPair.push('G');
            break;
          default:
            complementPair.push('C');
            break;
        }
      }
      // console.log(`dna = [${this.dna}]`);
      // console.log(`pair= [${complementPair}]`);
      return complementPair;
    }
  };
};

// With the factory function set up, your team requests that you create 30 instances of pAequor that can survive in their natural environment.
// Store these instances in an array for your team to study later.
const survivals = () => {
  let counter = 0;
  const list = {};
  while (true) {
    const example = pAequorFactory();
    example.mutate();
    // example.compareDNA();
    if (example.willLikelySurvive()) {
      list[example.specimenNum] = example.dna;
      counter++;
    }
    if (counter > 30) {
      break;
    }
  }
  return list;
};

const instances = survivals();
for (let instance in instances) {
  console.log(`one of 30 instances of pAequor that can survive = [${instances[instance]}]`);
}

const newpAequor = pAequorFactory();
newpAequor.mutate();
// newpAequor.complementStrand();
newpAequor.compareDNA(newpAequor.complementStrand());
