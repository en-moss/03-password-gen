// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function collectInfo() {
  let long = window.prompt("Enter how long you'd like your password to be? Enter a number between 8 and 128");
  long = Number(long)

  //Ensures that the number entered is within 8 and 128, and that it is entered as a number and not as text
  while (long < 8 || long > 128 || isNaN(long) == true) {
    if (long < 8 || long > 128) {
        window.alert("Your password length must be between 8 and 128");
    }
    else if (isNaN(long) == true) {
        window.alert("Please only enter a number between 8 and 128");
    };
    long = window.prompt("Enter how long you'd like your password to be? Enter a number between 8 and 128");
  };

  //Creates variables of each character type the user chooses to include in their password
  let lower = window.confirm("Do you want to include lowercase letters in your password?");
  let upper = window.confirm("Do you want to include uppercase letters in your password?");
  let num = window.confirm("Do you want to include numbers in your password?");
  let spec = window.confirm("Do you want to include special characters in your password?");


  //Ensures that the user picks at least one character type
  while (!lower && !upper && !num && !spec) {
      window.alert("You must choose at least one character type");
      lower = window.confirm("Do you want to include lowercase letters in your password?");
      upper = window.confirm("Do you want to include uppercase letters in your password?");
      num = window.confirm("Do you want to include numbers in your password?");
      spec = window.confirm("Do you want to include special characters in your password?");
  };

  let passwordOptions = {
    lower: lower,
    upper: upper,
    num: num,
    spec: spec,
    long: long,
  };
  return passwordOptions;
};

function generatePassword() {
let options = collectInfo();
//Declares an array for password characters to be stored in
let passArray = [];

//Loops the selection of characters for the length the user chose, iterating them in order from lower, upper, number, special
for (var i=0; i<options.long; i++) {
    if (options.lower) {
        //Randomly chooses lower case letter one at a time
        var randLower = function (min = 97, max = 122) {
            let diff = max - min;
            let rand = Math.floor(Math.random()*diff + 1);
            rand = rand + min;
            return rand;
        };
        let lowText = String.fromCharCode(randLower());
        passArray.push(lowText);
    };

    if (options.upper) {
        //Randomly chooses Upper case letter one at a time
        var randUpper = function (min = 65, max = 90) {
            let diff = max - min;
            let rand = Math.floor(Math.random()*diff + 1);
            rand = rand + min;
            return rand;
        };
        let upText = String.fromCharCode(randUpper());
        passArray.push(upText);
    };

    if (options.num) {
        //Randomly chooses a number one at a time
        var randNum = function (min = 48, max = 57) {
            let diff = max - min;
            let rand = Math.floor(Math.random()*diff + 1);
            rand = rand + min;
            return rand;
        }
        let numText = String.fromCharCode(randNum());
        passArray.push(numText);
    };
      if (options.spec) {
        //Randomly chooses special character one at a time
        let specialChar = ',./?!@#$%^&*()_-+=`~"/><';
        //Turns string into array
        specialChar = specialChar.split('');
        var randSpec = function () {
          let randomIndex = Math.floor(Math.random()*specialChar.length + 1);
          rand = specialChar[randomIndex];
          return rand;
        };
        let specText = randSpec();
        passArray.push(specText);
    };
  };

  //Cuts the array down to the length the user specified
  passArray = passArray.slice(0, options.long);

  //Shuffles the array so the password is not in a predictable sequence
  let arrayShuffle = function() {
    return passArray.sort(()=>Math.random()-0.5);
  };

  let password = arrayShuffle(passArray);
  return password.join('');
};