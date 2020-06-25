let sudokuVals = new Array(9).fill(0).map(() => new Array(9).fill(0))
let cloneSudokuVals
// console.log(sudokuVals)
//row and col size for the big sudoku
let N = 9
//row and col size for each box
let BoxN = 3

let url = new URL(window.location.href)
let diff = url.searchParams.get('level')
//generate random numbers for sudoku
function fillRandomValues() {
	fillDiagonalBoxes()
	fillRemainingBoxes(0, BoxN)
	cloneSudokuVals = sudokuVals.map((arr) => arr.slice())
	console.log(cloneSudokuVals)
	if (diff === 'easy') removeKDigits(15)
	else if (diff === 'medium') removeKDigits(30)
	else if (diff === 'hard') removeKDigits(50)
}

function fillDiagonalBoxes() {
	for (let i = 0; i < N; i += BoxN) {
		//define starting point for diagonal boxes
		fillBoxValues(i, i)
	}
}

function fillRemainingBoxes(row, col) {
	if (col === N) {
		col = 0
		row++
		if (row === N) return true
	}

	if (sudokuVals[row][col] !== 0) return fillRemainingBoxes(row, col + 1)

	for (let val = 1; val <= N; val++) {
		if (isSafe(row, col, val)) {
			sudokuVals[row][col] = val
			if (fillRemainingBoxes(row, col + 1)) return true
			sudokuVals[row][col] = 0
		}
	}
	return false
}

function removeKDigits(K) {
	let count = K
	while (count !== 0) {
		let randomCell = getRandInteger(N * N)
		// console.log(randomCell)
		let i = Math.floor(randomCell / N)
		if (i == N) continue
		let j = randomCell % N

		if (sudokuVals[i][j] !== 0) {
			count--
			sudokuVals[i][j] = 0
		}
	}
}

function isSafe(row, col, num) {
	return (
		uniqueInBox(row - (row % BoxN), col - (col % BoxN), num) &&
		uniqueInCol(col, num) &&
		uniqueInRow(row, num)
	)
}

function fillBoxValues(row, col) {
	let num
	for (let i = 0; i < BoxN; i++)
		for (let j = 0; j < BoxN; j++) {
			do {
				num = getRandInteger(N)
			} while (!uniqueInBox(row, col, num))
			sudokuVals[row + i][col + j] = num
		}
}

//check for unique in box
function uniqueInBox(row, col, num) {
	for (let i = 0; i < BoxN; i++)
		for (let j = 0; j < BoxN; j++)
			if (sudokuVals[row + i][col + j] === num) return false
	return true
}

//check for unique in row
function uniqueInRow(row, num) {
	for (let j = 0; j < N; j++) if (sudokuVals[row][j] === num) return false
	return true
}

//check for unique in col
function uniqueInCol(col, num) {
	for (let i = 0; i < N; i++) if (sudokuVals[i][col] === num) return false
	return true
}
//get random number inclusive of min and max
function getRandInteger(num) {
	return Math.floor(Math.random() * num + 1)
}

//sudoku validation
function validateSudoku() {
	for (let i = 0; i < N; i++) {
		let vr = validRow(i)
		let vc = validCol(i)
		if (!(vr && vc)) {
			return false
		}
	}
	// console.log('hello')
	return validateBox()
}

function validRow(row) {
	let s = new Set()
	for (let j = 0; j < N; j++) {
		let temp = sudokuVals[row][j]
		if (s.has(temp)) return false
		else s.add(temp)
	}
	return true
}

function validCol(col) {
	let s = new Set()
	for (let i = 0; i < N; i++) {
		let temp = sudokuVals[i][col]
		if (s.has(temp)) return false
		else s.add(temp)
	}
	return true
}

