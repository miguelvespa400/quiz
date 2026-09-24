// Tempo (segundos) e pontuação por nível da pergunta.
const timeByLevel = { facil: 30, medio: 30, dificil: 45, superdificil: 50 };
const pointsByLevel = { facil: 1, medio: 3, dificil: 5, superdificil: 10 };
const defaultTime = 30;
// Pausa (em segundos) da tela de placar entre uma pergunta e outra.
const intervalSeconds = 6;

const questionsByLevel = {
  facil: [
    { category: 'PRIMEIRA GUERRA', text: 'Qual foi o principal motivo que desencadeou a Primeira Guerra Mundial em 1914?', options: ['A invasão da Polônia pela Alemanha', 'O assassinato do arquiduque Francisco Ferdinando da Áustria', 'A queda da Bolsa de Valores de Nova York', 'A tomada da Bastilha na França'], answer: 1 },
    { category: 'BRASIL REPÚBLICA', text: 'Em que ano foi proclamada a República no Brasil?', options: ['1822', '1889', '1930', '1964'], answer: 1 },
    { category: 'SEGUNDA GUERRA', text: 'Quem foi o líder da Alemanha nazista durante a Segunda Guerra Mundial?', options: ['Benito Mussolini', 'Joseph Stalin', 'Adolf Hitler', 'Winston Churchill'], answer: 2 },
    { category: 'SEGUNDA GUERRA', text: 'Qual evento marcou o fim da Segunda Guerra Mundial na Europa, em maio de 1945?', options: ['O lançamento das bombas atômicas no Japão', 'A rendição incondicional da Alemanha', 'A queda do Muro de Berlim', 'A assinatura do Tratado de Versalhes'], answer: 1 },
    { category: 'GRANDES NAVEGAÇÕES', text: 'Qual país financiou a viagem de Cristóvão Colombo em 1492 que resultou na chegada à América?', options: ['Inglaterra', 'Portugal', 'Espanha', 'França'], answer: 2 },
    { category: 'SEGUNDA GUERRA', text: 'Como ficou conhecida a aliança militar oposta aos Aliados (liderados por EUA, Reino Unido e URSS) na Segunda Guerra Mundial?', options: ['Tríplice Entente', 'Eixo (Alemanha, Itália e Japão)', 'Pacto de Varsóvia', 'OTAN'], answer: 1 },
    { category: 'GRANDES NAVEGAÇÕES', text: 'O Tratado de Tordesilhas (1494) dividiu as terras recém-descobertas entre quais nações?', options: ['Brasil e Portugal', 'Espanha e Inglaterra', 'Portugal e Espanha', 'França e Espanha'], answer: 2 },
    { category: 'BRASIL NA GUERRA', text: 'Qual era o nome do navio brasileiro cujo naufrágio por submarinos alemães levou o Brasil a declarar guerra ao Eixo na Segunda Guerra Mundial?', options: ['Minas Gerais', 'Itapagé', 'Riachuelo', 'Almirante Barroso'], answer: 1 },
    { category: 'BRASIL COLÔNIA', text: 'Qual foi o principal produto de exportação do Brasil durante o período colonial nos séculos XVI e XVII?', options: ['O café', 'A borracha', 'O açúcar (cana-de-açúcar)', 'O ouro'], answer: 2 },
    { category: 'SEGUNDA GUERRA', text: 'O conflito travado entre 1939 e 1945 que envolveu a maior parte das nações do mundo foi:', options: ['A Primeira Guerra Mundial', 'A Guerra Fria', 'A Guerra do Vietnã', 'A Segunda Guerra Mundial'], answer: 3 }
  ],
  medio: [
    { category: 'PRIMEIRA GUERRA', text: 'Qual foi o tratado de paz assinado em 1919 que impôs severas punições e reparações financeiras à Alemanha após a Primeira Guerra Mundial?', options: ['Tratado de Tordesilhas', 'Tratado de Versalhes', 'Tratado de Utrecht', 'Acordo de Munique'], answer: 1 },
    { category: 'BRASIL NA GUERRA', text: 'Durante a Segunda Guerra Mundial, o Brasil enviou uma força militar para combater na Europa. Qual era o nome dessa força?', options: ['Força Expedicionária Brasileira (FEB)', 'Batalhão de Infantaria da Amazônia', 'Cruzados da Pátria', 'Divisão Azul'], answer: 0 },
    { category: 'AMÉRICA DO SUL', text: 'A Guerra do Paraguai (1864–1870), o maior conflito armado internacional da América do Sul, opôs o Paraguai contra qual aliança?', options: ['Tríplice Entente', 'Tríplice Aliança (Brasil, Argentina e Uruguai)', 'Os Aliados do Pacífico', 'Confederação do Equador'], answer: 1 },
    { category: 'GUERRA FRIA', text: 'O que foi a “Guerra Fria” (período pós-Segunda Guerra Mundial)?', options: ['Uma guerra climática de testes nucleares no Ártico', 'Um conflito armado direto entre Estados Unidos e União Soviética', 'Uma disputa geopolítica, ideológica e tecnológica entre o bloco capitalista (EUA) e o bloco socialista (URSS)', 'Uma guerra civil travada na Europa Oriental durante o inverno'], answer: 2 },
    { category: 'BRASIL IMPÉRIO', text: 'Qual revolta do período regencial brasileiro (século XIX) ocorreu no Maranhão e teve forte participação popular, destacando-se figuras como Balaio e Raimundo Nonato?', options: ['Revolta dos Farrapos', 'Sabinada', 'Balaiada', 'Cabanagem'], answer: 2 },
    { category: 'SEGUNDA GUERRA', text: 'O “Dia D”, ocorrido em 6 de junho de 1944, representou qual grande operação militar na Segunda Guerra Mundial?', options: ['O ataque surpresa a Pearl Harbor pelos japoneses', 'O desembarque aliado nas praias da Normandia, na França ocupada', 'A invasão da União Soviética pelas tropas nazistas (Operação Barbarossa)', 'A Batalha de Stalingrado'], answer: 1 },
    { category: 'BRASIL REPÚBLICA', text: 'O que caracterizou o movimento das “Diretas Já” na história do Brasil?', options: ['A campanha pela abolição da escravidão em 1888', 'A exigência de eleições diretas para presidente durante a transição do Regime Militar', 'Os protestos contra a inflação na década de 1990', 'A luta pela independência de Portugal em 1822'], answer: 1 },
    { category: 'PRIMEIRA GUERRA', text: 'Qual foi o principal motivo para a entrada dos Estados Unidos na Primeira Guerra Mundial em 1917?', options: ['A invasão do território americano pelas tropas alemãs', 'A anexação do Alasca pela Alemanha', 'O afundamento de navios mercantes norte-americanos por submarinos alemães e a revelação do Telegrama Zimmermann', 'O assassinato de Abraham Lincoln'], answer: 2 },
    { category: 'PRIMEIRA GUERRA', text: 'Na Primeira Guerra Mundial, os Impérios Centrais lutaram contra a Tríplice Entente. Quais eram os três principais países que formavam inicialmente a Entente?', options: ['EUA, Alemanha e Itália', 'Reino Unido, França e Rússia', 'Brasil, Portugal e Espanha', 'China, Japão e Índia'], answer: 1 },
    { category: 'BRASIL REPÚBLICA', text: 'A Revolta da Vacina, ocorrida no Rio de Janeiro em 1904, foi motivada por quê?', options: ['Pela obrigatoriedade da vacinação contra a varíola e reformas urbanas autoritárias que desabrigaram os pobres', 'Pela proibição do voto feminino nas eleições municipais', 'Pela alta abusiva no preço do café e do pão', 'Pela introdução da vacina contra a febre amarela nas fazendas de café'], answer: 0 }
  ],
  dificil: [
    { category: 'ORIENTE MÉDIO', text: 'Qual foi o acordo geopolítico secreto revelado em 1917, conhecido como Acordo Sykes-Picot, que moldou profundamente o Oriente Médio moderno?', options: ['A divisão dos territórios do Império Otomano em esferas de influência entre a França e o Reino Unido', 'A aliança militar secreta entre o Japão e a Alemanha antes da Segunda Guerra', 'O plano de partilha da África entre potências europeias na Conferência de Berlim', 'O pacto de não-agressão entre a Alemanha nazista e a União Soviética'], answer: 0 },
    { category: 'SEGUNDA GUERRA', text: 'A Batalha de Stalingrado (1942–1943) é considerada um dos pontos de virada da Segunda Guerra Mundial. Qual foi a principal consequência estratégica dessa batalha?', options: ['A capitulação definitiva do Japão no Pacífico', 'O bloqueio naval bem-sucedido da Grã-Bretanha contra a frota alemã', 'O esmagamento da ofensiva alemã na Frente Oriental, marcando o início do recuo nazista rumo a Berlim', 'A abertura de uma nova frente de batalha na Península Ibérica'], answer: 2 },
    { category: 'ERA VARGAS', text: 'O que foi a “Intentona Comunista” de 1935 no Brasil?', options: ['Uma tentativa fracassada de golpe de Estado liderada por comunistas (com apoio da Aliança Nacional Libertadora) contra o governo de Getúlio Vargas', 'O levante militar liderado por Luís Carlos Prestes que deu origem à Coluna Prestes', 'A revolta dos marinheiros contra os castigos corporais na Marinha em 1910', 'A greve geral operária inspirada na Revolução Russa em São Paulo'], answer: 0 },
    { category: 'PRIMEIRA GUERRA', text: 'No contexto da Primeira Guerra Mundial, qual foi o impacto do colapso do Império Russo em 1917 para o andamento do conflito?', options: ['A Rússia anexou a Alemanha após a Revolução de Outubro', 'A assinatura do Tratado de Brest-Litovsk, que retirou a Rússia da guerra e permitiu à Alemanha concentrar suas forças na Frente Ocidental', 'A entrada imediata da União Soviética na Tríplice Entente ao lado dos EUA', 'O fim imediato da guerra em todas as frentes europeias'], answer: 1 },
    { category: 'ERA VARGAS', text: 'O que determinou a Constituição de 1937, outorgada por Getúlio Vargas e que deu início ao Estado Novo?', options: ['O parlamentarismo com forte descentralização dos estados', 'O fim definitivo das leis trabalhistas e a abertura total aos investimentos ingleses', 'Amplos poderes ao Poder Executivo (ditadura), fechamento do Congresso Nacional e a criação de órgãos de censura como o DIP', 'A proibição de qualquer intervenção do Estado na economia (liberalismo radical)'], answer: 2 },
    { category: 'SEGUNDA GUERRA', text: 'O Pacto Germano-Soviético (Molotov-Ribbentrop), de agosto de 1939, uniu ideologias opostas. Qual era o seu principal objetivo oculto (protocolo secreto)?', options: ['A unificação militar imediata da Alemanha e da União Soviética para invadir os Estados Unidos', 'A partilha da Europa Oriental entre as duas potências, incluindo a invasão e divisão da Polônia', 'O acordo comercial para o fornecimento de trigo americano via portos russos', 'A criação conjunta da Liga das Nações pós-guerra'], answer: 1 },
    { category: 'BRASIL COLÔNIA', text: 'O que foi o episódio conhecido como “Guerra dos Emboabas” (1707–1709) na história colonial do Brasil?', options: ['Um conflito entre os bandeirantes paulistas e os forasteiros (“emboabas”) pelo controle das regiões auríferas em Minas Gerais', 'Uma revolta de escravizados no Quilombo dos Palmares contra o governo de Pernambuco', 'A disputa entre holandeses e portugueses pelo monopólio do açúcar no Nordeste', 'Uma revolta separatista na província de Minas Gerais contra os altos impostos da Coroa'], answer: 0 },
    { category: 'PRIMEIRA GUERRA', text: 'Qual foi a importância histórica da Batalha de Gallipoli (1915), durante a Primeira Guerra Mundial?', options: ['Foi a maior batalha naval da história moderna, vencida pelo Império Alemão', 'Foi uma tentativa fracassada dos Aliados de abrir um caminho marítimo para a Rússia e enfraquecer o Império Otomano, com pesadas baixas (especialmente da ANZAC)', 'Representou a rendição oficial do Império Otomano e a divisão do Oriente Médio', 'Marcou o fim da guerra de trincheiras na Europa Oriental'], answer: 1 },
    { category: 'PRIMEIRA REPÚBLICA', text: 'O que significou a “Política Café com Leite” durante a Primeira República no Brasil (1894–1930)?', options: ['O acordo econômico para taxação conjunta da borracha e do cacau no Norte e Nordeste', 'A alternância de poder na presidência da República entre as oligarquias de São Paulo (café) e Minas Gerais (leite/pecuária)', 'O monopólio da importação de alimentos industrializados da Europa para o Rio de Janeiro', 'O programa de distribuição de alimentos criado para combater a fome nas secas do Nordeste'], answer: 1 },
    { category: 'SEGUNDA GUERRA', text: 'Qual foi o papel geopolítico da Conferência de Yalta (fevereiro de 1945) para o mundo pós-Segunda Guerra Mundial?', options: ['Decidiu a criação imediata da União Europeia e a desmilitarização do Japão', 'Definiu os rumos da derrota final da Alemanha, a divisão da Alemanha e de Berlim em zonas de ocupação e a criação da ONU', 'Estabeleceu as regras de comércio global do Acordo de Bretton Woods', 'Tratou exclusivamente do fim da Guerra Civil Espanhola e da neutralidade da Suíça'], answer: 1 }
  ],
  superdificil: [
    { category: 'GRÉCIA ANTIGA', text: 'Como a Liga de Delos, inicialmente uma aliança defensiva contra os persas liderada por Atenas, transformou-se em um império hegemônico (archē) e gerou as tensões que causaram a Guerra do Peloponeso?', options: ['Os persas infiltraram espiões na Liga de Delos, forçando Atenas a assumir o controle militar absoluto da confederação', 'Atenas transferiu o caixa da liga, substituiu o envio de navios aliados por tributos em dinheiro e impôs domínio político, gerando revolta e a oposição de Esparta', 'Esparta invadiu Delos e roubou o tesouro grego, obrigando Atenas a declarar guerra defensiva para salvar os aliados orientais', 'Os membros da liga votaram pacificamente pela unificação total de seus territórios sob um governo monárquico ateniense'], answer: 1 },
    { category: 'PÉRSIA ANTIGA', text: 'Qual foi a principal estratégia institucional e infraestrutural usada pelo Império Aquemênida (Persa) para manter a coesão de seu vasto território e evitar rebeliões nas províncias?', options: ['A imposição obrigatória da religião persa e do idioma zoroastrista em todas as províncias dominadas', 'A descentralização militar absoluta, deixando cada província sem fiscalização central para garantir autonomia', 'O uso de províncias chamadas satrapias fiscalizadas por inspetores reais, ligadas pela Estrada Real e aliadas a uma política de tolerância cultural', 'A escravização sistemática de todas as elites locais, substituídas por governadores vindos exclusivamente de Persépolis'], answer: 2 },
    { category: 'HELENISMO', text: 'Do ponto de vista histórico e cultural, como pode ser definida a essência do processo conhecido como “Helenismo” no período pós-conquistas de Alexandre?', options: ['Um isolamento cultural estrito da Grécia, que proibiu qualquer contato com filosofias orientais', 'Um sincretismo que fundiu traços gregos com elementos culturais e administrativos orientais, criando centros cosmopolitas como Alexandria', 'A destruição total da arquitetura e das ciências no Oriente Médio para a reconstrução de cópias idênticas de Atenas', 'A conversão de todos os reinos helenísticos em democracias diretas nos moldes da pólis clássica'], answer: 1 },
    { category: 'ROMA ANTIGA', text: 'Por que a estratégia de Aníbal de invadir a Itália e vencer batalhas campais (como Canas) acabou fracassando a longo prazo frente ao poderio de Roma?', options: ['Porque os aliados italianos de Roma mantiveram-se majoritariamente leais, e Roma contra-atacou diretamente as bases de Cartago na África e na Ibéria', 'Porque o exército de Aníbal recusou-se a usar cavalaria, confiando apenas em infantaria leve desarmada', 'Porque o Império Persa interveio militarmente para salvar os romanos das tropas cartaginesas', 'Porque Aníbal assinou um tratado de paz voluntário com o Senado romano após o primeiro ano de conflito'], answer: 0 },
    { category: 'ROMA ANTIGA', text: 'Qual foi o principal impacto socioeconômico interno gerado em Roma após a aniquilação definitiva de Cartago em 146 a.C.?', options: ['A abolição imediata da escravidão em todo o território romano e a distribuição gratuita de terras para os plebeus', 'A substituição do trabalho camponês livre por grandes latifúndios baseados no trabalho escravo, gerando crise social e empobrecimento da plebe', 'A transferência imediata da capital de Roma para o norte da África, esvaziando a Península Itálica', 'A transformação da República Romana em uma democracia parlamentar descentralizada'], answer: 1 }
  ]
};

