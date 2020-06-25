let sudokuVals = new Array(9).fill(0).map(() => new Array(9).fill(0))
// console.log(sudokuVals)
//row and col size for the big sudoku
let N = 9
//row and col size for each box
let BoxN = 3

//generate random numbers for sudoku
function fillRandomValues() {
	fillDiagonalBoxes()
	fillRemainingBoxes(0, BoxN)
	remove50Digits()
}

function fillDiagonalBoxes() {
	for (let i = 0; i < N; i += BoxN) {
		//define starting point for diagonal boxes
		fillBoxValues(i, i)
	}
}

function fillRemainingBoxes(row, col) {}

function remove50Digits() {
	let count = 10
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

fillRandomValues()
console.log(sudokuVals)

//page structure
var main = document.createElement('div')
main.classList.add('margin-center')
document.body.appendChild(main)

var timer = document.createElement('div')
timer.classList.add(
	'border',
	'border-dark',
	'text-center',
	'h1',
	'bg-dark',
	'text-white'
)
timer.innerHTML = 4 + ':' + 0
main.appendChild(timer)
startTimer()

function startTimer() {
	var presentTime = timer.innerHTML
	var timeArray = presentTime.split(':')
	var m = timeArray[0]
	var s = checkSecond(timeArray[1] - 1)
	if (s == 59) {
		m = m - 1
	}
	m < 0 ? alert('timer completed') : (timer.innerHTML = m + ':' + s)
	// console.log(m, ':', s)
	if (m >= 0) setTimeout(startTimer, 1000)
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
centercol.classList.add('offset-3', 'col-6')
centerrow.appendChild(centercol)

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
				'px-0',
				'w-100',
				'rounded-0'
			)
			input.value = sudokuVals[i][j]
			col.appendChild(input)
		} else {
			let input = document.createElement('input')
			input.type = 'number'
			input.min = '1'
			input.max = '9'
			input.classList.add(
				'form-control-lg',
				'border',
				'border-dark',
				'mx-0',
				'px-0',
				'w-100',
				'rounded-0'
			)
			col.appendChild(input)
		}
		row.appendChild(col)
	}
	centercol.appendChild(row)
}
