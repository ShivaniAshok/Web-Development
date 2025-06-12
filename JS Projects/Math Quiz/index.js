const questionElem = document.getElementById('question');
const questionFormElem = document.getElementById('questionForm');
const scoreElem = document.getElementById('score');

let storedAnswer;
let score = parseInt(localStorage.getItem('score')) || 0;

const randomNumber = (min, max) => {
  //get random no. bet 2 values logic from mdn
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const randomNumber1 = randomNumber(1, 10);
  const randomNumber2 = randomNumber(1, 10);

  let question;
  let answer;
  let firstNumber;
  let secondNumber;

  const questionType = randomNumber(1, 4);

  if (
    randomNumber1 > randomNumber2 &&
    (questionType === 2 || questionType === 4)
  ) {
    firstNumber = randomNumber1;
    secondNumber = randomNumber2;
  } else {
    secondNumber = randomNumber1;
    firstNumber = randomNumber2;
  }

  switch (questionType) {
    case 1:
      question = `Q. What is ${firstNumber} add to ${secondNumber} ?`;
      answer = firstNumber + secondNumber;
      break;
    case 2:
      question = `Q. What is ${firstNumber} subtract from ${secondNumber} ?`;
      answer = firstNumber - secondNumber;
      break;
    case 3:
      question = `Q. What is ${firstNumber} multiply by ${secondNumber} ?`;
      answer = firstNumber * secondNumber;
      break;
    case 4:
      question = `Q. What is ${firstNumber} divide by ${secondNumber} ?`;
      answer = Math.floor(firstNumber / secondNumber);
      break;
  }
  return { question, answer };
};

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionElem.innerText = question;
  scoreElem.innerText = score;
  storedAnswer = answer;
  console.log('actual Answer: ', storedAnswer);
};
showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(questionFormElem);

  const userAnswer = parseInt(formData.get('answer'));
  console.log('user answer: ', userAnswer);

  if (userAnswer === storedAnswer) {
    score += 1;
    Toastify({
      text: `You are right and your score is ${score}`,
      className: 'info',
      gravity: 'bottom',
      position: 'center',
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text: `You are wrong and your score is ${score}`,
      className: 'info',
      gravity: 'bottom',
      position: 'center',
      style: {
        background: 'linear-gradient(to right, #e33217, #ff001e)',
      },
    }).showToast();
  }
  scoreElem.innerText = score;
  localStorage.setItem('score', score);
  event.target.reset();
  showQuestion();
};

questionFormElem.addEventListener('submit', checkAnswer);

const resetScore = () => {
  score = 0;
  localStorage.setItem('score', score);
  scoreElem.innerText = score;
};
