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
    }
];

// get DOM elements
const optionA = document.getElementById('a');
const optionB = document.getElementById('b');
const answerSlots = document.querySelectorAll('.square');
const messageField = document.getElementById('msg');
const playAgainBtn = document.getElementById('again');

let index = 0;
let score = 0;


showQuestion();

function giveRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function giveCorrectAnswer(num) {
    return questions[num].correct;
}

function showQuestion() {
    const random = giveRandomNumber(answerSlots.length);
    let cardIndex = questions[index];
    let correct = questions[index].correct;

    messageField.classList.add('hide');
    playAgainBtn.classList.add('hide');

    optionA.textContent = cardIndex.a;
    optionB.textContent = cardIndex.b;

    answerSlots[random].textContent = correct;

    answerSlots.forEach((answer, i) => {
        
        if (random !== i) {    
            answer.textContent = giveRandomNumber(i*correct);
        }
        
    });
}

function checkNumber(num, correct) {

    if (index < questions.length) {

        if (num === correct) {
            score++;
            index++;
            return showQuestion();
        }
        
    } 
    return;
}

answerSlots.forEach(answerSlot => {

    answerSlot.addEventListener('click', (e) => {

        const chosenNumber = parseInt(e.target.textContent);
        const correct = giveCorrectAnswer(index);

        checkNumber(chosenNumber, correct);
        //console.log(score);
    });

});
