document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const resultDiv = document.getElementById('result');
    const startContainer = document.getElementById('start-container');
    const startBtn = document.getElementById('start-btn');
    const starsContainer = document.querySelector('.stars');
    let currentQuestion = 0;
    let score = 0;

    // Проверка, что элемент .stars существует
    if (!starsContainer) {
        console.error('Элемент .stars не найден в DOM.');
        return;
    }

    // Генерация звёзд
    function createStars() {
        const starCount = 200; // Количество звёзд
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`; // Разное время мерцания
            starsContainer.appendChild(star);
        }
    }

    createStars();

    const questions = [
        {
            question: "Как много вы спите?",
            answers: [
                {text: "Менее 5 часов", value: 3},
                {text: "5-6 часов", value: 2},
                {text: "7-8 часов", value: 0},
                {text: "Больше 8 часов", value: 1}
            ]
        },
        {
            question: "Насколько сильно вы переживаете из-за проблем со сном?",
            answers: [
                {text: "Вообще не переживаю", value: 0},
                {text: "Совсем немного", value: 1},
                {text: "Очень сильно", value: 2}
            ]
        },
        {
            question: "Мучают ли вас разные мысли при засыпании?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Плохо спите в своей постели, но лучше в другом месте?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Уходит ли на засыпание полчаса или более?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Часто просыпаетесь раньше будильника?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Как часто просыпаетесь ночью?",
            answers: [
                {text: "Никогда", value: 0},
                {text: "1-2 раза", value: 1},
                {text: "3 и более раз", value: 2}
            ]
        },
        {
            question: "Чувствуете ли себя отдохнувшим после сна?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Как часто спите днём?",
            answers: [
                {text: "Никогда", value: 0},
                {text: "Иногда", value: 1},
                {text: "Регулярно", value: 2}
            ]
        },
        {
            question: "Потребляете напитки с кофеином?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Ограничиваете электронные устройства перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Регулярно занимаетесь спортом?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Закрываете шторы перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Реагируете на посторонний шум во время сна?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Соблюдаете режим сна?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Во сколько обычно ложитесь спать?",
            answers: [
                {text: "7 вечера", value: 0},
                {text: "8-9 вечера", value: 0},
                {text: "10-12 вечера", value: 1},
                {text: "Позже 12", value: 2}
            ]
        },
        {
            question: "Лучше спите на выходных?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Реагируете на уровень света во время сна?",
            answers: [
                {text: "Да", value: 1},
                {text: "Нет", value: 0}
            ]
        },
        {
            question: "Проветриваете спальню перед сном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        },
        {
            question: "Спите с открытым окном?",
            answers: [
                {text: "Да", value: 0},
                {text: "Нет", value: 1}
            ]
        }
    ];

    const recommendations = [
        {min: 0, max: 5, text: "Отличное качество сна! Ваши привычки сна близки к идеальным."},
        {min: 6, max: 12, text: "Ваши ответы на тест указывают на то, что  у вас нет бессонницы. Периодически вы сталкиваетесь с ее симптомами, однако , вы осознаете чем они вызваны (условия сна, наличие стимулирующих напитков в вечернее время, эмоциональный фон) и стараетесь минимизировать их наличие. Вы серьезно подходите к вопросу сна, поэтому мы уверены, что с случае возникновения проблем вы обязательно обратитесь за констультацией к специалисту."},
        {min: 13, max: 19, text: "Ваши ответы на тест указывают на то, что  у вас нет хронической бессонницы, но иногда вы все же страдаете из-за беспокойных ночей. Ваши симптомы могут быть вызваны некоторыми заболеваниями или пренебрежением гигиеной сна. В любом случае, важно обсудить свои переживания с врачом — сомнологом. Вместе с ним вы сможете разработать план восстановления сна."},
        {min: 20, max: 26, text: "Ваши ответы на тест указывают на то, что бессонные ночи стали постоянным явлением. Наверняка вы наслышаны о гигиене сна, но ее соблюдение не дало результатов. Мы рекомендуем не заниматься самолечением, а обратиться к специалисту — сомнологу."}
    ];

     function showQuestion() {
        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>${currentQuestion + 1}. ${question.question}</h3>
                ${question.answers.map(answer => `
                    <button class="answer-btn" data-value="${answer.value}">${answer.text}</button>
                `).join('')}
            </div>
        `;
        updateProgress();
    }

    function updateProgress() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        document.getElementById('progress').style.width = `${progress}%`;
    }

    function showResult() {
        const recommendation = recommendations.find(r => score >= r.min && score <= r.max);
        resultDiv.innerHTML = `
            <div class="recommendation">
                <h3>Результаты теста</h3>
                <p>Ваш балл: ${score}</p>
                <p>${recommendation.text}</p>
                <button id="restart-btn" class="restart-btn">Пройти тест заново</button>
            </div>
        `;
        resultDiv.classList.remove('hidden');
        questionContainer.classList.add('hidden');

        document.getElementById('restart-btn').addEventListener('click', restartTest);
    }

    function restartTest() {
        currentQuestion = 0;
        score = 0;
        resultDiv.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
        updateProgress();
    }

    // Обработчик кликов на кнопки ответов
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-btn')) {
            score += parseInt(e.target.dataset.value);
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
            } else {
                showResult();
            }
        }
    });

    // Обработчик для кнопки "Начать тест"
    startBtn.addEventListener('click', () => {
        startContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
    });
    
});