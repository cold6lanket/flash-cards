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
    const cardIndex = questions[index];
    const correct = questions[index].correct;

    messageField.classList.add('hide');
    playAgainBtn.classList.add('hide');

    optionA.textContent = cardIndex.a;
    optionB.textContent = cardIndex.b;

    answerSlots[random].textContent = correct;

    answerSlots.forEach((answer, i) => {

        answer.classList.remove('fade');

        if (random !== i) {    
            answer.textContent = giveRandomNumber(i*correct);
        }
        
    });
}

// function showIncorrectUI(item) {
//     item.classList.add('fade');
// }

function checkNumber(num, correct, item) {

    if (index < questions.length) {

        if (num === correct) {
            score++;
            index++;
            return showQuestion();
        }
        return item.classList.add('fade');

    } 
    return;
}

answerSlots.forEach(function(answerSlot) {

    answerSlot.addEventListener('click', function(e) {
        const slot = e.target;
        const chosenNumber = parseInt(slot.textContent);
        const correct = giveCorrectAnswer(index);

        checkNumber(chosenNumber, correct, slot);
        //console.log(score);
    });

});
