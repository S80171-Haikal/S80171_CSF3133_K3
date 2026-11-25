// 1. Questions Array
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "background-color"],
        answer: "color"
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        options: ["<js>", "<javascript>", "<scripting>", "<script>"],
        answer: "<script>"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: "//"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;
let answered = false;

// 2. Randomly shuffle the questions
function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

// 3. Countdown timer for each question
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            if (!answered) {
                answered = true;
                const correctAns = questions[currentQuestionIndex].answer;
                const feedback = document.getElementById("feedback-text");
                feedback.innerText = `Time's up! The correct answer was: ${correctAns}`;
                feedback.style.color = "red";

                document.getElementById("submit-btn").style.display = "none";
                document.getElementById("next-btn").style.display = "inline-block";
            }
        }
    }, 1000);
}

// 4. Display current question and options
function displayQuestion() {
    answered = false;
    document.getElementById("feedback-text").innerText = "";
    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("next-btn").style.display = "none";

    const currentQ = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText =
        `Q${currentQuestionIndex + 1}: ${currentQ.question}`;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";

    currentQ.options.forEach(option => {
        const label = document.createElement("label");
        label.className = "option-label";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "quiz-option";
        radio.value = option;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
    });
}

// 5. Check selected answer and update score
function checkAnswer() {
    if (answered) return;

    const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
    if (!selectedOption) {
        alert("Please select an answer first!");
        return;
    }

    answered = true;
    clearInterval(timerInterval);

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const feedback = document.getElementById("feedback-text");

    if (userAnswer === correctAnswer) {
        score++;
        feedback.innerText = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "red";
    }

    document.getElementById("score-display").innerText = `Score: ${score} / ${questions.length}`;
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("next-btn").style.display = "inline-block";
}

// 6. Move to the next question or finish quiz
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        clearInterval(timerInterval);
        document.getElementById("question-text").innerText = "Quiz Completed!";
        document.getElementById("options-container").innerHTML = "";
        document.getElementById("feedback-text").innerText =
            `Final Score: ${score} out of ${questions.length}`;
        document.getElementById("feedback-text").style.color = "#333";
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("restart-btn").style.display = "inline-block";
    }
}

// 7. Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("restart-btn").style.display = "none";
    document.getElementById("score-display").innerText = `Score: 0 / ${questions.length}`;

    shuffleQuestions();
    displayQuestion();
    startTimer();
}

// Automatically start quiz when page loads
startQuiz();