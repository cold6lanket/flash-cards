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

showQuestion();

function giveRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function giveCorrectAnswer(num) {
    return questions[num].correct;
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
    // assign correct number to random slot
    answerSlots[random].textContent = correct;
    // assign random number to each remained slots
    answerSlots.forEach((answer, i) => {
        // show hidden slots that was hidden before
        answer.classList.remove('fade');
        // add random numbers to slots except correct slot
        if (random !== i) {    
            answer.textContent = giveRandomNumber(i*correct);
        }
        
    });
}



function finishGame() {
    // show hidden button and message
    messageField.classList.remove('hide');
    playAgainBtn.classList.remove('hide');

    messageField.innerText = 'Finished! Your record - 51s';
    // start again
    playAgainBtn.addEventListener('click', () => {
        index = 0;
        showQuestion();
    });
}

function checkNumber(num, item) {
    // get correct answer
    const correct = giveCorrectAnswer(index);
    // check for statements
    if (index < questions.length - 1) {
        // if we still didn't reach last question
        if (num === correct && index !== questions.length) {
            index++;
            return showQuestion();  
        }
        return item.classList.add('fade');

    } else if (index + 1 === questions.length && num === correct) {
        // end game if it's last question and answer is correct
        index = 2; 
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