function validateBox() {
	for (let row = 0; row < N; row += 3) {
		for (let col = 0; col < N; col += 3) {
			// console.log('row', row, 'col', col)
			let s = new Set()
			for (let i = row; i < row + 3; i++) {
				for (let j = col; j < col + 3; j++) {
					// console.log('i', i, 'j', j)
					if (s.has(sudokuVals[i][j])) return false
					else s.add(sudokuVals[i][j])
				}
			}
		}
	}
	return true
}
// fillRandomValues()
// console.log(sudokuVals)

//page structure
var main = document.createElement('div')
main.classList.add('margin-center', 'text-center')
document.body.appendChild(main)

var title = document.createElement('div')
title.classList.add('text-white', 'display-2')
title.innerHTML = 'Sudoku'
main.appendChild(title)

var clockicon = document.createElement('span')
clockicon.classList.add('material-icons', 'text-white')
clockicon.innerHTML = 'alarm'
main.appendChild(clockicon)

var timer = document.createElement('div')
timer.classList.add('text-center', 'h1', 'text-white')
timer.innerHTML = 4 + ':' + '00'
main.appendChild(timer)
// startTimer()
let stopTimer
function startTimer() {
	// console.log(timer.innerHTML)
	let presentTime = timer.innerHTML
	let timeArray = presentTime.split(':')
	let m = timeArray[0]
	let s = checkSecond(timeArray[1] - 1)
	if (s == 59) {
		m = m - 1
	}
	if (m < 0) {
		// alert('timer completed')
		if (validateSudoku()) {
			window.location = 'resultswon.html?points=0'
		} else {
			window.location = 'resultslost.html'
		}
		// console.log(validateSudoku())
	} else timer.innerHTML = m + ':' + s
	// console.log(m, ':', s)
	if (m >= 0) stopTimer = setTimeout(startTimer, 1000)
}

function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {
		sec = '0' + sec
	} // add zero in front of numbers < 10
	if (sec < 0) {
		sec = '59'
	}
	return sec
}

var container = document.createElement('div')
container.classList.add('container-fluid', 'margin-center')
document.body.appendChild(container)

var centerrow = document.createElement('div')
centerrow.classList.add('row')
container.appendChild(centerrow)

var centercol = document.createElement('div')
centercol.classList.add('offset-1', 'col-6')
centerrow.appendChild(centercol)

var btncol = document.createElement('div')
btncol.classList.add(
	'offset-1',
	'col-2',
	'd-flex',
	'align-items-center',
	'flex-wrap'
)
centerrow.appendChild(btncol)

var startbtn = document.createElement('button')
startbtn.innerHTML = 'Start!'
startbtn.addEventListener('click', () => {
	console.log('inside start')
	resetGrid()
	fillRandomValues()
	makeGrid()
	resetTimer()
	startTimer()
	startbtn.disabled = true
	submitbtn.disabled = false
})
startbtn.classList.add(
	'btn',
	'btn-outline-success',
	'btn-lg',
	'margin-center',
	'w-75',
	'text-center'
)
btncol.appendChild(startbtn)

var resetbtn = document.createElement('button')
resetbtn.innerHTML = 'Reset!'
resetbtn.addEventListener('click', () => {
	console.log('inside reset')
	resetGrid()
	makeGrid()
	resetTimer()
	clearInterval(stopTimer)
	startbtn.disabled = false
	submitbtn.disabled = true
})
resetbtn.classList.add(
	'btn',
	'btn-outline-danger',
	'btn-lg',
	'margin-center',
	'w-75',
	'text-center'
)
btncol.appendChild(resetbtn)

var submitbtn = document.createElement('button')
submitbtn.innerHTML = 'Submit!'
submitbtn.disabled = true
submitbtn.addEventListener('click', () => {
	generatePoints()
})
submitbtn.classList.add(
	'btn',
	'btn-outline-warning',
	'btn-lg',
	'margin-center',
	'w-75',
	'text-center'
)
btncol.appendChild(submitbtn)

