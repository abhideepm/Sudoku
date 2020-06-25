var main = document.createElement('div')
main.classList.add(
	'margin-center',
	'd-flex',
	'flex-column',
	'align-items-center',
	'text-center'
)
document.body.appendChild(main)

var title = document.createElement('h1')
title.innerHTML = 'Welcome to Sudoku!'
main.appendChild(title)

var subtitle = document.createElement('h3')
subtitle.innerHTML = 'Click the button below to Play!'
main.appendChild(subtitle)

var playbtn = document.createElement('button')
playbtn.classList.add('btn', 'btn-success')
playbtn.innerHTML = 'Play!'
main.appendChild(playbtn)
