const questions = [
    {
        a: 5,
        b: 9,
        correct: 45
    },
    {
        a: 5,
        b: 11,
        correct: 55
    },
    {
        a: 4,
        b: 4,
        correct: 16
    },
    {
        a: 4,
        b: 7,
        correct: 28
    },
    {
        a: 8,
        b: 9,
        correct: 72
    }
];

// get DOM elements
const optionA = document.getElementById('a');
const optionB = document.getElementById('b');
const answerSlots = document.querySelectorAll('.square');
const messageField = document.getElementById('msg');
const playAgainBtn = document.getElementById('again');

let index = 0;
let startTime, endTime;

showQuestion();
startTimer();

function giveRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function giveCorrectAnswer(num) {
    return questions[num].correct;
}

function startTimer() {
    startTime = new Date();
}

function endTimer() {
    endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    return Math.round(timeDiff);  
}

function showQuestion() {
    const random = giveRandomNumber(answerSlots.length);
    const cardIndex = questions[index];
    const correct = cardIndex.a * cardIndex.b;
    // hide button and message
    messageField.classList.add('hide');
    playAgainBtn.classList.add('hide');
    optionA.textContent = cardIndex.a;
    optionB.textContent = cardIndex.b;
    answerSlots[random].textContent = correct;
    // assign random number to each remained slots
    answerSlots.forEach((answer, i) => {
        answer.classList.remove('fade');
        // add random numbers to slots except correct slot
        if (random !== i) {    
            answer.textContent = giveRandomNumber(i*correct);
        }   
    });
}

function finishGame() {
    const record = endTimer();
    // show hidden button and message
    messageField.classList.remove('hide');
    playAgainBtn.classList.remove('hide');

    messageField.innerText = `Finished! Your record - ${record}s`;
    // start again
    playAgainBtn.addEventListener('click', () => {
        index = 0;
        showQuestion();
        startTimer();
    });
}

function checkNumber(num, item) {
    const correct = giveCorrectAnswer(index);
    // check for statements
    if (index < questions.length - 1) {
        if (num === correct && index !== questions.length) {
            index++;
            return showQuestion();  
        }
        return item.classList.add('fade');
    } else if (index + 1 === questions.length && num === correct) {
        return finishGame();
    }
    // hide incorrect numbers
    return item.classList.add('fade');
}

answerSlots.forEach(function(answerSlot) {
    answerSlot.addEventListener('click', function(e) {
        // target selected answer or slot
        const slot = e.target;
        const chosenNumber = parseInt(slot.textContent);

        return checkNumber(chosenNumber, slot);
    });
});
