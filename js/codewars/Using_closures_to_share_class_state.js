/* http://www.codewars.com/kata/53583765d5493bfdf5001b35 */

// Let's make a Cat constructor!
var Cat = (function () {
	var _weight = 0, _totalCats = 0, _totalWeight = 0;

	function Cat(name, weight) {
		"use strict";
		this.name = name;
		this.weight = weight;
	}

	Cat.prototype.averageWeight = function () {
		return _totalWeight / _totalCats;
	};

	Object.defineProperty(Cat.prototype, 'weight', {
		get: function () {
			return _weight;
		},
		set: function (newValue) {
			_weight = newValue;
			_totalCats++;
			_totalWeight = _totalWeight + _weight;
		},
		enumerable: true,
		configurable: true
	});
	return Cat;
}());

describe("Cat", function () {

	it("should should have a weight", function () {
		var cat = new Cat("A", 30);
		expect(cat.averageWeight()).toEqual(30);
		var cat = new Cat("A", 10);
		expect(cat.averageWeight()).toEqual(20);
		var cat = new Cat("A", 5);
		expect(cat.averageWeight()).toEqual(15);
	});
});
