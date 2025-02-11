// Array of quiz questions
const questions = [
    // General Questions
    { question: "Can you work well in a team?", answers: ["Yes", "No"], correct: 0 },
    { question: "Are you willing to learn new skills to improve your work?", answers: ["Yes", "No"], correct: 0 },
    { question: "Do you believe communication is essential in a workplace?", answers: ["Yes", "No"], correct: 0 },
    { question: "Would you prefer to work independently rather than in a team?", answers: ["Yes", "No"], correct: 0 },
    { question: "Are you comfortable adapting to sudden changes in priorities?", answers: ["Yes", "No"], correct: 0 },
    { question: "Do you prefer structured routines over flexible work environments?", answers: ["Yes", "No"], correct: 0 },
    { 
        question: "What should you do if you don’t know the answer to an interview question?", 
        answers: ["Make up an answer.", "Stay silent.", "Admit you don’t know but explain how you would find the answer.", "Change the subject."], 
        correct: 2 
    },
    { 
        question: "Which of the following best describes a 'team collaboration tool'?", 
        answers: ["A tool to manage customer complaints", "A tool that helps team members share information and work together more efficiently", 
                  "A system for managing employee payroll", "A tool to track time spent on projects"], 
        correct: 1 
    },
    { question: "It's important to arrive early for an interview to show punctuality and enthusiasm.", answers: ["True", "False"], correct: 0 },
    { question: "Asking insightful questions during the interview shows that you have done your research on the company.", answers: ["True", "False"], correct: 0 },
    
    // Technical Questions
    { question: "Can you use basic Microsoft Office applications like Word and Excel?", answers: ["Yes", "No"], correct: 0 },
    { question: "Can you troubleshoot a basic computer issue, like restarting a frozen application?", answers: ["Yes", "No"], correct: 0 },
    { question: "Are you comfortable learning and adapting to new technologies?", answers: ["Yes", "No"], correct: 0 },
    { question: "Would you feel confident following technical instructions to set up a device or software?", answers: ["Yes", "No"], correct: 0 },
    { question: "Do you believe technical documentation is important in a workplace?", answers: ["Yes", "No"], correct: 0 },
    { question: "Are you comfortable working with digital tools and online collaboration platforms?", answers: ["Yes", "No"], correct: 0 },
    { 
        question: "What is 'project management software' used for?", 
        answers: ["To store all financial data for a project", "To plan, organize, and manage project tasks, timelines, and resources", 
                  "To track employee work hours", "To analyze the success of marketing campaigns"], 
        correct: 1 
    },
    { 
        question: "What is 'data backup' and why is it important?", 
        answers: ["Making copies of important data to protect against loss or damage", "Creating new software versions for the company", 
                  "Encrypting company files to prevent theft", "Compressing files for faster storage"], 
        correct: 0 
    },
    { question: "Agile is a project management methodology that focuses on iterative development and flexibility.", answers: ["True", "False"], correct: 0 },
    { question: "A hard drive stores data temporarily while a computer is running.", answers: ["True", "False"], correct: 1 }
];

let currentQuestionIndex = 0;
let selectedAnswerIndex = null;
let generalScore = 0;
let technicalScore = 0;

// Function to load questions
function loadQuestion() {
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");
    const sectionTitle = document.getElementById("section-title");
    const questionNumber = document.getElementById("question-number");
    const nextButton = document.getElementById("next-btn");
    const submitButton = document.getElementById("submit-btn");

    answerButtons.innerHTML = "";
    selectedAnswerIndex = null;

    let section = currentQuestionIndex < 10 ? "General Questions" : "Technical Questions";
    sectionTitle.textContent = `Section: ${section}`;

    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Show transition message when moving to Technical Questions
    if (currentQuestionIndex === 10) {
        alert("You have completed the General Questions. Now moving to Technical Questions.");
    }

    questionText.textContent = questions[currentQuestionIndex].question;

    questions[currentQuestionIndex].answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.onclick = () => selectAnswer(index, button);
        answerButtons.appendChild(button);
    });

    document.getElementById("prev-btn").disabled = currentQuestionIndex === 0;

    // Hide next button and show submit button on the last question
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function selectAnswer(index, button) {
    selectedAnswerIndex = index;
    document.querySelectorAll(".answer-btn").forEach(btn => btn.style.backgroundColor = "white");
    button.style.backgroundColor = "darkgrey";
    button.style.color = "white";
}

function nextQuestion() {
    if (selectedAnswerIndex === null) {
        alert("Please select an answer.");
    } else {
        // Check if the answer is correct
        if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
            if (currentQuestionIndex < 10) {
                generalScore++;
            } else {
                technicalScore++;
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        }
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    let totalScore = generalScore + technicalScore;
    let percentage = (totalScore / questions.length) * 100;
    let passMessage = percentage >= 75 ? "Congratulations! You have PASSED!" : "Unfortunately, you have FAILED. Please Retake";

    // Store the scores in localStorage
    localStorage.setItem("generalScore", generalScore);
    localStorage.setItem("technicalScore", technicalScore);

    // alert(`
    //     🎯 Quiz Completed! 
        
    //     ✅ General Section Score: ${generalScore} / 10
    //     ✅ Technical Section Score: ${technicalScore} / 10
    //     📊 Overall Score: ${totalScore} / 20 (${percentage.toFixed(2)}%)
        
    //     ${passMessage}
    // `);
    window.location.href = '../templates/score.html';  // Navigating to the score page
}

window.onload = loadQuestion;
