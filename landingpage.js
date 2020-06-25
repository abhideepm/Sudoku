var main = document.createElement('div')
main.classList.add(
	'margin-center',
	'd-flex',
	'flex-column',
	'align-items-center',
	'text-center'
)
document.body.appendChild(main)

var title = document.createElement('div')
title.classList.add('my-3', 'display-3', 'text-white')
title.innerHTML = 'Welcome to Sudoku!'
main.appendChild(title)

var subtitle = document.createElement('div')
subtitle.classList.add('my-3', 'text-white', 'h3')
subtitle.innerHTML = 'Click the button below to Play!'
main.appendChild(subtitle)

var playbtn = document.createElement('a')
playbtn.classList.add('my-3')
playbtn.classList.add('btn', 'btn-outline-light', 'btn-lg')
playbtn.href = 'sudokugame.html'
playbtn.setAttribute('role', 'button')
playbtn.innerHTML = 'Play!'
main.appendChild(playbtn)
