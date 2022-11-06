// variables set to help identify and locate specific elements
var startBtn = document.querySelector('.start-button');
var resetBtn = document.querySelector('.reset-button');
var scoresBtn = document.querySelector('.scores-button');

var timerTxt = document.querySelector('.timer-text');
var lastScore = document.querySelector('.last-score');

var cardContent = document.querySelector('.card-content');
var cardBtm = document.querySelector('.card-bottom');
// create the element to display the questions, add styling
var questionEl = document.createElement('h5');
questionEl.classList.add('question-style');
// create buttons to reperesent the 4 answer choices, add styling, and the value to determine true/false
var choiceEl1 = document.createElement('button');
var choiceEl2 = document.createElement('button');
var choiceEl3 = document.createElement('button');
var choiceEl4 = document.createElement('button');
var choiceSty = document.querySelector('.choice-style');
choiceEl1.classList.add('choice-style');
choiceEl2.classList.add('choice-style');
choiceEl3.classList.add('choice-style');
choiceEl4.classList.add('choice-style');
var valueCh1 = choiceEl1.getAttribute('value');
var valueCh2 = choiceEl2.getAttribute('value');
var valueCh3 = choiceEl3.getAttribute('value');
var valueCh4 = choiceEl4.getAttribute('value');
// create varabile to display current score, and add styling 
var scoreEl = document.createElement('h6');
scoreEl.classList.add('current-score');
// create a place to hold info on whether the selected choice is correct or not
var correctEl = document.createElement('p');
correctEl.classList.add('is-correct');
// create quit button to exit the quiz, style
var quitEl = document.createElement('button');
quitEl.classList.add('quit-button');
quitEl.textContent = 'Quit';
// create form to enter name and submit score after completing quiz
var formEl = document.createElement('form');
formEl.classList.add('input-form');
// create input to enter name
var inputEl = document.createElement('input');
inputEl.classList.add('input-style');
var inpuSty = document.querySelector('.input-style');
// undefined variables for time, index of question in array, current score, empty array to store scores 
var timeVal;
var indexProb;
var quizScore;
var scores = [];
// create list elements to display all scores, and add style
var ulEl = document.createElement('ul');
var liEl = document.createElement('li');
liEl.classList.add('list-style');
// arrays to hold questions, empty array will be a copy of the constant array when starting the quiz each time
var allProblems = [];
const allQuestions = [
  {
    question: 'question1',
    choices: {
      a: true,
      b: false,
      c: false,
      d: false
    }
  },
  {
    question: 'question2',
    choices: {
      e: false,
      f: true,
      g: false,
      h: false
    }
  },
  {
    question: 'question3',
    choices: {
      i: false,
      j: false,
      k: true,
      l: false
    }
  },
  {
    question: 'question4',
    choices: {
      m: false,
      n: false,
      o: false,
      p: true
    }
  },
  {
    question: 'question5',
    choices: {
      q: true,
      r: false,
      s: false,
      t: false
    }
  },
  {
    question: 'question6',
    choices: {
      u: false,
      v: true,
      w: false,
      x: false
    }
  },
  {
    question: 'question7',
    choices: {
      a: false,
      b: false,
      c: true,
      d: false
    }
  },
  {
    question: 'question8',
    choices: {
      2: false,
      3: false,
      4: false,
      5: true
    }
  },
  {
    question: 'question9',
    choices: {
      6: true,
      7: false,
      8: false,
      9: false
    }
  },
  {
    question: 'question10',
    choices: {
      x: false,
      xx: true,
      xxx: false,
      xxxx: false
    }
  }
]
// function to set empty array equal to constant
function restoreQuestions() {
  allProblems = [allQuestions[0], allQuestions[1], allQuestions[2], allQuestions[3], allQuestions[4], allQuestions[5], allQuestions[6], allQuestions[7], allQuestions[8], allQuestions[9]];
}
// startup code, sets timertext to 0, and remove styling to card content, the retreives scores from local storage
function init() {
  cardContent.classList.remove("scores-list-style");
  timerTxt.textContent = 0;
  getScores()
  cardContent.appendChild(questionEl);
  cardContent.classList.add('scores-list-style')
  questionEl.textContent = "Hit Start to Begin";
}
// everything need to start the quiz, sets up array of questions, disables buttons from working during quiz time, clears card contents, sets intial quiz score of 0, displays current score, and appends needed elements to the card
function startQuiz() {
  restoreQuestions();
  disableBtns()
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';
  cardContent.classList.remove("scores-list-style");

  quizScore = 0;
  scoreEl.textContent = 'Current Score: ' + quizScore;

  cardBtm.appendChild(scoreEl);
  cardBtm.appendChild(correctEl);
  cardBtm.appendChild(quitEl);

  startTimer();
  renderProbs();
}
// disable start, reset, and scores buttons
function disableBtns() {
  startBtn.disabled = true;
  resetBtn.disabled = true;
  scoresBtn.disabled = true;
}
// ensable start, reset, and scores buttons
function enableBtns() {
  startBtn.disabled = false;
  resetBtn.disabled = false;
  scoresBtn.disabled = false;
}
// sets the timer and displays time on screen
function startTimer() {
  timeVal = 60;
  timerTxt.textContent = timeVal;
  timer = setInterval(function () {
    timeVal--;
    timerTxt.textContent = timeVal;
    if (timeVal <= 0) {
      timeVal = 0
      timerTxt.textContent = timeVal;
      clearInterval(timer);
      renderForm();
      return;
    }
  }, 1000);
}
// code that displays the specific problem on the screen, pulls 1 variable from the array, then pulls the pieces apart into the question text, answer choices, and whether that option is true or not
function renderProbs() {
  // makes sure correct styling is applied, empties card, determines how many questions there are, picks a random problem, and assigns that array index number
  cardContent.classList.remove("scores-list-style");
  cardContent.innerHTML = '';
  var numProb = allProblems.length;
  var randomProb = Math.floor(Math.random() * numProb);
  indexProb = randomProb;
  // the text that will appear on the screen
  var question = Object.values(allProblems[randomProb])[0];
  var choice1 = Object.keys(Object.values(allProblems[randomProb])[1])[0];
  var choice2 = Object.keys(Object.values(allProblems[randomProb])[1])[1];
  var choice3 = Object.keys(Object.values(allProblems[randomProb])[1])[2];
  var choice4 = Object.keys(Object.values(allProblems[randomProb])[1])[3];
  // the correct or incorrect value of each answer choice
  var choiceTF1 = Object.values(Object.values(allProblems[randomProb])[1])[0];
  var choiceTF2 = Object.values(Object.values(allProblems[randomProb])[1])[1];
  var choiceTF3 = Object.values(Object.values(allProblems[randomProb])[1])[2];
  var choiceTF4 = Object.values(Object.values(allProblems[randomProb])[1])[3];
  // sets correct/incorrect values for the answer choices
  choiceEl1.setAttribute('value', choiceTF1);
  choiceEl2.setAttribute('value', choiceTF2);
  choiceEl3.setAttribute('value', choiceTF3);
  choiceEl4.setAttribute('value', choiceTF4);
  // assigns the text to specific element
  questionEl.textContent = question;
  choiceEl1.textContent = choice1;
  choiceEl2.textContent = choice2;
  choiceEl3.textContent = choice3;
  choiceEl4.textContent = choice4;
  // appends question and answer buttons
  cardContent.appendChild(questionEl);
  cardContent.appendChild(choiceEl1);
  cardContent.appendChild(choiceEl2);
  cardContent.appendChild(choiceEl3);
  cardContent.appendChild(choiceEl4);

  return;
}
// displays form to enter info after completing quiz, enables buttons, removes styling sets time to 0, clears cards, creates elements for form, and appends to card
function renderForm() {
  enableBtns();
  cardContent.classList.remove("scores-list-style");
  timeVal = 0;
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';

  questionEl.textContent = 'Please enter your name to save your score';
  correctEl.textContent = ''
  cardContent.classList.add('scores-list-style');
  cardContent.appendChild(questionEl);
  cardContent.appendChild(formEl);
  formEl.appendChild(inputEl);
  return;
}
// event listener function to submit form, prevents default behavior, saves user name, quits if blank, creates an object of quiz results, adds to end of scores array, saves to local storage, clears cards, and sends an thank you message
formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  var userName = inputEl.value.trim(); 0

  if (userName === "") {
    return;
  }

  var nameScore = {
    person: userName,
    score: quizScore
  }

  scores.push(nameScore);
  inputEl.value = "";

  setScores();

  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';

  questionEl.textContent = 'Thank you for submitting your score ' + userName + '!';
  cardContent.appendChild(questionEl);

  return;
});
// pulls scores from local storage, sets as the values for scores array, displays last score
function getScores() {
  var retreiveScores = JSON.parse(localStorage.getItem('scores'));
  if (retreiveScores !== null) {
    scores = retreiveScores;
    lastScore.textContent = scores[scores.length - 1].score;
  } return;
}
// saves scores array to local storage
function setScores() {
  if (scores.length > 0) {
    localStorage.setItem("scores", JSON.stringify(scores));
    lastScore.textContent = scores[scores.length - 1].score;
    return;
  }
  return;
}
// displays all scores to screen, clears screen, gets scores, adds elements to create list, and uses a for loop to make each list item, assigns the index value to the element attribute data-index, message displayed if no saved scores
function renderScores() {
  cardContent.innerHTML = '';
  getScores()
  if (scores !== null) {
    ulEl.innerHTML = '';
    cardContent.appendChild(questionEl);
    cardContent.classList.add('scores-list-style');

    questionEl.classList.add('scores-list');
    cardContent.appendChild(ulEl);
    questionEl.textContent = 'Scores';

    for (var i = 0; i < scores.length; i++) {
      var user = scores[i].person;
      var userScore = scores[i].score;

      var liEl = document.createElement('li');
      liEl.textContent = user + ' - ' + userScore;
      liEl.setAttribute('data-index', i);
      ulEl.appendChild(liEl);
    }
  } else {
    questionEl.textContent = "There are no scores to display"
    cardContent.appendChild(questionEl);
  }
  return;
}
// clears local storage and scores array, clears screen, saves scores, and displays message
function resetScores() {
  cardContent.innerHTML = '';
  localStorage.clear()
  scores.length = 0;
  setScores();
  renderScores();
  questionEl.textContent = 'Scores have been deleted'
  return;
}
// when an answer choice is clicked, determines if correct or not, if correct, 10 points added to quiz score and displayed with correct message, if not, 10 seconds reduced from time and displayed with incorrect message
// additionally, checks if there are problems left, then renders a new problem and removes that problem from the array, if not, sets time to 0 and goes to form page, this is for all 4 choices
function choiceClk1() {
  clearTimeout(messageTimeout);
  var choice1Val = choiceEl1.getAttribute('value');
  if (choice1Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!'
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk2() {
  clearTimeout(messageTimeout);
  var choice2Val = choiceEl2.getAttribute('value');
  if (choice2Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk3() {
  clearTimeout(messageTimeout);
  var choice3Val = choiceEl3.getAttribute('value');
  if (choice3Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
function choiceClk4() {
  clearTimeout(messageTimeout);
  var choice4Val = choiceEl4.getAttribute('value');
  if (choice4Val == 'true') {
    quizScore = quizScore + 10;
    scoreEl.textContent = 'Current Score: ' + quizScore;
    correctEl.textContent = 'CORRECT!';
    messageTimeout();
  } else {
    timeVal = timeVal - 10;
    timerTxt.textContent = timeVal;
    correctEl.textContent = 'INCORRECT'
    messageTimeout();
  }

  if (allProblems.length > 1) {
    allProblems.splice(indexProb, 1);
    renderProbs()
    return;
  } else {
    timeVal = 0;
    renderForm();
    return;
  }
}
// the correct or incorrect message will disappear in 2 seconds after appearing
function messageTimeout() {
  setTimeout(function () {
    correctEl.textContent = '';
  }, 2000);
}
// quits the quiz, clears card, enables buttons, and sets time to 0 which loads the form page
function quit() {
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';
  timeVal = 0
  enableBtns();
}
// below are event listeners for all the buttons on the page so they can be clicked
startBtn.addEventListener('click', startQuiz);
choiceEl1.addEventListener('click', choiceClk1);
choiceEl2.addEventListener('click', choiceClk2);
choiceEl3.addEventListener('click', choiceClk3);
choiceEl4.addEventListener('click', choiceClk4);
quitEl.addEventListener('click', quit);
scoresBtn.addEventListener('click', renderScores);
resetBtn.addEventListener('click', resetScores);
// runs the init function on page load up
init();