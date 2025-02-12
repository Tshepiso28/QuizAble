from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required for session management

# List of quiz questions (General + Technical)
questions = [
    # General Questions
    { "question": "Can you work well in a team?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Are you willing to learn new skills to improve your work?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Do you believe communication is essential in a workplace?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Would you prefer to work independently rather than in a team?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Are you comfortable adapting to sudden changes in priorities?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Do you prefer structured routines over flexible work environments?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "What should you do if you don’t know the answer to an interview question?", "answers": ["Make up an answer.", "Stay silent.", "Admit you don’t know but explain how you would find the answer.", "Change the subject."], "correct": 2 },
    { "question": "Which of the following best describes a 'team collaboration tool'?", "answers": ["A tool to manage customer complaints", "A tool that helps team members share information and work together more efficiently", "A system for managing employee payroll", "A tool to track time spent on projects"], "correct": 1 },
    { "question": "It's important to arrive early for an interview to show punctuality and enthusiasm.", "answers": ["True", "False"], "correct": 0 },
    { "question": "Asking insightful questions during the interview shows that you have done your research on the company.", "answers": ["True", "False"], "correct": 0 },

    # Technical Questions
    { "question": "Can you use basic Microsoft Office applications like Word and Excel?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Can you troubleshoot a basic computer issue, like restarting a frozen application?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Are you comfortable learning and adapting to new technologies?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Would you feel confident following technical instructions to set up a device or software?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Do you believe technical documentation is important in a workplace?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "Are you comfortable working with digital tools and online collaboration platforms?", "answers": ["Yes", "No"], "correct": 0 },
    { "question": "What is 'project management software' used for?", "answers": ["To store all financial data for a project", "To plan, organize, and manage project tasks, timelines, and resources", "To track employee work hours", "To analyze the success of marketing campaigns"], "correct": 1 },
    { "question": "What is 'data backup' and why is it important?", "answers": ["Making copies of important data to protect against loss or damage", "Creating new software versions for the company", "Encrypting company files to prevent theft", "Compressing files for faster storage"], "correct": 0 },
    { "question": "Agile is a project management methodology that focuses on iterative development and flexibility.", "answers": ["True", "False"], "correct": 0 },
    { "question": "A hard drive stores data temporarily while a computer is running.", "answers": ["True", "False"], "correct": 1 }
]

def reset_quiz():
    session['general_score'] = 0
    session['technical_score'] = 0
    session['question_index'] = 0  # Add question index tracking

@app.route('/')
def index():
    reset_quiz()
    return redirect(url_for('question'))

@app.route('/question', methods=['GET', 'POST'])
def question():
    # Track current question index
    question_index = session.get('question_index', 0)

    # Check if we're within bounds
    if question_index >= len(questions):
        return redirect(url_for('results'))

    if request.method == 'POST':
        selected_answer = int(request.form['answer'])
        # Update score based on question type
        if question_index < 10:  # First 10 questions are General
            if selected_answer == questions[question_index]['correct']:
                session['general_score'] += 1
        else:  # Remaining questions are Technical
            if selected_answer == questions[question_index]['correct']:
                session['technical_score'] += 1

        # Increment the question index and store it in the session
        session['question_index'] += 1

        return redirect(url_for('question'))  # Redirect to next question

    section = "General Questions" if question_index < 10 else "Technical Questions"
    return render_template('quiz.html', 
                           question=questions[question_index], 
                           question_number=question_index + 1, 
                           total_questions=len(questions), 
                           section=section)

@app.route('/results')
def results():
    general_score = session.get('general_score', 0)
    technical_score = session.get('technical_score', 0)
    total_score = general_score + technical_score
    percentage = (total_score / len(questions)) * 100

    pass_message = "Congratulations! You have PASSED!" if percentage >= 75 else "Unfortunately, you have FAILED. Please Retake."

    return render_template('score.html', 
                           general_score=general_score, 
                           technical_score=technical_score, 
                           total_score=total_score, 
                           percentage=percentage, 
                           pass_message=pass_message)

if __name__ == '__main__':
    app.run(debug=True)
