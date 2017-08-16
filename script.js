function init() {
  addRandomButton();
  hideLabels();
  hideAttemptsSubmissions();
}

/* on question list page, add button to choose random from list */
function addRandomButton() {
  var filterBar = document.querySelector('.filter-tag-bar');
  if (filterBar && !filterBar.querySelector('span.random-question-btn')) {
    var randomBtn = document.createElement('span');
    randomBtn.innerHTML = 'Random Question';
    randomBtn.className = 'random-question-btn';
    randomBtn.onclick = getRandomQuestion;
    filterBar.style.paddingTop = '10px';
    filterBar.append(randomBtn);
  }
}

/* choose random question from current list of questions */
function getRandomQuestion() {
  var lst = document.querySelectorAll('.question-list-table td:nth-child(3)');
  var idx = Math.floor(Math.random() * lst.length);
  var path = lst[idx].querySelector('a').getAttribute('href');
  window.location.href = 'https://leetcode.com' + path;
}

/* hide difficulty label on question page */
function hideLabels() {
  var label = document.querySelector('.difficulty-label');
  if (label) {
    hideLabel(label);
    if (label.onclick == null) {
      label.onclick = function(e) { toggle(e.target) }
    }
  }
}

/* hide successful attempts on question page */
function hideAttemptsSubmissions() {
  var sidebar = '#desktop-side-bar ul li:nth-child(3) span.pull-right';
  var item = document.querySelector(sidebar)
  if (!item || /hidden/i.test(item.innerHTML)) return;
  item.innerHTML = 'Hidden'
}

/* toggle difficulty label */
function toggle(label) {
  var text;

  if (/hidden/.test(label.className)) {
    if (/success|easy/i.test(label.className))
      text = 'Easy'
    else if (/warning|medium/i.test(label.className))
      text = 'Medium'
    else if (/danger|hard/i.test(label.className))
      text = 'Hard'

    label.innerHTML = text;
    label.className = label.className.replace('hidden-difficulty', '')
  } else {
    hideLabel(label);
  }
}

/* hide label if not already hidden */
function hideLabel(label) {
  if (/hidden/.test(label.className)) return;
  label.className += ' hidden-difficulty';
  label.innerHTML = 'Hidden';
}

window.onload = init;
document.addEventListener('DOMNodeInserted', init)
