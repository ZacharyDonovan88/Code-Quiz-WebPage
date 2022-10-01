const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let count = 60;

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Hyper Text Preprocessor',
        choice2: 'Hypertext Markup Language',
        choice3: 'Hypertext Multiple Language',
        choice4: 'Hyper Tool Multi Language',
        answer: 2,
    },
    {
        question: 'What does CSS stand for?',
        choice1: 'Common Style Sheet',
        choice2: 'Colourful Style Sheet',
        choice3: 'Computer Style Sheet',
        choice4: 'Cascading Style Sheet',
        answer: 4,
    },
    {
        question: 'What does PHP stand for?',
        choice1: 'Hypertext Preprocessor',
        choice2: 'Hypertext Programming',
        choice3: 'Hypertext Preprogramming',
        choice4: 'Hyperbox Preprocessor',
        answer: 1,
    },
    {
        question: 'What does SQL stand for?',
        choice1: 'Stylish Question Language',
        choice2: 'Stylesheet Query Language',
        choice3: 'Statement Question Language',
        choice4: 'Structured Query Language',
        answer: 4,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;





function handleWrongAnswer(currentCount) {
    let newCount = currentCount - 5;
    count = newCount;
}

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score); 
        return window.location.assign('../html/end.html');
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>  {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        } else {
            handleWrongAnswer(count);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})



incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

var interval = setInterval(function(){
    document.getElementById('timer').innerHTML=count;
    count--;
    if (count === 0 || count < 0){
      clearInterval(interval);    
      document.getElementById('timer').innerHTML='Done';
      // or...
      alert("You're out of time!");
    }
  }, 1000);

startGame();