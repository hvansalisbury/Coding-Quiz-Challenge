var startBtn = document.querySelector('.start-button');
var resetBtn = document.querySelector('.reset-button');
var scoresBtn = document.querySelector('.scores-button');

var timerTxt = document.querySelector('.timer-text');

var lastScore = document.querySelector('.last-score');

var cardContent = document.querySelector('.card-content');
var cardBtm = document.querySelector('.card-bottom');

var questionEl = document.createElement('h5');
questionEl.classList.add('question-style');
var questionSty = document.querySelector('.question-style');

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

var scoreEl = document.createElement('h6');
scoreEl.classList.add('current-score');

var correctEl = document.createElement('p');
correctEl.classList.add('is-correct');

var quitEl = document.createElement('button');
var quitSty = document.querySelector('.quit-button');
quitEl.classList.add('quit-button');
quitEl.textContent = 'Quit';

var formEl = document.createElement('form');
formEl.classList.add('input-form');
var form = document.querySelector('.input-form');

var inputEl = document.createElement('input');
inputEl.classList.add('input-style');
var inpuSty = document.querySelector('.input-style');

var timeVal;
var indexProb;
var quizScore;
var scores = [];
var ulEl = document.createElement('ul');
var liEl = document.createElement('li');
var scoresList = document.querySelector('.scores-list')
liEl.classList.add('list-style');

var allProblems = [];
var scores;

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

function restoreQuestions() {
  allProblems = [allQuestions[0], allQuestions[1], allQuestions[2], allQuestions[3], allQuestions[4], allQuestions[5], allQuestions[6], allQuestions[7], allQuestions[8], allQuestions[9]];
}

function init() {
  cardContent.classList.remove("scores-list-style");
  timerTxt.textContent = 0;
  getScores()
}

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

function disableBtns() {
  startBtn.disabled = true;
  resetBtn.disabled = true;
  scoresBtn.disabled = true;
}

function enableBtns() {
  startBtn.disabled = false;
  resetBtn.disabled = false;
  scoresBtn.disabled = false;
}

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

function renderProbs() {
  cardContent.classList.remove("scores-list-style");
  cardContent.innerHTML = '';
  var numProb = allProblems.length;
  var randomProb = Math.floor(Math.random() * numProb);
  indexProb = randomProb;

  var question = Object.values(allProblems[randomProb])[0];
  var choice1 = Object.keys(Object.values(allProblems[randomProb])[1])[0];
  var choice2 = Object.keys(Object.values(allProblems[randomProb])[1])[1];
  var choice3 = Object.keys(Object.values(allProblems[randomProb])[1])[2];
  var choice4 = Object.keys(Object.values(allProblems[randomProb])[1])[3];

  var choiceTF1 = Object.values(Object.values(allProblems[randomProb])[1])[0];
  var choiceTF2 = Object.values(Object.values(allProblems[randomProb])[1])[1];
  var choiceTF3 = Object.values(Object.values(allProblems[randomProb])[1])[2];
  var choiceTF4 = Object.values(Object.values(allProblems[randomProb])[1])[3];

  questionEl.setAttribute('value', question);
  choiceEl1.setAttribute('value', choiceTF1);
  choiceEl2.setAttribute('value', choiceTF2);
  choiceEl3.setAttribute('value', choiceTF3);
  choiceEl4.setAttribute('value', choiceTF4);

  questionEl.textContent = question;
  choiceEl1.textContent = choice1;
  choiceEl2.textContent = choice2;
  choiceEl3.textContent = choice3;
  choiceEl4.textContent = choice4;

  cardContent.appendChild(questionEl);
  cardContent.appendChild(choiceEl1);
  cardContent.appendChild(choiceEl2);
  cardContent.appendChild(choiceEl3);
  cardContent.appendChild(choiceEl4);

  return;
}

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
}

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
  console.log(scores)
  inputEl.value = "";

  setScores();

  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';

  questionEl.textContent = 'Thank you for submitting your score ' + userName + '!';
  cardContent.appendChild(questionEl);

  return;
});

function getScores() {
  var retreiveScores = JSON.parse(localStorage.getItem('scores'));
  if (retreiveScores !== null) {
    scores = retreiveScores;
    console.log(scores)
    lastScore.textContent = scores[scores.length - 1].score;
  } return;
}

function setScores() {
  if (scores.length > 0) {
    localStorage.setItem("scores", JSON.stringify(scores));
    console.log(scores)
    lastScore.textContent = scores[scores.length - 1].score;
    return;
  }
  return;
}

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
  } return;
}

function resetScores() {
  cardContent.innerHTML = '';
  localStorage.clear()
  scores.length = 0;
  setScores();
  renderScores();
  return;
}

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

function messageTimeout() {
  setTimeout(function () {
    correctEl.textContent = '';
  }, 2000);
}

function quit() {
  cardContent.innerHTML = '';
  cardBtm.innerHTML = '';
  timeVal = 0
  enableBtns();
}

startBtn.addEventListener('click', startQuiz);

choiceEl1.addEventListener('click', choiceClk1);
choiceEl2.addEventListener('click', choiceClk2);
choiceEl3.addEventListener('click', choiceClk3);
choiceEl4.addEventListener('click', choiceClk4);

quitEl.addEventListener('click', quit);

scoresBtn.addEventListener('click', renderScores);

resetBtn.addEventListener('click', resetScores);

init();

cardContent.appendChild(questionEl);
cardContent.classList.add('scores-list-style')
questionEl.textContent = "Hit Start to Begin";