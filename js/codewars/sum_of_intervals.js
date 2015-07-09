// http://www.codewars.com/kata/sum-of-intervals

function sumIntervals(arr) {
	arr.sort(sortByFirstElement);
	var last;
	var sum = arr.reduce(function (previous, current, index) {
		if (index === 0) {
			last = current;
			return previous + (current[1] - current[0]);
		}
		if (isOverlapping(last, current)) {
			var tempSum = 0;
			if ((current[1] > last[1])) {
				tempSum = previous + current[1] - last[1];
				last[1] = current[1];
			} else {
				tempSum = previous;
			}
			return tempSum;
		}
		last = current;
		return previous + (current[1] - current[0]);
	}, 0);
	return sum;
}

function isOverlapping(previous, current) {
	return current[0] < previous[1];
}

function sortByFirstElement(a, b) {
	if (a[0] < b[0]) {
		return -1;
	}
	if (a[0] > b[0]) {
		return 1;
	}
	if (a[1] < b[1]) {
		return -1;
	}
	if (a[1] > b[1]) {
		return 1;
	}
	return 0;
}

describe("sumIntervals", function () {
	it("should calculate the sum of intervals correctly", function () {
	/*	expect(sumIntervals([
			[1, 2],
			[6, 10],
			[11, 15]
		])).toEqual(9);

		expect(sumIntervals([
			[1, 4],
			[7, 10],
			[3, 5]
		])).toEqual(7);

		expect(sumIntervals([
			[1, 6],
			[1, 5],
			[10, 20],
			[16, 19],
			[5, 11]
		])).toEqual(19);*/
		expect(sumIntervals([
			[1, 5],
			[2, 6],
			[3, 7],
			[1, 7]
		])).toEqual(6);
	})
});
