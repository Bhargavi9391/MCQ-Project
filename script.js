 // JavaScript code to start timer when Next button is clicked
const nextButtons = document.querySelectorAll('.next-button');
 // Variable to store the interval ID

nextButtons.forEach(button => {
    button.addEventListener('click', function() {
        clearInterval(intervalId); // Clear previous interval
        const sectionId = this.getAttribute('data-next');
        const timer = document.querySelector(`.${sectionId} .timer`);
        const duration = parseInt(timer.getAttribute('data-duration'), 10);
        
        startTimer(duration, timer);
    });
});

// Start timer for section 2 when page loads
document.addEventListener('DOMContentLoaded', function() {
    const timerSection2 = document.querySelector('.section2 .timer');
    const durationSection2 = parseInt(timerSection2.getAttribute('data-duration'), 10);
    startTimer(durationSection2, timerSection2);
});

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// JavaScript code for showing tick symbol when correct answer is selected
const rightAnsRadios = document.querySelectorAll('.right-ans');

rightAnsRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const tickSymbol = radio.parentNode.querySelector('.tick-symbol');
        if (tickSymbol) {
            tickSymbol.style.display = 'inline'; // Show the tick symbol
        }
    });
});

let timerInterval;

function result() {
    clearInterval(timerInterval); // Stop the timer

    let correctAnswers = 0;
    let wrongAnswers = 0;

    const questions = document.querySelectorAll('.section2, .section3, .section4, .section5, .section6');
    questions.forEach(question => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.classList.contains('right-ans')) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }

        // Calculate time taken for the question
        const timer = question.querySelector('.timer');
        const timeTaken = timer.getAttribute('data-duration') - timer.textContent.split(':').reduce((acc, time) => (60 * acc) + +time, 0);
        question.setAttribute('data-time-taken', timeTaken);
    });

    const totalSeconds = Array.from(questions).reduce((acc, question) => acc + +question.getAttribute('data-time-taken'), 0);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    // Format the total time taken
    const formattedTime =  `${remainingSeconds} seconds`;

    // Display the result
    const resultBox = document.createElement('div');
    resultBox.className = 'result-box';
    resultBox.innerHTML = `
        <div>
            <h2 style="color:green;">Result</h2>
            <p>Correct Answers: ${correctAnswers}&nbsp;<i class="fas fa-check" style="color: green;"></i></p>
            <p>Wrong Answers: ${wrongAnswers}&nbsp;<i class="fas fa-times" style="color: red;"></i></p>
            <p>Total Time Taken: ${formattedTime}&nbsp;<i class="fas fa-hourglass"></i> </p>
        </div>
        <button onclick="closeResult()" class="result-button">Close</button>
    `;
    document.body.appendChild(resultBox);
}

function closeResult() {
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
        resultBox.remove();
        clearInterval(timerInterval); 
    }
}