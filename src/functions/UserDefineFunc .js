import DeviceInfo from 'react-native-device-info';

export default class UserDefineFunc {
  getDeviceUniqueID() {
    //UseLess. Each install Android generate new UniquID for Security Resons
    //if you need to track licencess ask to sign with gmail,facebook
    //Use gmail to save/retrive user data file from server if uninstalled.
    let deviceID = DeviceInfo.getUniqueId(); //check whether Take Some Time.
    return deviceID;
  }

  getUserAvatar(gender) {
    if (gender === 'Male') return require('../assets/male.png');
    else return require('../assets/female.png');
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getNumbersForOperands(operand, level) {
    let resultString = '';
    let resultVal = 0;
    let dificulty = 10;
    if (level === '1') dificulty = 10;
    else if (level === '2') dificulty = 20;
    else if (level === '3') dificulty = 50;

    //console.log(dificulty);

    if (operand === '/') {
      let rand1 = Math.floor(Math.random() * dificulty);
      if (rand1 === 0) rand1 = dificulty - 1;

      let rand2 = Math.floor(Math.random() * dificulty);
      if (rand2 === 0) rand2 = dificulty - 1;

      resultVal = (rand1 * rand2) / rand2;
      resultString =
        '+' + (rand1 * rand2).toString() + ' / ' + rand2.toString();
    } else if (operand === '*') {
      let rand1 = Math.floor(Math.random() * dificulty);
      if (rand1 === 0) rand1 = dificulty - 1;

      let rand2 = Math.floor(Math.random() * dificulty);
      if (rand2 === 0) rand2 = dificulty - 1;

      resultVal = rand1 * rand2;
      resultString = '+' + rand1.toString() + ' * ' + rand2.toString();
    } else if (operand === '+') {
      let rand1 = Math.floor(Math.random() * dificulty);
      if (rand1 === 0) rand1 = dificulty - 1;

      resultVal = +rand1;
      resultString = '+' + rand1.toString();
    } else if (operand === '-') {
      let rand1 = Math.floor(Math.random() * dificulty);
      if (rand1 === 0) rand1 = 10 - 1;

      resultVal = -rand1;
      resultString = '-' + rand1.toString();
    }

    let arrayResult = [resultVal, resultString];

    return arrayResult;
  }

  generateCalculation(operationCount, level) {
    //operationCount = 3;
    if (operationCount === '4') {
      let operationCountArray = ['1', '2', '3'];
      operationCount = this.shuffleArray(operationCountArray)[0];
      //console.log(operationCount);
    }

    let operandsArrayMD = ['/', '*'];
    operandsArrayMD = this.shuffleArray(operandsArrayMD);
    let operandsArray = [operandsArrayMD[0], '+', '-'];

    operandsArray = this.shuffleArray(operandsArray).slice(
      0,
      parseInt(operationCount),
    );

    //console.log(operandsArray);
    if (operandsArray.indexOf('/') >= 0 || operandsArray.indexOf('*') >= 0) {
      //console.log(operandsArray.length);
    } else {
      operandsArray = [...operandsArray, '+', '-'];
      operandsArray = this.shuffleArray(operandsArray).slice(
        0,
        parseInt(operationCount) + 1,
      );
    }

    let resultString = '';
    let resultVal = 0;

    for (let i = 0; i < operandsArray.length; i++) {
      //console.log(array[i]);
      let returnArrayTemp = this.getNumbersForOperands(operandsArray[i], level);

      if (operandsArray[i] === '/') {
        resultString = resultString + returnArrayTemp[1];
        //resultVal = resultVal
      } else if (operandsArray[i] === '*') {
        resultString = resultString + returnArrayTemp[1];
        //resultVal = resultVal
      } else if (operandsArray[i] === '+') {
        resultString = resultString + returnArrayTemp[1];
        //resultVal = resultVal
      } else if (operandsArray[i] === '-') {
        resultString = resultString + returnArrayTemp[1];
        //resultVal = resultVal
      }
    }

    return resultString.trim().startsWith('+')
      ? resultString.substring(1)
      : resultString;
  }

  getAnswerArray(correctVal) {
    answerArray = [1, 1, 1, 1];
    let uniqueSet = new Set(answerArray);

    while (answerArray.length !== uniqueSet.size) {
      let randomVal1 = Math.floor(Math.random() * 10);
      if (randomVal1 === 0) randomVal1 = 10;

      let answer1 = Math.abs(correctVal + randomVal1);

      let randomVal2 = Math.floor(Math.random() * 20);
      if (randomVal2 === 0) randomVal2 = 20;

      let answer2 = Math.abs(correctVal - randomVal2);

      let randomVal3 = Math.floor(Math.random() * 30);
      if (randomVal3 === 0) randomVal3 = 30;

      let answer3 = Math.abs(correctVal - randomVal3);

      if (correctVal < 0) answer3 = -answer3;

      answerArray = [answer1, answer2, answer3, correctVal];
      uniqueSet = new Set(answerArray);
    }

    answerArray = this.shuffleArray(answerArray);

    return answerArray;
  }
}
