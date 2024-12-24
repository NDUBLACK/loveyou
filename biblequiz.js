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
  {  question: "In the Old Testament, who was the king that wrote many of the Psalms?", answer: "David", options: ["Saul", "David", "Solomon", "Hezekiah"] },
  {  question: "According to Ecclesiastes, what does the teacher advise the young to remember in the days of their youth?", answer: "The fear of God", options: ["The pursuit of wisdom", "The fear of God", "The enjoyment of life", "The inevitability of death"] },
  {  question: "According to Ecclesiastes, what does the teacher see as the unavoidable reality for all living beings?", answer: "Life is fleeting", options: ["Life is eternal", "Life is fleeting", "Life is meaningless", "Life is controllable"] },
  {  question: "Which prophet foretold the birth of John the Baptist?", answer: "Malachi", options: ["Isaiah", "Jeremiah", "Malachi", "Micah"] },
  {  question: "In the New Testament, who was the king that ordered the massacre of male infants in Bethlehem in an attempt to kill Jesus?", answer: "Herod the Great", options: ["Herod Antipas", "Herod Agrippa", "Herodias", "Herod the Great"] },
  {  question: "Who was the king that tried to have Daniel thrown into the lion's den but later praised the God of Daniel?", answer: "Darius", options: ["Nebuchadnezzar", "Darius", "Belshazzar", "Cyrus"] },
  {  question: "In which city did the Apostle Paul encounter an altar with the inscription 'To the Unknown God'?", answer: "Athens", options: ["Jerusalem", "Ephesus", "Athens", "Corinth"] },
  {  question: "In which mountain range did Noah's Ark come to rest after the flood?", answer: "Ararat", options: ["Himalayas", "Andes", "Alps", "Ararat"] },
  {  question: "In which city was Jesus born?", answer: "Bethlehem", options: ["Jerusalem", "Bethlehem", "Nazareth", "Capernaum"] },
  {  question: "Which river did the people of Israel cross to enter the Promised Land?", answer: "Jordan", options: ["Nile", "Tigris", "Euphrates", "Jordan"] },
  {  question: "To whom did Jesus say 'Ye must be born again'?", answer: "Nicodemus", options: ["Nicodemus", "Simon of Cyrene", "Joseph of Arimathea", "Gamaliel"] },
  {  question: "How long had the infirm man lain at the pool of Bethesda?", answer: "38 years", options: ["1 year", "12 years", "25 years", "38 years"] },
  {  question: "What book comes before Daniel?", answer: "Ezekiel", options: ["Isaiah", "Joel", "Jeremiah", "Ezekiel"] },
  {  question: "Who was the prophet that anointed Elisha?", answer: "Elijah", options: ["Jeremiah", "Ezekiel", "Elijah", "Isaiah"] },
  {  question: "Who was the father of Elisha?", answer: "Shaphat", options: ["Zuriel", "Shelumiel", "Shaphat", "Jehu"] },
  {  question: "Which apostle was a Pharisee?", answer: "Paul", options: ["Peter", "James", "Paul", "Steven"] },
  {  question: "Who was the Israelites king during the time of the battle between David and Goliath?", answer: "Saul", options: ["Saul", "David", "Solomon", "Samuel"] },
  {  question: "What was the name of the valley where the battle between David and Goliath took place?", answer: "Valley of Elah", options: ["Valley of Elah", "Valley of Rephaim", "Valley of Achor", "Valley of Hinnom"] },
  {  question: "How many stones did David pick up from the brook before facing Goliath?", answer: "5", options: ["3", "5", "7", "9"] },
  {  question: "Who was swallowed by the Earth along with his followers as a sign of divine judgement?", answer: "Korah", options: ["Korah", "Dathan", "Abiram", "Moses"] },
  {  question: "Who brought a widow's son back to life in the town of Nain?", answer: "Jesus", options: ["Jesus", "Peter", "Paul", "Matthew"] },
  {  question: "Who provided food for Elijah by sending ravens to bring him bread and meat?", answer: "God", options: ["Elisha", "David", "Solomon", "God"] },
  {  question: "Which bird did Jesus say we have more value than?", answer: "Sparrow", options: ["Turtle dove", "Raven", "Eagle", "Sparrow"] },
  {  question: "What does a good tree bring forth?", answer: "Good fruit", options: ["Bad fruit", "Good fruit", "Green leaves", "Ripe fruit"] },
  {  question: "What is in the hypocrite's eye?", answer: "A beam", options: ["Dirt", "A fly", "A mote", "A beam"] },
  {  question: "In the Old Testament, who was the first king of Israel?", answer: "Saul", options: ["Saul", "David", "Solomon", "Hezekiah"] },
  {  question: "Which biblical king is known for his wisdom and building the Temple in Jerusalem?", answer: "Solomon", options: ["David", "Solomon", "Josiah", "Hezekiah"] },
  {  question: "Who was the king that was famously anointed by the prophet Samuel while he was still a shepherd?", answer: "David", options: ["Saul", "David", "Solomon", "Jehu"] },
  {  question: "In the parable of the prodigal son, who demanded his share of the inheritance and later squandered it?", answer: "Younger Son", options: ["Elder Son", "Younger Son", "Father", "Servant"] },
  {  question: "Which parable did Jesus use to convey the idea of persistence in prayer?", answer: "The Persistent Widow", options: ["The Persistent Widow", "The Unjust Steward", "The Ten Virgins", "The Rich Fool"] },
  {  question: "In the parable of the Talents, how many talents did the master give to each of his servant?", answer: "Different amount", options: ["5", "2", "1", "Different amount"] },
  {  question: "In which city did Paul write his letters to the Thessalonians, encouraging them in their faith and addressing questions about the Second Coming?", answer: "Corinth", options: ["Corinth", "Ephesus", "Thessalonica", "Philippi"] },
  {  question: "What letter of Paul emphasizes the concept of the 'body of Christ' using the analogy of the various parts working together?", answer: "1 Corinthians", options: ["1 Corinthians", "Ephesians", "Colossians", "Romans"] },
  {  question: "Which letter did Paul write to the church in Ephesus, highlighting the believer's spiritual armor and the unity of the body of Christ?", answer: "Ephesians", options: ["Galatians", "Ephesians", "Philippians", "Colossians"] },
  {  question: "Which prophet prophesied about the suffering servant who would bear the iniquities of many?", answer: "Isaiah", options: ["Zechariah", "Habakkuk", "Isaiah", "Joel"] },
  {  question: "Who was the prophet that preached to the people of Judah about the impending Babylonian captivity?", answer: "Jeremiah", options: ["Jeremiah", "Ezekiel", "Daniel", "Haggai"] },
  {  question: "Which prophet had a vision of a scroll with writing on both sides, containing messages of lamentations, mourning and woe?", answer: "Zechariah", options: ["Haggai", "Hosea", "Amos", "Zechariah"] },
  {  question: "Who was Solomon's father?", answer: "David", options: ["Saul", "David", "Solomon", "Rehoboam"] },
  {  question: "What was the subject of Solomon's wisdom that drew the attention of the Queen of Sheba?", answer: "Questions", options: ["Architecture", "Riddles", "Mathematics", "Questions"] },
  {  question: "What was the name of Solomon's mother?", answer: "Bathsheba", options: ["Abigail", "Bathsheba", "Michal", "Naamah"] },
  {  question: "What did Jesus say is as bad as murder?", answer: "Anger", options: ["Jealousy", "Anger", "Greed", "Adultery"] },
  {  question: "Who was compared unfavourably to the lilies of the field?", answer: "King Solomon", options: ["King Herod", "King Solomon", "King David", "King Ahab"] },
  {  question: "What should you not throw before swine?", answer: "Pearls", options: ["Food", "Pearls", "Bread", "Coins"] },
  {  question: "What was the first plague inflicted upon Egypt?", answer: "Water turned into blood", options: ["Frogs", "Lice", "Water turned into blood", "Flies"] },
  {  question: "Where did the Tribe of Issachar settle during the conquest of Canaan?", answer: "Jezreel Valley", options: ["Jezreel Valley", "Gilead", "Negev Desert", "Galilee"] },
  {  question: "Which warrior from the tribe of Judah defeated the giant Goliath?", answer: "David", options: ["David", "Jonathan", "Samson", "Saul"] },
  {  question: "What was the name of Joshua's father?", answer: "Nun", options: ["Caleb", "Eleazar", "Nun", "Moses"] },
  {  question: "Which biblical character from the Tribe of Issachar played a significant role in Israel's history, including migration stories?", answer: "Tola", options: ["Tola", "Zebulun", "Naphtali", "Manasseh"] },
  {  question: "Which book of the Bible is known for its exploration of the meaning of life and the pursuit of wisdom?", answer: "Ecclesiastes", options: ["Proverbs", "Songs of Solomon", "Ecclesiastes", "Job"] },
  {  question: "In the Book of Proverbs, what is often personified as a woman calling out to passerby to embrace wisdom?", answer: "Lady Wisdom", options: ["Folly", "Desire", "Understanding", "Lady Wisdom"] },
  {  question: "Who is traditionally credited with writing the majority of the Book of Proverbs, known for his wisdom?", answer: "Solomon", options: ["David", "Solomon", "Asaph", "Hezekiah"] },
  {  question: "In the Old Testament, who was the wife of Abraham and mother of Isaac?", answer: "Sarah", options: ["Mary", "Rachel", "Sarah", "Rebekah"] },
  {  question: "In the New Testament, who was known for her hospitality and opened her home to the apostle Paul and his companions in Philippi?", answer: "Lydia", options: ["Mary Magdalene", "Martha", "Lydia", "Priscilla"] },
  {  question: "From which part of Adam's body did God create Eve?", answer: "Rib", options: ["Hair", "Rib", "Teeth", "Leg"] },
  {  question: "In the Old Testament, who was the sister of Moses and a prophetess?", answer: "Miriam", options: ["Miriam", "Deborah", "Rahab", "Abigail"] },
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







