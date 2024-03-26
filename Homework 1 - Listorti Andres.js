// Homework 1: String Arithmetic Operations
// Deadline: April 4th
// Task:
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).
// Functions to Implement:
// •	String.plus(string): This function should take another string as input and return the result of adding the two strings together.
// •	String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.
// •	String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.
// •	String.multiply(string): This function should take another string as input and return the result of multiplying the two strings together.
// Constraints:
// •	All input and output numbers will be positive integers.
// •	For subtraction, ensure that the first parameter is always greater than the second parameter.
// •	Division should only result in an integer value.

String.prototype.plus = function (anotherString) {
  let result = "";
  let carry = 0;
  let maxLength =
    this.length > anotherString.length ? this.length : anotherString.length;

  for (let i = 0; i < maxLength || carry; i++) {
    const digit1 = parseInt(this[this.length - 1 - i] || 0);
    const digit2 = parseInt(anotherString[anotherString.length - 1 - i] || 0);
    const sum = digit1 + digit2 + carry;
    result = (sum % 10) + result;
    carry = sum >= 10 ? 1 : 0;
  }

  return result;
};

String.prototype.minus = function (anotherString) {

   if (parseInt(this) < parseInt(anotherString)) {
    throw new Error("The first parameter must be greater than the second parameter for subtraction.");
}

    let result = "";
    let borrow = 0;
  
    for (let i = 0; i < this.length; i++) {
      const digit1 = parseInt(this[this.length - 1 - i]);
      const digit2 = parseInt(anotherString[anotherString.length - 1 - i] || 0);
      let difference = digit1 - digit2 - borrow;
      if (difference < 0) {
        difference += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result = difference + result;
    }
  
    return result.replace(/^0+/, ""); // Remove leading zeros
  

};

String.prototype.divide = function (anotherString) {
  let dividend = parseInt(this);
  const divisor = parseInt(anotherString);
  let quotient = 0;

  while (dividend >= divisor) {
    dividend -= divisor;
    quotient++;
  }

  return quotient.toString();
};

String.prototype.multiply = function (anotherString) {
  let product = "0";

  for (let i = 0; i < parseInt(anotherString); i++) {
    product = product.plus(this);
  }

  return product;
};

// Examples
console.log("11".plus("11")); // Output: 22
console.log("4".minus("2")); // Output: 2
console.log("8".divide("2")); // Output: 4
console.log("5".multiply("4")); // Output: 20
console.log("10".divide("3")); // Output: 3

// Will throw an error
// console.log("1".minus("2")); // Output: Error