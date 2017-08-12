function hide() {
  hideLabels();
  hideAttemptsSubmissions();
}

function hideLabels() {
  var labels = document.querySelectorAll('.label');

  for (var i = 0; i < labels.length; i++) {
    hideLabel(labels[i]);
    labels[i].onclick = function(e) { toggle(e.target); }
  }
}

function hideAttemptsSubmissions() {
  var sidebar = '#desktop-side-bar ul li:nth-child(3) span.pull-right';
  var item = document.querySelector(sidebar)
  if (/hidden/i.test(item.innerHTML)) return;
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
  label.classList += ' hidden-difficulty';
  label.innerHTML = 'Hidden';
}

window.onload = hide;
document.addEventListener('DOMNodeInserted', hide)
