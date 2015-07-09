function connectFour(board) {
	'use strict';
	var rows = 6, columns = 7;
	var filledSlots = 0;
	for (var row = 0; row < rows; row++) {
		for (var column = 0; column < columns; column++) {
			var value = board[row][column];
			if (value !== '-') {
				filledSlots++;
				if (wins([winsTopRight, winsHorizontally, winsVertically, winsBottomRight], [row, column], value)) {
					return value;
				}
			}
		}
	}
	// nobody won
	if (filledSlots === rows * columns) {
		return "draw";
	} else {
		return "in progress";
	}

	function wins(fnArray, elem, value) {
		var hasWon = false;
		fnArray.every(function (fn) {
			if (fn.call(null, elem, value)) {
				hasWon = true;
				return false;
			}
			return true;
		});
		return hasWon;
	}

	function winsHorizontally(elem, colour) {
		"use strict";
		var row = elem[0];
		var column = elem[1];
		if (column + 4 > columns)
			return false;

		return board[row]
			.slice(column, column + 4)
			.every(function (elemColour) {
				return elemColour === colour;
			});
	}

	function winsBottomRight(elem, colour) {
		"use strict";
		var row = elem[0];
		var column = elem[1];
		if (column + 4 > columns || row + 4 > rows)
			return false;

		for (var i = 0; i <= 3; i++) {
			var colourInElem = board[row + i][column+i];
			if (colourInElem !== colour)
				return false;
		}
		return true;
	}

	function winsTopRight(elem, colour) {
		"use strict";
		var row = elem[0];
		var column = elem[1];
		if (column + 4 > columns || row - 4 < -1)
			return false;

		for (var i = 0; i <= 3; i++) {
			var colourInElem = board[row - i][column+i];
			if (colourInElem !== colour)
				return false;
		}
		return true;
	}

	function winsVertically(elem, colour) {
		"use strict";
		var row = elem[0];
		var column = elem[1];
		if (row + 4 > rows)
			return false;

		for (var i = 0; i <= 3; i++) {
			var colourInElem = board[row + i][column];
			if (colourInElem !== colour)
				return false;
		}
		return true;
	}
}
describe("four-in-a-row", function () {
	fit("should get the correct winner top right ", function () {
		var board = [
			['-', '-', '-', 'R', '-', '-', 'R'],
			['-', '-', '-', 'R', 'R', 'R', '-'],
			['-', '-', '-', 'Y', 'R', 'Y', '-'],
			['-', '-', 'R', 'R', 'Y', 'Y', 'R'],
			['-', 'Y', 'Y', 'Y', 'R', 'R', 'Y'],
			['R', 'Y', 'R', 'R', 'R', 'Y', 'R']
		];

		expect(connectFour(board)).toEqual("R");
	});

	fit("should get the correct winner horizontally", function () {
		var board = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', 'R', 'R', 'R', 'R'],
			['-', '-', '-', 'Y', 'Y', 'R', 'Y'],
			['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
			['-', '-', 'Y', 'Y', 'R', 'R', 'R']
		];
		expect(connectFour(board)).toEqual("R");

		board = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', 'R', 'R', 'R'],
			['-', '-', 'Y', 'Y', 'Y', 'Y', 'R'],
			['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
			['-', '-', 'Y', 'Y', 'R', 'R', 'R']
		];

		expect(connectFour(board)).toEqual("Y");

	});

	fit("should get the correct winner vertically", function () {
		var board = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', 'Y', 'R', 'R', 'R'],
			['-', '-', '-', 'Y', 'Y', 'R', 'Y'],
			['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
			['-', '-', 'Y', 'Y', 'R', 'R', 'R']
		];

		expect(connectFour(board)).toEqual("Y");

		board = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', 'Y', 'R', 'R', 'R'],
			['-', '-', '-', 'R', 'R', 'Y', 'R'],
			['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
			['-', '-', 'Y', 'Y', 'R', 'R', 'R']
		];

		expect(connectFour(board)).toEqual("R");

	});

	fit("should get the correct winner down right ", function () {
		var board = [
			['-', '-', '-', 'R', '-', '-', '-'],
			['-', '-', '-', 'R', 'R', 'R', '-'],
			['-', '-', '-', 'Y', 'Y', 'R', '-'],
			['-', '-', 'R', 'Y', 'Y', 'Y', 'R'],
			['-', 'Y', 'R', 'Y', 'Y', 'R', 'Y'],
			['R', 'Y', 'Y', 'R', 'R', 'Y', 'R']
		];

		expect(connectFour(board)).toEqual("R");
	});

	fit("should get draw if the board is full and no winners", function () {
		"use strict";
		var board = [
			['Y', 'R', 'Y', 'Y', 'R', 'R', 'Y'],
			['R', 'Y', 'Y', 'R', 'Y', 'R', 'Y'],
			['R', 'R', 'Y', 'Y', 'R', 'R', 'R'],
			['R', 'Y', 'R', 'R', 'Y', 'Y', 'Y'],
			['Y', 'R', 'Y', 'Y', 'R', 'R', 'R'],
			['Y', 'R', 'Y', 'Y', 'R', 'R', 'R']
		];

		expect(connectFour(board)).toEqual("draw");

	});

	fit("should get In progress if the board is not full and no winners", function () {
		"use strict";
		var board = [
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', '-', '-', '-'],
			['-', '-', '-', '-', 'R', 'R', 'R'],
			['-', '-', '-', 'Y', 'Y', 'Y', 'R'],
			['-', '-', '-', 'Y', 'R', 'Y', 'Y'],
			['Y', 'R', 'Y', 'Y', 'R', 'R', 'R']
		];

		expect(connectFour(board)).toEqual("in progress");

	});
});
