const homeScreen = document.getElementById('home-screen');
const quizScreen = document.getElementById('quiz-screen');
const topicsContainer = document.getElementById('topics');
const quizArea = document.getElementById('quiz-area');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const tabs = document.getElementById('category-tabs');

let currentCategory = 'dates';
let currentTopic = null;
let currentQuestionIndex = 0;

const data = {
    '1': {
        dates: [
            {
                question: 'розселення племен трипільської і середньостогівської археологічних культур на території України',
                correct: 'IV - середина III тис. до н. е.',
                options: ['VІІІ-VІ ст. до н. е.', 'IV - середина III тис. до н. е.', 'V-VІІ ст.']
            }
        ]
    },
    '2': {
        dates: [
            {
                question: 'Запровадження християнства як державної релігії',
                correct: '988',
                options: ['860', '907', '911', '941', '944', '862', '882', '988', '1019-1054', '1036', '1097', '1113', '1187', '1051', '967']
            }
        ]
    }
};

function createTopicButtons() {
    for (let i = 1; i <= 32; i++) {
        const btn = document.createElement('button');
        btn.textContent = `Тема ${i}`;
        btn.onclick = () => selectTopic(`${i}`);
        topicsContainer.appendChild(btn);
    }
}

function selectTopic(topic) {
    currentTopic = topic;
    homeScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    tabs.classList.remove('hidden');
    quizArea.classList.remove('hidden');
    startQuiz();
}

function goHome() {
    quizScreen.classList.add('hidden');
    homeScreen.classList.remove('hidden');
    feedbackEl.textContent = '';
    optionsEl.innerHTML = '';
    questionEl.textContent = '';
}

function selectCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('#category-tabs button').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    feedbackEl.textContent = '';
    showQuestion();
}

function showQuestion() {
    const topicData = data[currentTopic]?.[currentCategory];
    if (!topicData || currentQuestionIndex >= topicData.length) {
        questionEl.textContent = 'Все вопросы пройдены!';
        optionsEl.innerHTML = '';
        return;
    }

    const question = topicData[currentQuestionIndex];
    questionEl.textContent = question.question;

    optionsEl.innerHTML = '';
    question.options.forEach(year => {
        const btn = document.createElement('button');
        btn.textContent = year;
        btn.onclick = () => checkAnswer(year, question.correct, btn);
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected, correct, btn) {
    if (selected === correct) {
        btn.style.background = '#aef3b1';
        setTimeout(() => {
            currentQuestionIndex++;
            feedbackEl.textContent = '';
            showQuestion();
        }, 500);
    } else {
        btn.style.background = '#f8bcbc';
        feedbackEl.textContent = 'Неверно. Попробуй ещё.';
    }
}

createTopicButtons();
