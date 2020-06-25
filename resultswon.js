var jumbotron = document.createElement('div')
jumbotron.classList.add('jumbotron', 'jumbotron-fluid')
document.body.appendChild(jumbotron)

var container = document.createElement('div')
container.classList.add('container', 'text-center')
jumbotron.appendChild(container)

var title = document.createElement('div')
title.classList.add('display-1', 'text-center', 'm-3')
title.innerHTML = 'You Won!'
container.appendChild(title)

var url = new URL(window.location.href)
let points = +url.searchParams.get('points')

var subtitle = document.createElement('div')
subtitle.classList.add('h2', 'text-center')
subtitle.innerHTML =
	points === 0
		? 'Since you finished just in time, you are not awarded any points'
		: 'You scored ' + points + ' Points'
container.appendChild(subtitle)

var home = document.createElement('a')
home.classList.add('btn', 'btn-primary', 'btn-lg')
home.href = 'index.html'
home.setAttribute('role', 'button')
home.innerHTML = 'Home'
container.appendChild(home)
