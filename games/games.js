// JUEGO DE ADIVINANZA
document.addEventListener('DOMContentLoaded', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    const guessInput = document.getElementById('guess-input');
    const checkButton = document.getElementById('check-button');
    const resetButton = document.getElementById('reset-button');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', () => {
        const userGuess = parseInt(guessInput.value);
        attempts++;

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            resultDiv.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
            return;
        }

        if (userGuess === randomNumber) {
            resultDiv.innerHTML = `🎉 ¡Felicidades! Adivinaste el número <strong>${randomNumber}</strong> en ${attempts} intento(s).`;
            checkButton.style.display = 'none';
            resetButton.style.display = 'inline-block';
        } else if (userGuess < randomNumber) {
            resultDiv.textContent = 'El número es mayor. ¡Inténtalo de nuevo!';
        } else {
            resultDiv.textContent = 'El número es menor. ¡Inténtalo de nuevo!';
        }
    });

    resetButton.addEventListener('click', () => {
        location.reload(); // Recarga la página para reiniciar el juego
    });
});


// JUEGO DE TRIVIA
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Qué significa 'HTTP' en informática?",
            answers: [
                "HyperText Transfer Protocol",
                "High Transfer Text Protocol",
                "Hyper Transfer Text Process",
                "Hyper Terminal Text Protocol"
            ],
            correct: "HyperText Transfer Protocol"
        },
        {
            question: "¿Cuál es el lenguaje de programación más utilizado en desarrollo web?",
            answers: ["JavaScript", "Python", "C++", "Ruby"],
            correct: "JavaScript"
        },
        {
            question: "¿Qué compañía desarrolló el sistema operativo Android?",
            answers: ["Microsoft", "Google", "Apple", "IBM"],
            correct: "Google"
        },
        {
            question: "¿Qué componente de hardware se encarga de ejecutar las instrucciones de un programa?",
            answers: ["RAM", "Tarjeta gráfica", "Disco duro", "Procesador (CPU)"],
            correct: "Procesador (CPU)"
        },
        {
            question: "¿Qué significa 'IoT' en tecnología?",
            answers: [
                "Internet of Things",
                "Input Output Technology",
                "International Operating Technology",
                "Integrated Online Technology"
            ],
            correct: "Internet of Things"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const resultElement = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');

    // Cargar la pregunta actual
    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;

        // Limpiar respuestas anteriores
        answersElement.innerHTML = "";

        // Crear botones de respuesta
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-button');
            button.addEventListener('click', () => checkAnswer(answer));
            answersElement.appendChild(button);
        });
    }

    // Comprobar la respuesta seleccionada
    function checkAnswer(selectedAnswer) {
        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswer === currentQuestion.correct) {
            score++;
            resultElement.textContent = "¡Correcto! 🎉";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Incorrecto. La respuesta correcta era: ${currentQuestion.correct}`;
            resultElement.style.color = "red";
        }

        // Después de un pequeño retraso, cargar la siguiente pregunta o mostrar el puntaje final
        setTimeout(() => {
            currentQuestionIndex++;
            resultElement.textContent = ""; // Limpiar resultado

            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showFinalScore();
            }
        }, 1500);
    }

    // Mostrar el puntaje final cuando termine el juego
    function showFinalScore() {
        questionElement.textContent = `Juego terminado. Tu puntuación es: ${score} de ${questions.length}`;
        answersElement.innerHTML = "";
        restartButton.style.display = "inline-block";
    }

    // Reiniciar el juego
    restartButton.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        restartButton.style.display = "none";
        loadQuestion();
    });

    // Cargar la primera pregunta al iniciar
    loadQuestion();
});


//EMPAREJAR CARTAS:
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusDiv = document.getElementById('status');

    // Usamos emojis para las cartas
    const emojis = [
        "🍎", "🍌", "🍒", "🍇", "🍊", "🍓", "🍉", "🥝"
    ];

    // Duplicar los emojis para formar los pares
    const cards = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;

    // Barajar las cartas aleatoriamente
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Crear tablero de juego
    function createBoard() {
        shuffle(cards);
        cards.forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.icon = icon;
            card.textContent = ''; // Las cartas comienzan vacías

            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    // Voltear carta
    function flipCard() {
        if (this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.length === 2) {
            return;
        }

        this.classList.add('flipped');
        this.textContent = this.dataset.icon; // Mostrar el emoji
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    // Verificar si las cartas coinciden
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === emojis.length) {
                statusDiv.textContent = "¡Felicidades! Has encontrado todos los pares 🎉";
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = "";
                card2.textContent = "";
            }, 1000);
        }

        flippedCards = [];
    }

    // Iniciar el juego
    createBoard();
});


// PIEDRA, PAPEL O TIJERA
document.addEventListener('DOMContentLoaded', () => {
    const choices = ['Piedra', 'Papel', 'Tijera'];
    const resultDiv = document.getElementById('result');
    const scoreDiv = document.getElementById('score');

    let userScore = 0;
    let computerScore = 0;

    // Agregar eventos a los botones
    document.getElementById('rock').addEventListener('click', () => playRound('Piedra'));
    document.getElementById('paper').addEventListener('click', () => playRound('Papel'));
    document.getElementById('scissors').addEventListener('click', () => playRound('Tijera'));

    function playRound(userChoice) {
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        const result = determineWinner(userChoice, computerChoice);

        // Actualizar puntajes
        if (result === 'win') {
            userScore++;
            resultDiv.textContent = `¡Ganaste 🎉! ${userChoice} vence a ${computerChoice}`;
            resultDiv.className = 'win';
        } else if (result === 'lose') {
            computerScore++;
            resultDiv.textContent = `Perdiste 😢: ${computerChoice} vence a ${userChoice}`;
            resultDiv.className = 'lose';
        } else {
            resultDiv.textContent = `¡Empate! 😐 Ambos eligieron ${userChoice}`;
            resultDiv.className = 'draw';
        }

        // Actualizar marcador
        scoreDiv.textContent = `Puntuación - Tú: ${userScore} | Computadora: ${computerScore}`;
    }

    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'draw'; // Empate
        }

        if (
            (userChoice === 'Piedra' && computerChoice === 'Tijera') ||
            (userChoice === 'Papel' && computerChoice === 'Piedra') ||
            (userChoice === 'Tijera' && computerChoice === 'Papel')
        ) {
            return 'win'; // Usuario gana
        }

        return 'lose'; // Computadora gana
    }
});


