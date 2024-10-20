async function fetchQuestions() {
    const response = await fetch('questions.json');
    const data = await response.json();
    return data.questions;
}

function generateQuiz(questions) {
    const categories = ['histoire', 'géographie', 'sport', 'divers'];
    const selectedQuestions = [];

    categories.forEach(category => {
        const filtered = questions.filter(q => q.category === category);
        const randomQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
        selectedQuestions.push(...randomQuestions);
    });

    return selectedQuestions;
}

function displayQuiz(questions) {
    const container = document.getElementById('quiz-container');
    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.innerHTML = `<p>${q.question}</p>`;
        q.options.forEach(option => {
            questionElement.innerHTML += `<label><input type="radio" name="q${index}" value="${option}">${option}</label><br>`;
        });
        container.appendChild(questionElement);
    });
}

async function init() {
    const questions = await fetchQuestions();
    const quizQuestions = generateQuiz(questions);
    displayQuiz(quizQuestions);
}

document.getElementById('submit').addEventListener('click', init);
window.onload = init;
