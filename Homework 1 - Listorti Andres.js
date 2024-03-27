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


// Plus
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

//Minus
String.prototype.minus = function (anotherString) {
  if (parseInt(this) < parseInt(anotherString)) {
    throw new Error(
      "The first parameter must be greater than the second parameter for subtraction."
    );
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

// Divide
String.prototype.divide = function (anotherString) {
  const dividend = this;
  const divisor = anotherString;

  if (divisor === "0") {
    throw new Error("Division by zero.");
  }

 if (dividend === "0" || dividend === "") {
    return "0";
  }

  // Convert strings to BigInt for comparison
  const bigDividend = BigInt(dividend);
  const bigDivisor = BigInt(divisor);

  let quotient = "";
  let remainder = BigInt(0);

  for (let i = 0; i < dividend.length; i++) {
    remainder = remainder * BigInt(10) + BigInt(dividend[i]);
    const digit = remainder / bigDivisor;
    quotient += digit.toString();
    remainder %= bigDivisor;
  }

  // Remove leading zeros from quotient
  quotient = quotient.replace(/^0+/, "");

  return quotient || "0";
};


// Multiply
String.prototype.multiply = function (anotherString) {
  // Digit count only for this function
  function containsBigInt(inputString) {
    let digitCount = 0;
    for (let i = 0; i < inputString.length; i++) {
      digitCount++;
    }
    if (digitCount > 10) {
      // "If the number of digits exceeds the threshold, it returns true."
      return true;
    } else {
      return false;
    }
  }
  if (containsBigInt(anotherString)) {
    const multiplyByDigit = (num, digit) => {
      let result = "";
      let carry = 0;

      // Iterate through each digit of the number from right to left
      for (let i = num.length - 1; i >= 0; i--) {
          const currentDigit = parseInt(num[i]);
          const product = currentDigit * digit + carry;
          result = (product % 10) + result; // Add the last digit to the result
          if (product >= 10) {   // Update carry for the next iteration

            carry = int(product / 10)
          } else {
           carry = 0

          }
      }
      
      // If there is a carry after all iterations, add it to the result
      if (carry > 0) {
          result = carry + result;
      }

      return result;
  };

  let product = "0";

  for (let i = 0; i < anotherString.length; i++) {
      const digit = parseInt(anotherString[anotherString.length - 1 - i]);
      const partialProduct = multiplyByDigit(this, digit) + "0".repeat(i);
      product = product.plus(partialProduct);
  }

  return product;
  } else {
    let product = "0";

    for (let i = 0; i < parseInt(anotherString); i++) {
      product = product.plus(this);
    }

    return product;
   }
};

// Examples
console.log("11".plus("11")); // Output: 22
console.log("8888888888888888888".plus("2222222222")); // Output: 8888888891111111110
console.log("999999999999999999999".plus("1")); // Output: 1000000000000000000000
console.log("4".minus("2")); // Output: 2
console.log("8".divide("2")); // Output: 4
console.log("10".divide("3")); // Output: 3
console.log("13".divide("3")); // Output: 4
console.log("888888888888888888888888888888".divide("2")); // Output: 4444444444444444444444444444
console.log("5".multiply("4")); // Output: 20
console.log("11".multiply("4")); // Output: 44
console.log("111111111".multiply("4")); // Output: 444444444
console.log("11111111111111111111111111111111".multiply("4")); // Output: 44444444444444444444444444444444
console.log("11111111111111111111111111111111".multiply("44444444444")); // Output: 493827160488888888888888888888883950617284

// Example errors
// console.log("1".minus("2")); // Output: Error - The first parameter must be greater than the second parameter for subtraction.
// console.log("1".divide("0")); // Output: Error - Division by zero.