const levelNames = { facil: 'FÁCIL', medio: 'MÉDIO', dificil: 'DIFÍCIL', superdificil: 'SUPER DIFÍCIL', misto: 'MISTO' };
const historyStorageKey = 'quizHistorico';
const customQuestionsStorageKey = 'quizPerguntasPersonalizadas';
const state = { players: ['', ''], scores: [0, 0], level: '', rounds: 0, questions: [], currentQuestion: 0, currentPlayer: 0, timer: 0, timeTotal: defaultTime, timerId: null, intervalId: null, locked: false, lastRound: null };
const $ = (selector) => document.querySelector(selector);
const screens = { start: $('#start-screen'), levels: $('#levels-screen'), manager: $('#manager-screen'), quiz: $('#quiz-screen'), interval: $('#interval-screen'), history: $('#history-screen'), results: $('#results-screen') };

function showScreen(screen) { Object.values(screens).forEach((item) => item.classList.add('is-hidden')); screens[screen].classList.remove('is-hidden'); window.scrollTo(0, 0); }
// Fisher-Yates: embaralhamento uniforme. O sort(() => Math.random() - .5) é enviesado
// e deixaria resíduo de posição justamente onde a justiça do jogo depende disso.
function shuffle(items) {
  const list = [...items];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const pick = Math.floor(Math.random() * (index + 1));
    [list[index], list[pick]] = [list[pick], list[index]];
  }
  return list;
}
// Embaralha as alternativas e recalcula qual índice passou a ser o correto.
function shuffleOptions(question) {
  const order = shuffle(question.options.map((option, index) => index));
  return { ...question, options: order.map((index) => question.options[index]), answer: order.indexOf(question.answer) };
}
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character])); }
function timeForQuestion(question) { return timeByLevel[question && question.level] || defaultTime; }
function pointsForQuestion(question) { return pointsByLevel[question && question.level] || 1; }
function pointsLabel(points) { return `${points} ${points === 1 ? 'ponto' : 'pontos'}`; }
function levelBadge(level) {
  if (level === 'misto') {
    const times = Object.values(timeByLevel);
    const points = Object.values(pointsByLevel);
    return `${Math.min(...times)}s a ${Math.max(...times)}s · ${Math.min(...points)} a ${Math.max(...points)} pontos`;
  }
  return `${timeByLevel[level] || defaultTime}s · ${pointsLabel(pointsByLevel[level] || 1)}`;
}
function updateScoreboard() { $('#score-player-one-label').innerHTML = `${escapeHtml(state.players[0])} <b>${state.scores[0]}</b>`; $('#score-player-two-label').innerHTML = `${escapeHtml(state.players[1])} <b>${state.scores[1]}</b>`; }
function updateTimer() { const progress = state.timeTotal ? (state.timer / state.timeTotal) * 100 : 0; $('#timer-value').textContent = state.timer; $('#timer-ring').style.background = `conic-gradient(var(--orange) ${progress}%, #e8dbc9 0)`; }
function startTimer() { clearInterval(state.timerId); state.timer = state.timeTotal; updateTimer(); state.timerId = setInterval(() => { state.timer -= 1; updateTimer(); if (state.timer <= 0) { clearInterval(state.timerId); finishQuestion(null, true); } }, 1000); }
function loadQuestion() {
  const question = state.questions[state.currentQuestion];
  state.locked = false;
  state.timeTotal = timeForQuestion(question);
  $('#question-counter').textContent = `PERGUNTA ${String(state.currentQuestion + 1).padStart(2, '0')} DE ${String(state.questions.length).padStart(2, '0')}`;
  $('#level-label').textContent = `NÍVEL ${levelNames[question.level] || levelNames[state.level]} · ${state.timeTotal}S · ${pointsForQuestion(question)} PTS`;
  $('#question-progress').style.width = `${(state.currentQuestion / state.questions.length) * 100}%`;
  $('#turn-indicator').innerHTML = `Vez de <strong>${escapeHtml(state.players[state.currentPlayer])}</strong>`;
  $('#question-category').textContent = question.category;
  $('#question-text').textContent = question.text;
  $('#answer-feedback').textContent = '';
  $('#answer-feedback').className = 'answer-feedback';
  const letters = ['A', 'B', 'C', 'D'];
  $('#answers-container').innerHTML = question.options.map((option, index) => `<button class="answer-button" data-index="${index}" type="button"><span class="answer-letter">${letters[index]}</span><span>${escapeHtml(option)}</span></button>`).join('');
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
  const answering = state.currentPlayer;
  const opponent = answering === 0 ? 1 : 0;
  const isCorrect = selectedIndex === question.answer;
  const points = pointsForQuestion(question);
  const buttons = [...$('#answers-container').querySelectorAll('.answer-button')];
  buttons.forEach((button, index) => {
    button.disabled = true;
    button.classList.add(index === question.answer ? 'correct' : 'wrong');
    if (index === selectedIndex) button.classList.add('picked');
  });
  const feedback = $('#answer-feedback');
  const scorer = isCorrect ? answering : opponent;
  state.scores[scorer] += points;
  if (isCorrect) {
    feedback.textContent = `Resposta certa! +${pointsLabel(points)} para ${state.players[answering]}.`;
    feedback.classList.add('is-correct');
  } else {
    const opening = timedOut ? 'O tempo acabou' : 'Resposta errada';
    feedback.textContent = `${opening}. A certa era "${question.options[question.answer]}" — ${pointsLabel(points)} para ${state.players[opponent]}.`;
    feedback.classList.add('is-wrong');
  }
  state.lastRound = { scorer, answering, isCorrect, timedOut, points };
  updateScoreboard();
  $('#question-progress').style.width = `${((state.currentQuestion + 1) / state.questions.length) * 100}%`;
  setTimeout(() => {
    state.currentQuestion += 1;
    state.currentPlayer = opponent;
    if (state.currentQuestion >= state.questions.length) showResults();
    else showInterval();
  }, 2200);
}
function showInterval() {
  const [first, second] = state.scores;
  const leader = first === second ? -1 : (first > second ? 0 : 1);
  const gap = Math.abs(first - second);
  const round = state.lastRound;
  $('#interval-progress').textContent = `PLACAR APÓS ${String(state.currentQuestion).padStart(2, '0')} DE ${String(state.questions.length).padStart(2, '0')}`;
  $('#interval-board').innerHTML = state.players
    .map((player, index) => `<div class="interval-side${leader === index ? ' is-leader' : ''}"><span class="interval-name">${escapeHtml(player)}</span><span class="interval-points">${state.scores[index]}</span><span class="interval-delta">${round && round.scorer === index ? `+${round.points} na última pergunta` : ''}</span></div>`)
    .join('<span class="interval-versus" aria-hidden="true">×</span>');
  $('#interval-status').textContent = leader === -1 ? `Empate em ${first} a ${second}.` : `${state.players[leader]} lidera por ${pointsLabel(gap)}.`;
  const next = state.questions[state.currentQuestion];
  $('#interval-next').innerHTML = `Próxima: pergunta ${state.currentQuestion + 1} de ${state.questions.length} · nível ${levelNames[next.level] || levelNames[state.level]} · ${timeForQuestion(next)} segundos · vale ${pointsLabel(pointsForQuestion(next))} · vez de <strong>${escapeHtml(state.players[state.currentPlayer])}</strong>`;
  showScreen('interval');
  startIntervalCountdown();
}
function startIntervalCountdown() {
  clearInterval(state.intervalId);
  let remaining = intervalSeconds;
  const render = () => { $('#interval-countdown').textContent = `Segue automaticamente em ${remaining}s`; };
  render();
  state.intervalId = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) { continueAfterInterval(); return; }
    render();
  }, 1000);
}
function continueAfterInterval() { clearInterval(state.intervalId); showScreen('quiz'); loadQuestion(); }
function readCustomQuestions() { try { return JSON.parse(localStorage.getItem(customQuestionsStorageKey)) || []; } catch (error) { return []; } }
function writeCustomQuestions(questions) { localStorage.setItem(customQuestionsStorageKey, JSON.stringify(questions)); }
function builtInQuestions() { return Object.entries(questionsByLevel).flatMap(([level, list]) => list.map((question, index) => ({ ...question, level, id: `base-${level}-${index}` }))); }
function questionsForLevel(level) { return [...builtInQuestions(), ...readCustomQuestions()].filter((question) => level === 'misto' || question.level === level); }
function updateLevelSettings() {
  const level = state.level;
  const available = level ? questionsForLevel(level).length : 0;
  const roundInput = $('#round-count');
  roundInput.max = available || 1;
  if (available && Number(roundInput.value) > available) roundInput.value = available;
  $('#game-settings').classList.toggle('is-visible', Boolean(level));
  $('#start-game').disabled = !level || !available;
  $('#selected-level-label').textContent = level ? `Nível ${levelNames[level]} · ${levelBadge(level)}` : 'Escolha um nível';
  $('#available-questions').textContent = level ? (available ? `${available} perguntas disponíveis neste nível.` : 'Cadastre pelo menos uma pergunta para iniciar.') : 'Selecione um nível para continuar.';
}
function beginGame(level, rounds) { clearInterval(state.intervalId); state.level = level; state.rounds = rounds; state.questions = shuffle(questionsForLevel(level)).slice(0, rounds).map(shuffleOptions); state.scores = [0, 0]; state.currentQuestion = 0; state.currentPlayer = 0; state.lastRound = null; updateScoreboard(); showScreen('quiz'); loadQuestion(); }
function renderCustomQuestions() {
  const questions = readCustomQuestions();
  $('#custom-question-count').textContent = `${questions.length} ${questions.length === 1 ? 'pergunta cadastrada' : 'perguntas cadastradas'}`;
  $('#custom-question-list').innerHTML = questions.length ? questions.map((question) => `<article class="custom-question-item"><div><p>${escapeHtml(question.text)}</p><small>${levelNames[question.level]} · ${escapeHtml(question.category)}</small></div><button class="delete-question" data-id="${question.id}" type="button">Excluir</button></article>`).join('') : '<p class="history-empty">Nenhuma pergunta personalizada cadastrada.</p>';
  $('#custom-question-list').querySelectorAll('.delete-question').forEach((button) => button.addEventListener('click', () => { writeCustomQuestions(readCustomQuestions().filter((question) => question.id !== button.dataset.id)); renderCustomQuestions(); }));
}
function openQuestionManager() { renderCustomQuestions(); showScreen('manager'); }
function readHistory() { try { return JSON.parse(localStorage.getItem(historyStorageKey)) || []; } catch (error) { return []; } }
function renderHistory() {
  const history = readHistory();
  $('#history-count').textContent = `${history.length} ${history.length === 1 ? 'partida concluída' : 'partidas concluídas'}`;
  $('#history-list').innerHTML = history.length ? history.map((match) => `<article class="history-item"><div><div class="history-players">${escapeHtml(match.players[0])}<span>×</span>${escapeHtml(match.players[1])}</div><div class="history-meta">${match.date} · Nível ${levelNames[match.level]}</div></div><div class="history-score">${match.scores[0]} × ${match.scores[1]}</div></article>`).join('') : '<p class="history-empty">Nenhuma partida concluída ainda. Sua próxima história começa agora.</p>';
}
function openHistory() { renderHistory(); showScreen('history'); }
function showResults() {
  clearInterval(state.timerId);
  clearInterval(state.intervalId);
  const total = state.questions.reduce((sum, question) => sum + pointsForQuestion(question), 0);
  const history = readHistory();
  history.unshift({ players: [...state.players], scores: [...state.scores], level: state.level, date: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date()) });
  localStorage.setItem(historyStorageKey, JSON.stringify(history.slice(0, 20)));
  $('#final-score').innerHTML = state.players.map((player, index) => `<div class="score-card"><span class="score-name">${escapeHtml(player)}</span><span class="score-number">${state.scores[index]}</span><span class="score-total">de ${total} pontos em disputa</span></div>`).join('');
  $('#tie-message').textContent = state.scores[0] === state.scores[1] ? 'Empate' : '';
  showScreen('results');
}
function resetToStart() { clearInterval(state.timerId); clearInterval(state.intervalId); $('#setup-form').reset(); $('#form-error').textContent = ''; showScreen('start'); }

