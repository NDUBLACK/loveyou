const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () => {
  popupInfo.classList.add('active');
  main.classList.add('active')
}

exitBtn.onclick = () => {
  popupInfo.classList.remove('active');
  main.classList.remove('active')
}

continueBtn.onclick = () => {
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active'); 

  showQuestions(0);
  questionCounter(1);
  headerScore();
}

tryAgainBtn.onclick = () => {
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  headerScore();
}

goHomeBtn.onclick = () => {
  quizSection.classList.remove('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  headerScore();
}

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove('active');
  }
  else {
    showResultBox();
  }
}

const optionList = document.querySelector('.option-list');

// Getting questions and options from array
function showQuestions(index) {
  const questionText = document.querySelector('.question-text');
  questionText.textContent = `${questions[index].question}`; // Only display the question text
  
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                   <div class="option"><span>${questions[index].options[1]}</span></div>
                   <div class="option"><span>${questions[index].options[2]}</span></div>
                   <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'optionSelected(this)');
  }
}


function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
      answer.classList.add('correct');
      userScore += 1;
      headerScore()
  }
  else {
    answer.classList.add('incorrect');

    // If answer incorrect, auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
          optionList.children[i].setAttribute('class', 'option correct');
      }
    }
  }

  // If user has selected, disabled all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add('disabled');
  }

  nextBtn.classList.add('active');
}


