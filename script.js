// Judicial Branch Jeopardy - Web Version for GitHub Pages
// Pure HTML/CSS/JS, no dependencies.

const CATEGORIES = [
  "Supreme Court Basics",
  "Federal Court System",
  "Constitution & Powers",
  "Landmark Cases",
  "Judicial Vocabulary"
];

const QUESTIONS = {
  "Supreme Court Basics": [
    {
      value: 100,
      question: "This is the number of justices who serve on the U.S. Supreme Court.",
      answer: "Nine justices (9)"
    },
    {
      value: 200,
      question: "This is the title of the justice who leads the Supreme Court.",
      answer: "Chief Justice"
    },
    {
      value: 300,
      question: "Under the Constitution, Supreme Court justices serve this long, as long as they maintain 'good behavior.'",
      answer: "For life (lifetime tenure)"
    },
    {
      value: 400,
      question: "This branch of government must confirm Supreme Court nominees before they can take their seats on the Court.",
      answer: "The Senate (legislative branch)"
    },
    {
      value: 500,
      question: "This article of the U.S. Constitution establishes the Supreme Court and the federal judicial branch.",
      answer: "Article III of the Constitution"
    }
  ],
  "Federal Court System": [
    {
      value: 100,
      question: "These courts are the first level of the federal court system, where trials are held and evidence is presented.",
      answer: "U.S. District Courts"
    },
    {
      value: 200,
      question: "If a party loses in a federal trial court, they can appeal to this level of courts.",
      answer: "U.S. Courts of Appeals (Circuit Courts)"
    },
    {
      value: 300,
      question: "This is the general name for courts that review decisions made by lower courts.",
      answer: "Appellate courts"
    },
    {
      value: 400,
      question: "Most federal cases begin in these courts, which have original jurisdiction over federal crimes and civil disputes involving federal law.",
      answer: "Federal district courts"
    },
    {
      value: 500,
      question: "In the federal system, this type of jurisdiction means a case can be heard in either federal or state court.",
      answer: "Concurrent jurisdiction"
    }
  ],
  "Constitution & Powers": [
    {
      value: 100,
      question: "This is the primary job of the judicial branch in relation to laws passed by Congress and actions taken by the President.",
      answer: "To interpret the law"
    },
    {
      value: 200,
      question: "This power allows the Supreme Court to declare laws or executive actions unconstitutional.",
      answer: "Judicial review"
    },
    {
      value: 300,
      question: "This landmark case first clearly established the Supreme Court's power of judicial review in 1803.",
      answer: "Marbury v. Madison"
    },
    {
      value: 400,
      question: "The phrase for the system in which each branch of government can limit the powers of the other branches.",
      answer: "Checks and balances"
    },
    {
      value: 500,
      question: "This clause of the Constitution states that the Constitution and federal laws are the 'supreme Law of the Land.'",
      answer: "The Supremacy Clause"
    }
  ],
  "Landmark Cases": [
    {
      value: 100,
      question: "This 1954 case ruled that racial segregation in public schools was unconstitutional.",
      answer: "Brown v. Board of Education"
    },
    {
      value: 200,
      question: "This 1966 case requires police to inform suspects of their rights, including the right to remain silent and the right to an attorney.",
      answer: "Miranda v. Arizona"
    },
    {
      value: 300,
      question: "In this 1963 case, the Court ruled that states must provide an attorney to defendants who cannot afford one in criminal cases.",
      answer: "Gideon v. Wainwright"
    },
    {
      value: 400,
      question: "This 1973 case recognized a constitutional right to privacy that included a woman's decision to have an abortion, though parts of that ruling have since been changed by later cases.",
      answer: "Roe v. Wade"
    },
    {
      value: 500,
      question: "In this 1974 case, the Court ruled that the President is not above the law and limited claims of executive privilege.",
      answer: "United States v. Nixon"
    }
  ],
  "Judicial Vocabulary": [
    {
      value: 100,
      question: "This is the person who brings a lawsuit in a civil case.",
      answer: "Plaintiff"
    },
    {
      value: 200,
      question: "This is the person or party being accused or sued in a court case.",
      answer: "Defendant"
    },
    {
      value: 300,
      question: "This is the authority of a court to hear and decide a case.",
      answer: "Jurisdiction"
    },
    {
      value: 400,
      question: "This is a written explanation of the reasons for a court's decision.",
      answer: "Opinion (majority opinion)"
    },
    {
      value: 500,
      question: "This type of opinion is written by justices who disagree with the majority decision.",
      answer: "Dissenting opinion"
    }
  ]
};

let score = 0;
let usedTiles = new Set();

let currentTileKey = null;
let currentQuestion = null;

document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
  bindUI();
  updateScoreDisplay();
});

function renderBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";

  // Render category headers
  CATEGORIES.forEach((cat) => {
    const header = document.createElement("div");
    header.className = "category-header";
    header.textContent = cat;
    boardEl.appendChild(header);
  });

  // Compute max questions per category
  const maxRows = Math.max(...CATEGORIES.map((c) => QUESTIONS[c].length));

  // Render tiles row by row
  for (let row = 0; row < maxRows; row++) {
    CATEGORIES.forEach((category, colIndex) => {
      const qList = QUESTIONS[category];
      const q = qList[row];
      const tile = document.createElement("button");
      tile.type = "button";

      if (q) {
        tile.className = "tile";
        tile.textContent = `$${q.value}`;
        const key = tileKey(category, row);
        tile.dataset.key = key;

        if (usedTiles.has(key)) {
          markTileUsed(tile);
        }

        tile.addEventListener("click", () => {
          if (usedTiles.has(key)) return;
          openQuestion(category, row, key);
        });
      } else {
        tile.className = "tile used";
        tile.disabled = true;
        tile.style.visibility = "hidden";
        tile.tabIndex = -1;
      }

      boardEl.appendChild(tile);
    });
  }
}