$('#setup-form').addEventListener('submit', (event) => { event.preventDefault(); const first = $('#player-one').value.trim(); const second = $('#player-two').value.trim(); if (!first || !second) { $('#form-error').textContent = 'Preencha o nome dos dois jogadores para continuar.'; return; } if (first.toLowerCase() === second.toLowerCase()) { $('#form-error').textContent = 'Os jogadores precisam ter nomes diferentes.'; return; } state.players = [first, second]; state.level = ''; $('.level-card.is-selected')?.classList.remove('is-selected'); updateLevelSettings(); showScreen('levels'); });
$('.level-grid').querySelectorAll('.level-card').forEach((card) => {
  const note = card.querySelector('small');
  if (note) note.textContent = `${note.textContent} · ${levelBadge(card.dataset.level)}`;
  card.addEventListener('click', () => { $('.level-card.is-selected')?.classList.remove('is-selected'); card.classList.add('is-selected'); state.level = card.dataset.level; updateLevelSettings(); });
});
$('#round-count').addEventListener('input', () => { $('#round-error').textContent = ''; });
$('#start-game').addEventListener('click', () => { const rounds = Number($('#round-count').value); const available = questionsForLevel(state.level).length; if (!Number.isInteger(rounds) || rounds < 1 || rounds > available) { $('#round-error').textContent = `Escolha entre 1 e ${available} rodadas.`; return; } beginGame(state.level, rounds); });
$('#interval-continue').addEventListener('click', continueAfterInterval);
$('#back-to-start').addEventListener('click', resetToStart);
$('#open-history').addEventListener('click', openHistory);
$('#back-from-history').addEventListener('click', resetToStart);
$('#clear-history').addEventListener('click', () => { localStorage.removeItem(historyStorageKey); renderHistory(); });
$('#open-question-manager').addEventListener('click', openQuestionManager);
$('#back-from-manager').addEventListener('click', resetToStart);
$('#question-form').addEventListener('submit', (event) => {
  event.preventDefault();
  $('#question-form-error').className = 'form-error';
  const fields = ['question-category-input', 'question-text-input', 'option-a', 'option-b', 'option-c', 'option-d'];
  if (fields.some((id) => !$('#' + id).value.trim())) { $('#question-form-error').textContent = 'Preencha todos os campos da pergunta.'; return; }
  const question = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, level: $('#question-level').value, category: $('#question-category-input').value.trim().toUpperCase(), text: $('#question-text-input').value.trim(), options: ['option-a', 'option-b', 'option-c', 'option-d'].map((id) => $('#' + id).value.trim()), answer: Number($('#correct-option').value) };
  writeCustomQuestions([question, ...readCustomQuestions()]);
  $('#question-form').reset();
  $('#question-form-error').textContent = 'Pergunta cadastrada com sucesso.';
  $('#question-form-error').className = 'form-error is-success';
  renderCustomQuestions();
});
$('#play-again').addEventListener('click', () => beginGame(state.level, state.rounds));
$('#back-home').addEventListener('click', resetToStart);
