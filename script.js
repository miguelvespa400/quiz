const questionsByLevel = {
  facil: [
    { category: 'FÁBULA', text: 'Na fábula de Esopo, quem ajudou o leão ao roer a rede que o prendia?', options: ['A raposa', 'O rato', 'A tartaruga', 'O corvo'], answer: 1 },
    { category: 'CONTO CLÁSSICO', text: 'Qual objeto a Cinderela perdeu durante o baile?', options: ['Uma coroa', 'Um colar', 'Um sapatinho de cristal', 'Uma fita azul'], answer: 2 },
    { category: 'MITOLOGIA', text: 'Quem era o deus dos mares na mitologia grega?', options: ['Zeus', 'Hades', 'Apolo', 'Poseidon'], answer: 3 },
    { category: 'AVENTURA', text: 'Em que lugar Dorothy chega depois que sua casa é levada por um tornado?', options: ['Terra do Nunca', 'País das Maravilhas', 'Terra de Oz', 'Vale Encantado'], answer: 2 },
    { category: 'LITERATURA', text: 'Qual animal acompanha Alice em sua aventura pelo País das Maravilhas?', options: ['Um coelho branco', 'Um gato preto', 'Um rato falante', 'Uma coruja'], answer: 0 },
    { category: 'FOLCLORE', text: 'Qual personagem do folclore brasileiro tem uma perna só?', options: ['Curupira', 'Saci-Pererê', 'Boto', 'Boitatá'], answer: 1 }
  ],
  medio: [
    { category: 'MITOLOGIA', text: 'Qual era o nome da jovem que, segundo o mito grego, abriu uma caixa proibida?', options: ['Pandora', 'Medusa', 'Ariadne', 'Electra'], answer: 0 },
    { category: 'LITERATURA', text: 'Em Dom Quixote, contra o que o protagonista investe acreditando serem gigantes?', options: ['Torres', 'Moinhos de vento', 'Árvores', 'Cavaleiros'], answer: 1 },
    { category: 'HISTÓRIA', text: 'Qual cidade foi soterrada pela erupção do vulcão Vesúvio no ano 79?', options: ['Atenas', 'Pompeia', 'Cartago', 'Alexandria'], answer: 1 },
    { category: 'ÉPICO', text: 'Na Odisseia, quem esperou Ulisses por muitos anos em Ítaca?', options: ['Helena', 'Antígona', 'Penélope', 'Clitemnestra'], answer: 2 },
    { category: 'CONTO', text: 'Qual é o nome do gigante egoísta no conto de Oscar Wilde?', options: ['O Gigante do Jardim', 'Ele não recebe um nome', 'Barba Azul', 'Grendel'], answer: 1 },
    { category: 'BRASIL', text: 'Quem escreveu a obra O Auto da Compadecida?', options: ['Ariano Suassuna', 'Jorge Amado', 'Machado de Assis', 'José de Alencar'], answer: 0 }
  ],
  dificil: [
    { category: 'MITOLOGIA NÓRDICA', text: 'Na mitologia nórdica, qual é o nome da ponte que liga Midgard a Asgard?', options: ['Gjallarbrú', 'Bifröst', 'Yggdrasil', 'Naglfar'], answer: 1 },
    { category: 'LITERATURA', text: 'Qual romance começa com a frase “As armas e o varão, eu canto”?', options: ['A Ilíada', 'A Eneida', 'Metamorfoses', 'A Divina Comédia'], answer: 1 },
    { category: 'HISTÓRIA ANTIGA', text: 'Qual povo registrou a Epopeia de Gilgamesh, uma das narrativas mais antigas conhecidas?', options: ['Sumérios', 'Fenícios', 'Persas', 'Celtas'], answer: 0 },
    { category: 'TRAGÉDIA', text: 'Na tragédia de Shakespeare, qual era o nome da cidade natal de Romeu e Julieta?', options: ['Veneza', 'Florença', 'Verona', 'Milão'], answer: 2 },
    { category: 'LITERATURA BRASILEIRA', text: 'Em Grande Sertão: Veredas, qual é o nome do narrador que conta sua história?', options: ['Riobaldo', 'Diadorim', 'Zé Bebelo', 'Hermógenes'], answer: 0 },
    { category: 'MITOLOGIA GREGA', text: 'Qual herói precisou realizar doze trabalhos como penitência?', options: ['Teseu', 'Perseu', 'Aquiles', 'Hércules'], answer: 3 }
  ]
};

