let firstLine;
let secondLine;
let thirdLine;
let fourthLine;

const handleCaption = function(input) {
  const first = [];
  const second = [];
  const third = [];
  const fourth = [];
  let count = 0;

  const inputArr = input.split(' ');

  if (input.length <= 38) {
    for (let i = 0; i < inputArr.length; i += 1) {
      count += inputArr[i].length;
      if (count <= 19) {
        first.push(inputArr[i]);
        count += 1;
      } else {
        fourth.push(inputArr[i]);
      }
    }
  } else if (input.length > 38 && input.length <= 57) {
    for (let i = 0; i < inputArr.length; i += 1) {
      count += inputArr[i].length;
      if (count <= 19) {
        first.push(inputArr[i]);
        count += 1;
      } else if (count <= 38) {
        third.push(inputArr[i]);
        count += 1;
      } else {
        fourth.push(inputArr[i]);
      }
    }
  } else if (input.length > 57) {
    for (let i = 0; i < inputArr.length; i += 1) {
      count += inputArr[i].length;
      console.log(count);
      if (count <= 19) {
        first.push(inputArr[i]);
        count += 1;
      } else if (count <= 38) {
        second.push(inputArr[i]);
        count += 1;
      } else if (count <= 57) {
        third.push(inputArr[i]);
        count += 1;
      } else {
        fourth.push(inputArr[i]);
      }
    }
  }
  firstLine = first.join(' ');
  secondLine = second.join(' ');
  thirdLine = third.join(' ');
  fourthLine = fourth.join(' ');
};

module.exports = {
  handleCaption: handleCaption,
  firstLine: firstLine,
  secondLine: secondLine,
  thirdLine: thirdLine,
  fourthLine: fourthLine
};
handleCaption("kjehtk jhkejj kjjtjej waekjrlkjwelkrjth thjsjewerkjkeek kkekeek wkwkwkwk jj");
console.log(firstLine, '2: ', secondLine, '3: ', thirdLine, '4: ', fourthLine);

