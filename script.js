async function fetchQuestions() {
    const response = await fetch('questions.json');
    const data = await response.json();
    return data.questions;
}

function generateQuiz(questions) {
    const categories = ['histoire', 'géographie', 'sport', 'divers'];
    const selectedQuestions = {};

    categories.forEach(category => {
        const filtered = questions.filter(q => q.category === category);
        const randomQuestions = filtered.sort(() => 0.5 - Math.random()).slice(0, 5);
        selectedQuestions[category] = randomQuestions;
    });

    return selectedQuestions;
}

function displayQuiz(questions) {
    const container = document.getElementById('quiz-container');
    Object.keys(questions).forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;
        
        questions[category].forEach(q => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `<p>${q.question}</p>`;
            questionElement.innerHTML += `<button class="reveal-button">Voir la réponse</button>`;
            questionElement.innerHTML += `<p class="answer">${q.answer}</p>`;
            categoryElement.appendChild(questionElement);

            // Événements pour révéler la réponse
            const button = questionElement.querySelector('.reveal-button');
            button.addEventListener('click', () => {
                const answer = questionElement.querySelector('.answer');
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            });
        });

        container.appendChild(categoryElement);
    });
}

async function init() {
    const questions = await fetchQuestions();
    const quizQuestions = generateQuiz(questions);
    displayQuiz(quizQuestions);
}

window.onload = init;