function questionCounter(index) {
  const questionTotal = document.querySelector('.question-total');
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
  const headerScoreText = document.querySelector('.header-score');
  headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove('active');
  resultBox.classList.add('active');
  
  const scoreText = document.querySelector('.score-text');
  scoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`;

  const circularProgress = document.querySelector('.circular-progress');
  const progressValue = document.querySelector('.progress-value');
  let progressStartValue = -1;
  let progressEndValue = Math.round((userScore / questions.length) * 100);
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

    if (progressStartValue >= progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}

  


let globalTimer; // Variable for the 2-minute timer
let timeLeft = 120; // 2 minutes in seconds

function startGlobalTimer() {
  const timerDisplay = document.querySelector('.global-timer');
  timerDisplay.textContent = formatTime(timeLeft);

  globalTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(globalTimer);
      restartQuiz(); // Restart the quiz when time expires
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function restartQuiz() {
  timeLeft = 120; // Reset the timer
  clearInterval(globalTimer); // Clear the timer
  goHomeBtn.click(); // Trigger the goHome button logic to reset the quiz
}

continueBtn.onclick = () => {
  quizSection.classList.add('active');
  popupInfo.classList.remove('active');
  main.classList.remove('active');
  quizBox.classList.add('active');

  showQuestions(0);
  questionCounter(1);
  headerScore();
  startGlobalTimer(); // Start the 2-minute timer
};

let questionsPool = [
  // 55 question objects in the same format as the current array
  {  question: "What can't you know about an electron at the same time?", answer: "Position and momentum", options: ["Momentum and mass", "Position and momentum", "Position and mass", "Position and charge"] },
  {  question: "People who study the past are called?", answer: "Historian", options: ["Writers", "Archaelogists", "Historian", "Economist"] },
  {  question: "What is the densest jungle in the world?", answer: "Amazon rainforest", options: ["Congo rainforest", "Amazon rainforest", "Australiasian Realm", "Sundaland"] },
  {  question: "What type of gas is absorbed by plants?", answer: "Carbondioxide", options: ["Oxygen", "Ammonia", "Carbondioxide", "Nitrogen"] },
  {  question: "What is the smallest continent?", answer: "Australia", options: ["Australia", "Europe", "Antarctica", "Africa"] },
  {  question: "What is the longest river in the world?", answer: "Nile", options: ["Nile", "Congo", "Benue", "Niger"] },
  {  question: "What color symbolises peace?", answer: "White", options: ["Green", "White", "Purple", "Black"] },
  {  question: "What does USB stand for?", answer: "Universal Serial Bus", options: ["Unique Serial Bus", "Universal Serial Bus", "Unary Serial Bus", "Universal Secondary Bus"] },
  {  question: "What is the largest desert on Earth?", answer: "Antarctica", options: ["Arctic", "Sahara", "Arabian", "Antarctica"] },
  {  question: "Which is the oldest form of government?", answer: "Monarchy", options: ["Monarchy", "Democracy", "Anarchy", "Parliamentarian"] },
  {  question: "What is the fastest land animal?", answer: "Cheetah", options: ["Red Fox", "Lion", "Cheetah", "Pig"] },
  {  question: "What is the only even prime number?", answer: "2", options: ["2", "4", "5", "9"] },
  {  question: "What letter(s) does not appear on the periodic table?", answer: "J and Q", options: ["J", "Q", "J and Q", "Z"] },
  {  question: "What is the perimeter of a circle called?", answer: "Circumference", options: ["Parameter", "Segment", "Radius", "Circumference"] },
  {  question: "What does SWOT mean?", answer: "Strengths, Weaknessess, Opportunities, Threats", options: ["Sales, Weaknessess, Options, Threats", "Sales, Weekly, Opportunities, Time", "Strengths, Weaknessess, Opportunities, Threats", "Strengths, Weaknessess, Opportunities, Time"] },
  {  question: "What is the largest organ in the human body?", answer: "Skin", options: ["Skin", "Liver", "Kidney", "Hair"] },
  {  question: "What is the smallest planet in our solar system?", answer: "Mercury", options: ["Pluto", "Venus", "Jupiter", "Mercury"] },
  {  question: "What is the largest planet in our solar system?", answer: "Jupiter", options: ["Pluto", "Venus", "Jupiter", "Mercury"] },
  {  question: "Which is the nearest planet to Earth in our solar system?", answer: "Mercury", options: ["Pluto", "Venus", "Jupiter", "Mercury"] },
  {  question: "Which continent is known as the 'Dark Continent'?", answer: "Africa", options: ["Australia", "Europe", "Antarctica", "Africa"] },
  {  question: "What is the smallest country in the world by land area?", answer: "Vatican City", options: ["Nauru", "Tuvalu", "Monaco", "Vatican City"] },
  {  question: "A natural satelite of Earth is?", answer: "Sun", options: ["Sun", "Mars", "Pluto", "Mercury"] },
  {  question: "What does DNA stand for?", answer: "Deoxyribonucleic acid", options: ["Deoxyribonuclei acid", "Deoxyribonucleic acid", "Oxyribonucleic acid", "Ribonucleic acid"] },
  {  question: "How many teeth does an adult human have?", answer: "32", options: ["32", "36", "34", "30"] },
  {  question: "How many bones are in the human body?", answer: "206", options: ["306", "106", "406", "206"] },
  {  question: "At what temperature are Celcius and Fahrenheit equal?", answer: "-40 C", options: ["-25 C", "-35 C", "-40 C", "-30 C"] },
  {  question: "Who discovered protons?", answer: "Ernest Rutherford", options: ["Ernest Rutherford", "James Chadwick", "Thomas Young", "Michael Faraday"] },
  {  question: "Which country has the highest life expectancy?", answer: "Hong Kong", options: ["South Africa", "Nigeria", "America", "Hong Kong"] },
  {  question: "Aureolin is a shade of what color?", answer: "Yellow", options: ["Blue", "Yellow", "Orange", "White"] },
  {  question: "How many faces does a Dodecahedron have?", answer: "12", options: ["5", "7", "11", "12"] },
  {  question: "What is the 4th letter of the Greek alphabet?", answer: "Delta", options: ["Alpha", "Beta", "Gamma", "Delta"] },
  {  question: "How many dots appear on a pair of dice?", answer: "42", options: ["32", "16", "42", "26"] },
  {  question: "What is acrophobia a fear of?", answer: "Heights", options: ["Heights", "Closed spaces", "Food", "Water"] },
  {  question: "What is the world's largest retailer?", answer: "Walmart", options: ["Jumia", "Walmart", "Konga", "Shoprite"] },
  {  question: "What city is known as 'The Eternal City'?", answer: "Rome", options: ["Argentina", "Monaco", "France", "Rome"] },
  {  question: "In which country would you find Mount Kilimanjaro?", answer: "Tanzania", options: ["Nigeria", "Zambia", "Tanzania", "Ireland"] },
  {  question: "Which is the only continent with land in all four hemispheres?", answer: "Africa", options: ["Europe", "Africa", "Australia", "Asia"] },
  {  question: "The capital of Bulgaria is?", answer: "Sofia", options: ["Sofia", "Dublin", "Sydney", "Regain"] },
  {  question: "What is the only flag that does not have four sides?", answer: "Nepal", options: ["Ukraine", "South Africa", "Monaco", "Nepal"] },
  {  question: "How many elements are in the periodic table?", answer: "118", options: ["112", "113", "114", "118"] },
  {  question: "Which planet in the Milky Way is the hottest?", answer: "Venus", options: ["Venus", "Mercury", "Jupiter", "Saturn"] },
  {  question: "Which planet has the most moons?", answer: "Saturn", options: ["Venus", "Mercury", "Jupiter", "Saturn"] },
  {  question: "Where is the strongest human muscle located?", answer: "Jaw", options: ["Skull", "Jaw", "Neck", "Knee"] },
  {  question: "How many bones do we have in an ear?", answer: "3", options: ["1", "2", "3", "4"] },
  {  question: "What is the chemical element with the symbol Fe?", answer: "Iron", options: ["Aluminium", "Copper", "Iron", "Sodium"] },
  {  question: "What does FIFA stand for in English?", answer: "International Federation of Association Football", options: ["International Federation of Association Football", "Federation International of Association Football", "Football International of Association Federation", "International of Association Football Federation"] },
  {  question: "Which country has won the most World Cups?", answer: "Brazil", options: ["Costa Rica", "England", "Nigeria", "Brazil"] },
  {  question: "Who was the world's highest-paid athlete in 2023?", answer: "Cristiano Ronaldo", options: ["Lionel Messi", "Cristiano Ronaldo", "Tyson Fury", "Mohammed Ali"] },
  {  question: "What animal has the most powerful bite in the world?", answer: "Nile Crocodile", options: ["Nile Crocodile", "Lion", "Snake", "Hippopotamus"] },
  {  question: "What is a group of crows called?", answer: "Murder", options: ["Fleet", "Dozen", "Murder", "List"] },
  {  question: "What is a group of pandas known as?", answer: "Embarrassment", options: ["Fleet", "Dozen", "Murder", "Embarrassment"] },
  {  question: "What animal has the longest tongue?", answer: "Giraffe", options: ["Whale", "Lizard", "Giraffe", "Chameleon"] },
  {  question: "How many hearts does an octopus have?", answer: "3", options: ["1", "2", "3", "4"] },
  {  question: "Who was the first Disney princess?", answer: "Snow White", options: ["Snow White", "Cindarella", "Frozen", "Sofia the First"] },
  {  question: "What is the world's best-selling stout beer?", answer: "Guinness", options: ["Star Lager", "Guinness", "Smirnoff", "Coca Cola"] },
];


function getRandomQuestions() {
  let shuffledQuestions = questionsPool.sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, 10);
}

let questions = getRandomQuestions(); // This will be your 10-question array

tryAgainBtn.onclick = () => {
  questions = getRandomQuestions(); // Generate a new set of 10 questions
  quizBox.classList.add('active');
  nextBtn.classList.remove('active');
  resultBox.classList.remove('active');

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  headerScore();
  timeLeft = 120; // Reset global timer
  startGlobalTimer();
};