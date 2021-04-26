var questionCounter = 0;

const strtBtn = document.getElementById('strt-btn' )
const nextBtn = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const submitBtn = document.getElementById('submit-btn')

let shuffledQuestions, currentQuestionIndex

strtBtn.addEventListener('click', startQuiz)

submitBtn.addEventListener('click',showResults)

nextBtn.addEventListener('click', () => {
    currentQuestionIndex ++
    setNextQuestion()
})

function startQuiz() {
    strtBtn.classList.add('hide')
    shuffledQuestions = questions.sort(()=> Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    nextBtn.classList.remove('hide')
    setNextQuestion()
    const startMinutes= 2;
    let time = startMinutes *60

    const countdownElement = document.getElementById('countdown-timer')

    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        countdownElement.innerHTML = `${minutes} : ${seconds}`;
        time--;
    }
    updateCountdown(time)
    countdownElement.classList.remove('hide')
    updateCountdown.reset();
    if(time < 0){
        strtBtn.innerText ='Restart'
        strtBtn.classList.remove('hide')
        nextBtn.classList.add('hide')
        submitBtn.classList.remove('hide')

    }else {
        updateCountdown()
    }
}

function setNextQuestion() {
    resetQuestion()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetQuestion() {
    nextBtn.classList.add('hide')
    submitBtn.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if( shuffledQuestions.length > currentQuestionIndex + 1){
        nextBtn.classList.remove('hide')
    } else{
        strtBtn.innerText = 'Restart'
        strtBtn.classList.remove('hide')
        submitBtn.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else{
        element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function showResults() {
    nextBtn.classList.add('hide')
    submitBtn.classList.add('hide')
    if (true > 4){
        const newP =document.createElement("p");
        const newContent = document.createTextNode(" You passed! ")
        newP.appendChild(newContent);
    } else{
        const newP =document.createElement("p");
        const newContent = document.createTextNode(" You Failed! Would like to try again?")
        newP.appendChild(newContent);
    }
    strtBtn.innerText ='Restart'
    strtBtn.classList.remove('hide')
}

const questions = [
    // questions for the quiz
    {
        question:  "What is the HTML tag under which one can write the JavaScript code?",
        correctAnswer: 'c.',
        answers: [
            {text: 'a.<javascript>', correct: false},
            {text: 'b.<scripted>', correct: false},
            {text: 'c.<script>', correct: true},
            {text: 'd.<js>.', correct: false}
        ]
        
    },
    {
        question: " Which HTML attribute is used to reference an external JavaScript file.",
        correctAnswer: 'a.',
        answers:[
            {text: 'a. src', correct: true},
            {text: 'b. rel', correct: false},
            {text: 'c. type', correct: false},
            {text: 'd. href', correct: false}
        ]
        
    },
    {
        question: " A varible in JavaScript must start with which special character.",
        correctAnswer: 'd.',
        answers: [
            {text: 'a. @', correct: false},
            {text: 'b. $', correct: false},
            {text: 'c. #', correct: false},
            {text: 'd. none of the above', correct: true}
        ]
    },
    {
        question: " What contains an array?",
        correctAnswer: 'c.',
        answers: [
            {text:'a.{}', correct: false},
            {text:'b.()', correct: false},
            {text:'c.[]', correct: true},
            {text:'d.<>', correct: false}
        ]

    },
    {
        question: " How do you log a message to a debugging console?",
        correctAnswer: 'b.',
        answers: [
            {text:'a. debugger;', correct: false},
            {text:'b. console.log(...)', correct: true},
            {text:'c. debug;', correct: false},
            {text:'d. log.console(...)', correct: false},
        ]
    },
    {
        question: " Which off the following are event listeners?",
        correctAnswer: 'd.',
        answers:[
            {text:'a. submit', correct: false},
            {text:'b. click', correct: false},
            {text:'c. changer', correct: false},
            {text:'d. all of the above', correct: true}
        ]
    },

];

