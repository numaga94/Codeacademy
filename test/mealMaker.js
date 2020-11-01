/*
Meal Maker
As a frequent diner, you love trying out new restaurants and experimenting with different foods. However, having to figure out what you want to order can be a time-consuming ordeal if the menu is big, and you want an easier way to be able to figure out what you are going to eat.

In this project, you’ll use JavaScript to randomly create a three-course meal based on what is available on a menu. We’ll keep running it until we’re satisfied with the generated meal!
*/


const menu = {

    //Add a _courses property to your menu object and set its value to an empty object. 
    //This property will ultimately contain a mapping between each course and the dishes available to order in that course.
    _courses: {
      appetizers:[],
      mains:[],
      desserts:[]
    },
  
    // getter and setter methods for the appetizers, mains, and desserts properties.
    get appetizers() {
      if (this._courses.appetizers){
        return this._courses.appetizers;
      }
    },
  
    set appetizers(name) {
      if (typeof name === 'object'){
        this._courses.appetizers.push(name);
      }
    },
  
     get mains() {
      if (this._courses.mains){
        return this._courses.mains;
      }
    },
  
    set mains(name) {
      if (typeof name === 'object'){
        this._courses.mains.push(name);
      }
    },
  
     get desserts() {
      if (this._courses.desserts){
        return this._courses.desserts;
      }
    },
  
    set desserts(name) {
      if (typeof name === 'object'){
        this._courses.desserts.push(name);
      }
    },

    // courses getter method, return an object that contains key/value pairs for appetizers, mains, and desserts.
    get courses(){
      return {
        appetizers: this._courses.appetizers,
        mains: this._courses.mains,
        desserts: this._courses.desserts
      }
    },
  
    // used to add a new dish to the specified course on the menu.
    // The method should take in three parameters: the courseName, the dishName , and the dishPrice.
    // The method should then push this dish object into the appropriate array in your menu‘s _courses object based on what courseName was passed in.
    addDishToCourse(courseName, dishName, dishPrice){
      const dish = {
        name: dishName,
        price: dishPrice
      }
      this._courses[courseName].push(dish);
    },
  
    // menu object called .getRandomDishFromCourse(). It will take in one parameter which is the courseName.
    // Retrieve the array of the given course’s dishes from the menu‘s _courses object and store in a variable called dishes.
    // Generate a random index by multiplying Math.random() by the length of the dishes array (This will guarantee that the random number will be between 0 and the length of the array)
    // Round that generated number to a whole number by using Math.floor() on the result.
    // Return the dish located at that index in dishes.
    getRandomDishFromCourse(courseName) {
      const dishes = this._courses[courseName];
      const randomIndex = Math.floor(Math.random() * dishes.length);
      return dishes[randomIndex];
    },
  
    // .generateRandomMeal() function which will automatically generate a three-course meal for us. The function doesn’t need to take any parameters.
    // The function should create an appetizer variable which should be the result of calling the .getRandomDishFromCourse() method when we pass in an appetizers string to it.
    // Create a main variable and dessert variable the same way you created the appetizer variable, but make sure to pass in the right course type.
    // Calculates the total price and returns a string that contains the name of each of the dishes and the total price of the meal, formatted as you like.
    generateRandomMeal(){
      const appetizer = this.getRandomDishFromCourse('appetizers');
      const main = this.getRandomDishFromCourse('mains');
      const dessert = this.getRandomDishFromCourse('desserts'); 
      const totalPrice = appetizer.price + main.price + dessert.price
      return `appetizer: ${appetizer.name}\nmain: ${main.name}\ndessert: ${dessert.name}\nTotal price: ${totalPrice}`;
    }
  
  }
  
  menu.addDishToCourse('appetizers', 'Escargots a la Bourguignonne', 10);
  menu.addDishToCourse('appetizers', 'Provençal Stuffed Squid', 9);
  menu.addDishToCourse('appetizers', 'Duck Pâté en Croûte', 8);
  menu.addDishToCourse('mains', 'Foie gras', 26);
  menu.addDishToCourse('mains', 'Confit de canard', 18);
  menu.addDishToCourse('mains', 'Poulet Basquaise', 20);
  menu.addDishToCourse('desserts', 'Tarte Tatin', 7);
  menu.addDishToCourse('desserts', 'Pot de crème', 9);
  menu.addDishToCourse('desserts', 'Opera cake', 10);
  
  menu.appetizers = {name: '酸辣汤', price: 10};
  menu.mains = {name: '粉蒸肉', price: 20}  
  menu.desserts = {name: '奶昔', price: 11};
  
  console.log(menu.generateRandomMeal());
  // console.log(menu.appetizers);
  // console.log(menu.mains);
//   console.log(menu.desserts);
  // console.log(menu.courses);
  
  
  