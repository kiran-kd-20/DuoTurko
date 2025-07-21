  function playSound(id) {
    const audio = document.getElementById(id);
    audio.currentTime = 0; // rewind to start
    audio.play();
  }

const questions = [
  // Greetings
  { question: "What does 'Merhaba' mean?", options: ["Goodbye", "Hello", "Thank you"], answer: "Hello" },
  { question: "What does 'Gunaydin' mean?", options: ["Good Morning", "Good Night", "Goodbye"], answer: "Good Morning" },

  // Verbal Phrases
  { question: "What does 'Nasılsınız?' mean?", options: ["How are you?", "Where are you?", "What is your name?"], answer: "How are you?" },
  { question: "What does 'Hadi Git' mean?", options: ["Let's go", "Go away", "Come here"], answer: "Let's go" },

  // Numbers
  { question: "What does 'Bir' mean?", options: ["Two", "Three", "One"], answer: "One" },
  { question: "What does 'On' mean?", options: ["Ten", "Eleven", "Nine"], answer: "Ten" },

  // Grammar
  { question: "What is the Turkish word for 'I am'?", options: ["Benim", "Ben", "Beni"], answer: "Ben" },
  { question: "How do you say 'We are going' in Turkish?", options: ["Gidiyoruz", "Geliyoruz", "Kalıyoruz"], answer: "Gidiyoruz" },
];

let shuffled = [...questions].sort(() => Math.random() - 0.5);
let index = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const questionCount = document.getElementById("question-count");

function loadQuestion() {
  resetState();

  if (index < shuffled.length) {
    const current = shuffled[index];
    questionText.textContent = current.question;
    questionCount.textContent = `Question ${index + 1} of ${shuffled.length}`;
    progress.value = (index / shuffled.length) * 100;

    current.options.forEach((option) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.addEventListener("click", () => checkAnswer(btn, current.answer));
      optionsContainer.appendChild(btn);
    });
  } else {
    showResult();
  }
}

function resetState() {
  nextBtn.disabled = true;
  optionsContainer.innerHTML = "";
}

function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsContainer.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn) {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.textContent === correctAnswer) {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  index++;
  loadQuestion();
});

loadQuestion();

function showResult() {
  questionText.textContent = `Quiz completed! You scored ${score} out of ${shuffled.length}.`;
  optionsContainer.innerHTML = "";
  nextBtn.style.display = "none";
  progress.value = 100;
  questionCount.textContent = "Quiz Complete!";
}
