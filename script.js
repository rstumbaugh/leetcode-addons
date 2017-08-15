function hide() {
  addRandomButton();
  hideLabels();
  hideAttemptsSubmissions();
}

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

function getRandomQuestion() {
  var lst = document.querySelectorAll('.question-list-table td:nth-child(3)');
  var idx = Math.floor(Math.random() * lst.length);
  var path = lst[idx].querySelector('a').getAttribute('href');
  window.location.href = 'https://leetcode.com' + path;
}

function hideLabels() {
  var labels = document.querySelectorAll('.difficulty-label');

  for (var i = 0; i < labels.length; i++) {
    hideLabel(labels[i]);
    if (labels[i].onclick == null) 
      labels[i].onclick = function(e) { toggle(e.target); }
  }
}

function hideAttemptsSubmissions() {
  var sidebar = '#desktop-side-bar ul li:nth-child(3) span.pull-right';
  var item = document.querySelector(sidebar)
  if (!item || /hidden/i.test(item.innerHTML)) return;
  item.innerHTML = 'Hidden'
}

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

function hideLabel(label) {
  if (/hidden/.test(label.className)) return;
  label.className += ' hidden-difficulty';
  label.innerHTML = 'Hidden';
}

window.onload = hide;
document.addEventListener('DOMNodeInserted', hide)
