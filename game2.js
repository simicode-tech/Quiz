const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
// let questionAnswer = 
var time = 15;
var min = 10;

let questions = [
  {
    question : "WHAT IS FULL MEANING OF HTML?",
    choice1:"HYPER TEXT MARKUP LANGUAGE",
    choice2:"HYPER TEST MARKUP LANGUAGE",
    choice3:"HYPER TEXT MARKUPS LANGUAGE",
    choice4:"HIPER TEXT MARKUP LANGUAGGE",
    answer:1
 },
 {
    question:"WHICH YEAR IS JAVASCRIPT WAS STANDARDIZES IN THE 'ECMASCRIPT' SPEC.?",
    choice1:1996,
    choice2:1997,
    choice3:2005,
    choice4:1998,
    answer:2
 },
 {
     question:"TYPE OF PROGRAMMING LANGUAGE?",
     choice1:"MACHINE CODE AND ASSEMBLY LANGUAGE",
     choice2:"ASSEMBLY AND HIGH LEVEL LANGUAGE",
     choice3:"LOW LEVEL AND HIGH LEVEL LANGUAGE",
     choice4:"MACHINE AND HIGH LEVEL LANGUAGE",
     answer:3
 },
 {
     question:"HOW MANY TYPE OF SCOPE DO WILL HAVE",
     choice1:2,
     choice2:3,
     choice3:1,
     choice4:4,
     answer:1
 },
  {
    question: 'Inside which HTML element do we put the JavaScript??',
    choice1: '<script>',
    choice2: '<javascript>',
    choice3: '<js>',
    choice4: '<scripting>',
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign('./end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  console.log(choice);
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = `${score}%`;
};

startGame();

// function endGame() {
//   setInterval(() => {
//     time--;
//     min--;
//     document.getElementById('time').innerText = time;
//     // if (time === 0) {
//     //   return window.location.assign('/end.html');

//     // }
//     if (availableQuesions.length == time ) {
//       // return window.location.assign('./end.html');
//     }
//     startGame();

//   }, 2000);
// }
// console.log(time);
// function endGame() {
//   setInterval(() =>{
//     time--;
//     document.getElementById("time").innerText = time;
//     if (time < 1) {
//       document.questionCounter.submit();
//       return window.location.assign('./end.html');
//     }
//   },2000)
// }
// endGame();
