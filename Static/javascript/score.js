function updateScores() {
    let generalScore = localStorage.getItem("generalScore") || 0;
    let technicalScore = localStorage.getItem("technicalScore") || 0;
    let overallScore = parseInt(generalScore) + parseInt(technicalScore);
    let passingScore = 75;
    let percentage = (overallScore / 20) * 100;

    document.getElementById("tech-score").textContent = technicalScore;
    document.getElementById("gen-score").textContent = generalScore;
    document.getElementById("overall-score").textContent = overallScore;

    let congratulationsMessage = "";
    if (percentage >= passingScore) {
        congratulationsMessage = "Congratulations! You have PASSED!";
    } else {
        congratulationsMessage = "Unfortunately, you have FAILED. Please retake the quiz.";
    }

    document.getElementById("congratulations").textContent = congratulationsMessage;

    // Show retake button whether passed or failed
    document.getElementById("retake-btn").style.display = "inline-block";
}

function retakeQuiz() {
    localStorage.removeItem("generalScore");
    localStorage.removeItem("technicalScore");
    window.location.href = '../templates/quiz.html';  // Redirect to quiz start page
}

function goToLandingPage() {
    window.location.href = '../templates/landing.html';  // Redirect to the landing page
}

window.onload = updateScores;