var backbtn = document.createElement('button')
backbtn.innerHTML = 'Select Level'
backbtn.addEventListener('click', () => {
	window.location = 'difficultylevels.html'
})
backbtn.classList.add(
	'btn',
	'btn-outline-info',
	'btn-lg',
	'margin-center',
	'w-75',
	'text-center'
)
btncol.appendChild(backbtn)

makeGrid()
function makeGrid() {
	centercol.innerHTML = ''
	//making rows and cols
	for (let i = 0; i < N; i++) {
		let row = document.createElement('div')
		row.classList.add('form-row', 'mx-0', 'justify-content-center')
		for (let j = 0; j < N; j++) {
			let col = document.createElement('div')
			col.classList.add('col-1', 'border-dark', 'p-0')
			if (i % BoxN === 2) col.classList.add('border-bottom')
			if (j % BoxN === 2) col.classList.add('border-right')
			if (i == N - 1) col.classList.remove('border-bottom')
			if (j == N - 1) col.classList.remove('border-right')
			if (sudokuVals[i][j] !== 0) {
				let input = document.createElement('input')
				input.type = 'number'
				input.readOnly = true
				input.classList.add(
					'form-control-lg',
					'border',
					'border-dark',
					'text-center',
					'mx-0',
					'pr-0',
					'w-100',
					'rounded-0'
				)
				input.id = 'input' + (i + 1) + (j + 1)
				input.value = sudokuVals[i][j]
				col.appendChild(input)
			} else {
				let input = document.createElement('input')
				input.type = 'number'
				// input.min = '1'
				// input.max = '9'
				input.classList.add(
					'form-control-lg',
					'border',
					'border-dark',
					'mx-0',
					'pl-4',
					'pr-0',
					'w-100',
					'rounded-0'
				)
				input.id = 'input,' + (i + 1) + ',' + (j + 1)
				input.addEventListener('change', (e) => {
					let temp = +input.value
					// console.log(temp)
					if (temp < 1 || temp > 9) {
						alert('Enter number between 1 and 9')
						input.value = ''
					}
					// console.log(input.id)
					let inputArr = input.id.split(',')
					let i = inputArr[1]
					let j = inputArr[2]
					console.log(i, j)
					console.log(sudokuVals[i - 1][j - 1])
					console.log(cloneSudokuVals[i - 1][j - 1])
					console.log(input.classList)
					if (temp !== cloneSudokuVals[i - 1][j - 1]) {
						input.classList.add('text-white')
						input.classList.add('bg-danger')
					} else {
						input.classList.remove('bg-danger')
						input.classList.remove('text-white')
					}
					console.log(input.classList)
					e.preventDefault()
				})
				col.appendChild(input)
			}
			row.appendChild(col)
		}
		centercol.appendChild(row)
	}
}

function resetGrid() {
	sudokuVals = []
	sudokuVals = new Array(9).fill(0).map(() => new Array(9).fill(0))
	// console.log(sudokuVals)
}

function resetTimer() {
	timer.innerHTML = 4 + ':' + '00'
}

function generatePoints() {
	if (validateSudoku()) {
		let val = timer.innerHTML
		let [m, s] = val.split(':').map(Number)
		// console.log(m, s)
		let minToSec = 0
		if (m > 0) {
			switch (m) {
				case 1:
					minToSec = 60
					break
				case 2:
					minToSec = 120
					break
				case 3:
					minToSec = 180
					break
			}
		}
		// console.log(minToSec)
		let timeInSec = m > 0 ? minToSec + s : s
		let wonURL = 'resultswon.html?points='
		let remainingTime = 240 - timeInSec
		// console.log(remainingTime)
		if (remainingTime < 60) wonURL += '400'
		else if (remainingTime < 120 && remainingTime > 60) wonURL += '300'
		else if (remainingTime < 180 && remainingTime > 120) wonURL += '200'
		else wonURL += '100'
		// console.log(wonURL)
		window.location = wonURL
	} else {
		window.location = 'resultslost.html'
	}
}
