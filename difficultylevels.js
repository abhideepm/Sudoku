var jumbotron = document.createElement('div')
jumbotron.classList.add('jumbotron', 'jumbotron-fluid', 'margin-center')
jumbotron.style.backgroundColor = 'transparent'
document.body.appendChild(jumbotron)

var container = document.createElement('div')
container.classList.add('container', 'text-center')
jumbotron.appendChild(container)

var title = document.createElement('div')
title.classList.add('display-4', 'text-center', 'm-3', 'text-light')
title.innerHTML = 'Select Difficulty Level'
container.appendChild(title)

var easy = document.createElement('a')
easy.classList.add('btn', 'btn-outline-success', 'btn-lg', 'm-4')
easy.href = 'game.html?level=easy'
easy.setAttribute('role', 'button')
easy.innerHTML = 'Easy'
container.appendChild(easy)

var medium = document.createElement('a')
medium.classList.add('btn', 'btn-outline-warning', 'btn-lg', 'm-4')
medium.href = 'game.html?level=medium'
medium.setAttribute('role', 'button')
medium.innerHTML = 'Medium'
container.appendChild(medium)

var hard = document.createElement('a')
hard.classList.add('btn', 'btn-outline-danger', 'btn-lg', 'm-4')
hard.href = 'game.html?level=hard'
hard.setAttribute('role', 'button')
hard.innerHTML = 'Hard'
container.appendChild(hard)
