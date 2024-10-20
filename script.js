async function fetchQuestions() {
    const response = await fetch('questions.json');
    const data = await response.json();
    return data.questions;
}

function generateQuiz(questions) {
    const categories = ['Histoire', 'Géographie', 'Sport', 'Divers'];
    const selectedQuestions = [];

    categories.forEach(category => {
        const filtered = questions.filter(q => q.Cat === Cat);
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
        questionElement.innerHTML += `<button class="reveal-button">Voir la réponse</button>`;
        questionElement.innerHTML += `<p class="Réponse">${q.Réponse}</p>`;
        container.appendChild(questionElement);

        // Événements pour révéler la réponse
        const button = questionElement.querySelector('.reveal-button');
        button.addEventListener('click', () => {
            const answer = questionElement.querySelector('.Réponse');
            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
}

async function init() {
    const questions = await fetchQuestions();
    const quizQuestions = generateQuiz(questions);
    displayQuiz(quizQuestions);
}

window.onload = init;