const levelNames = { facil: 'FÁCIL', medio: 'MÉDIO', dificil: 'DIFÍCIL' };
const historyStorageKey = 'quizHistorico';
const state = { players: ['', ''], scores: [0, 0], level: '', questions: [], currentQuestion: 0, currentPlayer: 0, timer: 30, timerId: null, locked: false };
const $ = (selector) => document.querySelector(selector);
const screens = { start: $('#start-screen'), levels: $('#levels-screen'), quiz: $('#quiz-screen'), history: $('#history-screen'), results: $('#results-screen') };

function showScreen(screen) { Object.values(screens).forEach((item) => item.classList.add('is-hidden')); screens[screen].classList.remove('is-hidden'); window.scrollTo(0, 0); }
function shuffle(items) { return [...items].sort(() => Math.random() - 0.5); }
function updateScoreboard() { $('#score-player-one-label').innerHTML = `${state.players[0]} <b>${state.scores[0]}</b>`; $('#score-player-two-label').innerHTML = `${state.players[1]} <b>${state.scores[1]}</b>`; }
function updateTimer() { const progress = state.timer / 30 * 100; $('#timer-value').textContent = state.timer; $('#timer-ring').style.background = `conic-gradient(var(--orange) ${progress}%, #e8e5dc 0)`; }
function startTimer() { clearInterval(state.timerId); state.timer = 30; updateTimer(); state.timerId = setInterval(() => { state.timer -= 1; updateTimer(); if (state.timer <= 0) { clearInterval(state.timerId); finishQuestion(null, true); } }, 1000); }
function loadQuestion() {
  const question = state.questions[state.currentQuestion];
  state.locked = false;
  $('#question-counter').textContent = `PERGUNTA ${String(state.currentQuestion + 1).padStart(2, '0')} DE ${String(state.questions.length).padStart(2, '0')}`;
  $('#level-label').textContent = `NÍVEL ${levelNames[state.level]}`;
  $('#question-progress').style.width = `${(state.currentQuestion / state.questions.length) * 100}%`;
  $('#turn-indicator').innerHTML = `Vez de <strong>${state.players[state.currentPlayer]}</strong>`;
  $('#question-category').textContent = question.category;
  $('#question-text').textContent = question.text;
  $('#answer-feedback').textContent = '';
  $('#answer-feedback').className = 'answer-feedback';
  const letters = ['A', 'B', 'C', 'D'];
  $('#answers-container').innerHTML = question.options.map((option, index) => `<button class="answer-button" data-index="${index}" type="button"><span class="answer-letter">${letters[index]}</span><span>${option}</span></button>`).join('');
  $('#answers-container').querySelectorAll('.answer-button').forEach((button) => button.addEventListener('click', () => finishQuestion(Number(button.dataset.index), false)));
  startTimer();
}
function finishQuestion(selectedIndex, timedOut) {
  if (state.locked) return;
  state.locked = true;
  clearInterval(state.timerId);
  state.timer = 0;
  updateTimer();
  const question = state.questions[state.currentQuestion];
  const buttons = [...$('#answers-container').querySelectorAll('.answer-button')];
  buttons.forEach((button) => { button.disabled = true; });
  const feedback = $('#answer-feedback');
  if (selectedIndex === question.answer) {
    state.scores[state.currentPlayer] += 1;
    buttons[selectedIndex].classList.add('correct');
    feedback.textContent = 'Resposta certa! Ponto para você.';
    feedback.classList.add('is-correct');
  } else {
    if (selectedIndex !== null) buttons[selectedIndex].classList.add('wrong');
    buttons[question.answer].classList.add('reveal');
    feedback.textContent = timedOut ? `O tempo acabou. A resposta era: ${question.options[question.answer]}.` : `A resposta certa era: ${question.options[question.answer]}.`;
    feedback.classList.add('is-wrong');
  }
  updateScoreboard();
  $('#question-progress').style.width = `${((state.currentQuestion + 1) / state.questions.length) * 100}%`;
  setTimeout(() => {
    state.currentQuestion += 1;
    if (state.currentQuestion >= state.questions.length) showResults();
    else { state.currentPlayer = state.currentPlayer === 0 ? 1 : 0; loadQuestion(); }
  }, 1150);
}
function beginGame(level) { state.level = level; state.questions = shuffle(questionsByLevel[level]); state.scores = [0, 0]; state.currentQuestion = 0; state.currentPlayer = 0; updateScoreboard(); showScreen('quiz'); loadQuestion(); }
function readHistory() { try { return JSON.parse(localStorage.getItem(historyStorageKey)) || []; } catch (error) { return []; } }
function saveHistory() { localStorage.setItem(historyStorageKey, JSON.stringify(readHistory())); }
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character])); }
function renderHistory() {
  const history = readHistory();
  $('#history-count').textContent = `${history.length} ${history.length === 1 ? 'partida concluída' : 'partidas concluídas'}`;
  $('#history-list').innerHTML = history.length ? history.map((match) => `<article class="history-item"><div><div class="history-players">${escapeHtml(match.players[0])}<span>×</span>${escapeHtml(match.players[1])}</div><div class="history-meta">${match.date} · Nível ${levelNames[match.level]}</div></div><div class="history-score">${match.scores[0]} × ${match.scores[1]}</div></article>`).join('') : '<p class="history-empty">Nenhuma partida concluída ainda. Sua próxima história começa agora.</p>';
}
function openHistory() { renderHistory(); showScreen('history'); }
function showResults() {
  clearInterval(state.timerId);
  const total = state.questions.length;
  const history = readHistory();
  history.unshift({ players: [...state.players], scores: [...state.scores], level: state.level, date: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()) });
  localStorage.setItem(historyStorageKey, JSON.stringify(history.slice(0, 20)));
  $('#final-score').innerHTML = state.players.map((player, index) => `<div class="score-card"><span class="score-name">${player}</span><span class="score-number">${state.scores[index]}</span><span class="score-total">de ${total} acertos possíveis</span></div>`).join('');
  $('#tie-message').textContent = state.scores[0] === state.scores[1] ? 'Empate' : '';
  showScreen('results');
}
function resetToStart() { clearInterval(state.timerId); $('#setup-form').reset(); $('#form-error').textContent = ''; showScreen('start'); }

$('#setup-form').addEventListener('submit', (event) => { event.preventDefault(); const first = $('#player-one').value.trim(); const second = $('#player-two').value.trim(); if (!first || !second) { $('#form-error').textContent = 'Preencha o nome dos dois jogadores para continuar.'; return; } if (first.toLowerCase() === second.toLowerCase()) { $('#form-error').textContent = 'Os jogadores precisam ter nomes diferentes.'; return; } state.players = [first, second]; showScreen('levels'); });
$('.level-grid').querySelectorAll('.level-card').forEach((card) => card.addEventListener('click', () => beginGame(card.dataset.level)));
$('#back-to-start').addEventListener('click', resetToStart);
$('#open-history').addEventListener('click', openHistory);
$('#back-from-history').addEventListener('click', resetToStart);
$('#clear-history').addEventListener('click', () => { localStorage.removeItem(historyStorageKey); renderHistory(); });
$('#play-again').addEventListener('click', () => beginGame(state.level));
$('#back-home').addEventListener('click', resetToStart);