function tileKey(category, row) {
  return `${category}::${row}`;
}

function bindUI() {
  const resetBtn = document.getElementById("resetGameBtn");
  resetBtn.addEventListener("click", resetGame);

  const modalEl = document.getElementById("questionModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const submitBtn = document.getElementById("submitAnswerBtn");
  const showBtn = document.getElementById("showAnswerBtn");
  const backdrop = modalEl.querySelector(".modal-backdrop");
  const answerInput = document.getElementById("answerInput");

  closeBtn.addEventListener("click", () => closeModal());
  backdrop.addEventListener("click", () => closeModal());

  submitBtn.addEventListener("click", handleSubmitAnswer);
  showBtn.addEventListener("click", handleShowAnswer);

  answerInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitAnswer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalEl.classList.contains("active")) {
        closeModal();
      }
    }
  });
}

function openQuestion(category, row, key) {
  const q = QUESTIONS[category][row];
  currentTileKey = key;
  currentQuestion = { category, row, data: q };

  const modal = document.getElementById("questionModal");
  const catLabel = document.getElementById("modalCategoryLabel");
  const valueLabel = document.getElementById("modalValueLabel");
  const questionText = document.getElementById("modalQuestionText");
  const answerInput = document.getElementById("answerInput");
  const feedbackText = document.getElementById("feedbackText");

  catLabel.textContent = category;
  valueLabel.textContent = `$${q.value}`;
  questionText.textContent = q.question;
  answerInput.value = "";
  feedbackText.textContent = "";
  feedbackText.className = "feedback-text";

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  answerInput.focus();
}

function closeModal() {
  const modal = document.getElementById("questionModal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  currentTileKey = null;
  currentQuestion = null;
}

function handleSubmitAnswer() {
  if (!currentQuestion) return;

  const answerInput = document.getElementById("answerInput");
  const feedbackText = document.getElementById("feedbackText");
  const userAnswer = answerInput.value.trim();

  if (!userAnswer) {
    feedbackText.textContent = "Please type an answer before submitting.";
    feedbackText.className = "feedback-text";
    return;
  }

  const correctAnswer = currentQuestion.data.answer;
  const isCorrect = checkAnswer(userAnswer, correctAnswer);

  if (isCorrect) {
    score += currentQuestion.data.value;
    feedbackText.textContent = `Correct! You earned $${currentQuestion.data.value}.`;
    feedbackText.className = "feedback-text correct";
  } else {
    score -= currentQuestion.data.value;
    feedbackText.textContent = `Incorrect. Correct answer: ${correctAnswer}. You lost $${currentQuestion.data.value}.`;
    feedbackText.className = "feedback-text incorrect";
  }

  updateScoreDisplay();
  markTileUsedByKey(currentTileKey);

  setTimeout(() => {
    closeModal();
  }, 1200);
}

function handleShowAnswer() {
  if (!currentQuestion) return;
  const feedbackText = document.getElementById("feedbackText");
  feedbackText.textContent = `Correct answer: ${currentQuestion.data.answer}`;
  feedbackText.className = "feedback-text";
}

function markTileUsedByKey(key) {
  if (!key) return;
  usedTiles.add(key);

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    if (tile.dataset.key === key) {
      markTileUsed(tile);
    }
  });
}

function markTileUsed(tile) {
  tile.classList.add("used");
  tile.disabled = true;
  tile.textContent = "";
}

function resetGame() {
  if (!confirm("Reset the game and clear your score?")) return;
  score = 0;
  usedTiles.clear();
  updateScoreDisplay();
  renderBoard();
}

function updateScoreDisplay() {
  const scoreValueEl = document.getElementById("scoreValue");
  const sign = score < 0 ? "-$" : "$";
  const value = Math.abs(score);
  scoreValueEl.textContent = `${sign}${value}`;
}

// Answer Checking Utilities
function normalize(text) {
  const punctuationRegex = /[.,/#!$%^&*;:{}=\_`~()'"?]/g;
  let t = text.toLowerCase().trim();
  t = t.replace(punctuationRegex, " ");
  t = t.replace(/\s+/g, " ");
  return t;
}

function checkAnswer(userAnswer, correctAnswer) {
  const userNorm = normalize(userAnswer);
  const correctNorm = normalize(correctAnswer);

  if (!userNorm) return false;

  if (userNorm === correctNorm) return true;
  if (userNorm.includes(correctNorm)) return true;
  if (correctNorm.includes(userNorm)) return true;

  const userDigits = (userNorm.match(/\d+/g) || []).join("");
  const correctDigits = (correctNorm.match(/\d+/g) || []).join("");
  if (userDigits && correctDigits && userDigits === correctDigits) {
    return true;
  }

  const keywords = correctNorm.split(" ").filter((w) => w.length > 3);
  if (keywords.length) {
    const allPresent = keywords.every((kw) => userNorm.includes(kw));
    if (allPresent) return true;
  }

  return false;
}
