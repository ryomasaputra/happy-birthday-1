const MainModule = (function() {

  const $page = $('html'),
  $msg = $('#msg'),
  $ageText = $('#ageTxt'),
  $age = $('#age');
  myTime = 10,
  birthdayText = 'Happy Birthday, dear Father! :D';

  let randColor,
  randRed,
  growRed = true,
  passedTime = 0,
  strLength = birthdayText.length;

  return {

    init: () => {
      randRed = MainModule.getRandomRed();
      MainModule.timerActions(10);
    },

    getRandomRed: () => {
      let red = MainModule.getRandomVal(50, 100);
      return red;
    },

    decimalToBinary: (number, binaryNumber = 0) => {
      let val = MainModule.getClosestPowerOfTwo(number);
      number -= Math.pow(2, val);
      binaryNumber += Math.pow(10, val);
      if(number === 0) {
        return binaryNumber;
      } else {
        return MainModule.decimalToBinary(number, binaryNumber);
      }
    },

    getClosestPowerOfTwo: (number) => {
      if(number === 0) return null;
      let i = 0, power = 1;
      while(power <= number) {
        power *= 2;
        i++;
      }
      return (i - 1);
    },

    getRandomVal: (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    binNumberToBinaryOctetString: (binaryNumber) => {
      // works for binary numbers of max 8 digits
      let digitCount = MainModule.numOfDigits(binaryNumber), octString = "";
      for(let i = 1; i <= 8 - digitCount; i++) {
        octString += "0";
      }
      octString += binaryNumber;
      return octString;
    },

    numberToBinaryOctetString: (number) => {
      let binNumber = MainModule.decimalToBinary(number);
      let octBinNumber = MainModule.binNumberToBinaryOctetString(binNumber);
      return octBinNumber;
    },

    numOfDigits: (x) => {
      return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
    },

    changeColor: () => {

      if(growRed) {
        if(randRed < 150) {
          randRed++;
        } else {
          growRed = false;
          randRed--;
        }
      } else {
        if(randRed > 50) {
          randRed--;
        }
        else {
          growRed = true;
          randRed++;
        }
      }

      randColor = `rgb(${randRed},0,0)`;
      $page.css({'background-color': randColor});

    },

    getNextLetter: (myString, pos) => {
      if(pos <= strLength) {
        pos++;
        return myString[pos-1];
      } else {
        return null;
      }
    },

    setAge: (currentNumber, number, timeInterval) => {
      let currentAge = MainModule.numberToBinaryOctetString(currentNumber);
      $age.text(currentAge);
      if(currentNumber < number) {
        currentNumber++;
        setTimeout(() => {
          MainModule.setAge(currentNumber, number, timeInterval - 10);
        }, timeInterval);
      }
    },

    timerActions: (timeInterval) => {

      passedTime += timeInterval;
      if(passedTime % 120 === 0) {
        $msg.append(MainModule.getNextLetter( birthdayText, (passedTime / 120 - 1) ));
        if(passedTime % 240 === 0) {
          $msg.toggleClass('hidden');
        }
        if(passedTime / 120 - 1 === strLength) {
          $ageText.fadeIn(1000, () => {
            MainModule.setAge(1, 42, 500);
          });
        }
      }
      MainModule.changeColor();

      setTimeout(() => {
        MainModule.timerActions(timeInterval);
      } , timeInterval);

    }

  }

})();

$(document).ready(function() {
  MainModule.init();
});
