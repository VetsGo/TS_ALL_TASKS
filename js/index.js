interface Question {
  text: string;
  choices: string[];
  correctChoiceIndex: number;
}

interface State {
  questions: Question[];
  praises: string[];
  admonishments: string[];
  score: number;
  currentQuestionIndex: number;
  route: 'start' | 'question' | 'answer-feedback' | 'final-feedback';
  lastAnswerCorrect: boolean;
  feedbackRandom: number;
}

const state: State = {
  questions: [
    {
      text: "Which number am I thinking of?",
      choices: ["1", "2", "3", "4"],
      correctChoiceIndex: 0
    },
    {
      text: "What about now, can you guess now?",
      choices: ["1", "2", "3", "4"],
      correctChoiceIndex: 1
    },
    {
      text: "I'm thinking of a number between 1 and 4. What is it?",
      choices: ["1", "2", "3", "4"],
      correctChoiceIndex: 2,
    },
    {
      text: "If I were a number between 1 and 4, which would I be?",
      choices: ["1", "2", "3", "4"],
      correctChoiceIndex: 3,
    },
    {
      text: "Guess what my favorite number is",
      choices: ["1", "2", "3", "4"],
      correctChoiceIndex: 0,
    }
  ],
  praises: [
    "Wow. You got it right. I bet you feel really good about yourself now",
    "Correct. Which would be impressive, if it wasn't just luck",
    "Oh was I yawning? Because you getting that answer right was boring me to sleep",
    "Hear all that applause for you because you got this question right? Neither do I."
  ],
  admonishments: [
    "Really? That's your guess? WE EXPECTED BETTER OF YOU!",
    "Looks like someone wasn't paying attention in telepathy school, geesh!",
    "That's incorrect. You've dissapointed yourself, your family, your city, state, country and planet, to say nothing of the cosmos"
  ],
  score: 0,
  currentQuestionIndex: 0,
  route: 'start',
  lastAnswerCorrect: false,
  feedbackRandom: 0
};

function setRoute(state: State, route: 'start' | 'question' | 'answer-feedback' | 'final-feedback'): void {
  state.route = route;
}

function resetGame(state: State): void {
  state.score = 0;
  state.currentQuestionIndex = 0;
  setRoute(state, 'start');
}

function answerQuestion(state: State, answer: number): void {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  state.lastAnswerCorrect = currentQuestion.correctChoiceIndex === answer;
  if (state.lastAnswerCorrect) {
    state.score++;
  }
  selectFeedback(state);
  setRoute(state, 'answer-feedback');
}

function selectFeedback(state: State): void {
  state.feedbackRandom = Math.random();
}

function advance(state: State): void {
  state.currentQuestionIndex++;
  if (state.currentQuestionIndex === state.questions.length) {
    setRoute(state, 'final-feedback');
  } else {
    setRoute(state, 'question');
  }
}

function renderApp(state: State, elements: { [key: string]: JQuery<HTMLElement> }): void {
  Object.keys(elements).forEach(function(route) {
    elements[route].hide();
  });
  elements[state.route].show();

  if (state.route === 'start') {
    renderStartPage(state, elements[state.route]);
  } else if (state.route === 'question') {
    renderQuestionPage(state, elements[state.route]);
  } else if (state.route === 'answer-feedback') {
    renderAnswerFeedbackPage(state, elements[state.route]);
  } else if (state.route === 'final-feedback') {
    renderFinalFeedbackPage(state, elements[state.route]);
  }
}

function renderStartPage(state: State, element: JQuery<HTMLElement>): void {
}

function renderQuestionPage(state: State, element: JQuery<HTMLElement>): void {
  renderQuestionCount(state, element.find('.question-count'));
  renderQuestionText(state, element.find('.question-text'));
  renderChoices(state, element.find('.choices'));
}

function renderAnswerFeedbackPage(state: State, element: JQuery<HTMLElement>): void {
  renderAnswerFeedbackHeader(state, element.find(".feedback-header"));
  renderAnswerFeedbackText(state, element.find(".feedback-text"));
  renderNextButtonText(state, element.find(".see-next"));
}

function renderFinalFeedbackPage(state: State, element: JQuery<HTMLElement>): void {
  renderFinalFeedbackText(state, element.find('.results-text'));
}

function renderQuestionCount(state: State, element: JQuery<HTMLElement>): void {
  const text = (state.currentQuestionIndex + 1) + "/" + state.questions.length;
  element.text(text);
}

function renderQuestionText(state: State, element: JQuery<HTMLElement>): void {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  element.text(currentQuestion.text);
}

function renderChoices(state: State, element: JQuery<HTMLElement>): void {
  const currentQuestion = state.questions[state.currentQuestionIndex];
  const choices = currentQuestion.choices.map(function(choice, index) {
    return (
      '<li>' +
        '<input type="radio" name="user-answer" value="' + index + '" required>' +
        '<label>' + choice + '</label>' +
      '</li>'
    );
  });
  element.html(choices);
}

function renderAnswerFeedbackHeader(state: State, element: JQuery<HTMLElement>): void {
  const html = state.lastAnswerCorrect ?
      "<h6 class='user-was-correct'>correct</h6>" :
      "<h1 class='user-was-incorrect'>Wrooonnnngggg!</>";

  element.html(html);
}

function renderAnswerFeedbackText(state: State, element: JQuery<HTMLElement>): void {
  const choices = state.lastAnswerCorrect ? state.praises : state.admonishments;
  const text = choices[Math.floor(state.feedbackRandom * choices.length)];
  element.text(text);
}

function renderNextButtonText(state: State, element: JQuery<HTMLElement>): void {
  const text = state.currentQuestionIndex < state.questions.length - 1 ?
    "Next" : "How did I do?";
  element.text(text);
}

function renderFinalFeedbackText(state: State, element: JQuery<HTMLElement>): void {
  const text = "You got " + state.score + " out of " +
    state.questions.length + " questions right.";
  element.text(text);
}

const PAGE_ELEMENTS: { [key: string]: JQuery<HTMLElement> } = {
  'start': $('.start-page'),
  'question': $('.question-page'),
  'answer-feedback': $('.answer-feedback-page'),
  'final-feedback': $('.final-feedback-page')
};

$("form[name='game-start']").submit(function(event) {
  event.preventDefault();
  setRoute(state, 'question');
  renderApp(state, PAGE_ELEMENTS);
});

$(".restart-game").click(function(event) {
  event.preventDefault();
  resetGame(state);
  renderApp(state, PAGE_ELEMENTS);
});

$("form[name='current-question']").submit(function(event) {
  event.preventDefault();
  const answer = $("input[name='user-answer']:checked").val();
  const answerNumber = answer ? parseInt(answer as string, 10) : NaN;
  answerQuestion(state, answerNumber);
  renderApp(state, PAGE_ELEMENTS);
});

$(".see-next").click(function(event) {
  advance(state);
  renderApp(state, PAGE_ELEMENTS);
});

$(function() { renderApp(state, PAGE_ELEMENTS); });