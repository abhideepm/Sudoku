let sudokuVals = new Array(9).fill(0).map(() => new Array(9).fill(0))
// console.log(sudokuVals)
//row and col size for the big sudoku
let N = 9
//row and col size for each box
let BoxN = 3

//generate random numbers for sudoku
function fillRandomValues() {
	fillDiagonalBoxes()
	// fillRemainingBoxes(0, BoxN)
	// remove50Digits()
}

function fillDiagonalBoxes() {
	for (let i = 0; i < N; i += BoxN) {
		//define starting point for diagonal boxes
		fillBoxValues(i, i)
	}
}

function fillRemainingBoxes(row, col) {
	console.log('row', row, 'col', col)
	if (col >= N && row < N - 1) {
		row = row + 1
		col = 0
	}
	if (row >= N && col >= N) return true

	if (row < BoxN) {
		if (col < BoxN) col = BoxN
	} else if (row < N - BoxN) {
		let val = Math.floor(row / BoxN) * BoxN
		if (col === val) col = col + BoxN
	} else {
		if (col === N - BoxN) {
			row = row + 1
			col = 0
			if (col >= N) return true
		}
	}

	for (let num = 1; num <= N; num++) {
		if (isSafe(row, col, num)) {
			sudokuVals[row][col] = num
			if (fillRemainingBoxes(row, col + 1)) return true

			sudokuVals[row][col] = 0
		}
	}
	return false
}

function remove50Digits() {
	let count = 10
	while (count !== 0) {
		let randomCell = getRandInteger(N * N)
		// console.log(randomCell)
		let i = Math.floor(randomCell / N)
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
