// http://www.codewars.com/kata/54c2fc0552791928c9000517

function sum_of_large_ints(n, m) {
    "use strict";
    var cycles = Math.floor(n / m);
    var remainder = n % m;
    if (m === 0) return;

    var sumForFullCycles = cycles * sumOfNIntegers(m - 1);
    var sumForRemainder = remainder === 0 ? 0 : sumOfNIntegers(remainder);
    return sumForFullCycles + sumForRemainder;
}

function sumOfNIntegers (n) {
    "use strict";
    return n * (n + 1) / 2;
}

describe("sum_of_large_ints", function() {
    it("should calculate the sum correctly", function() {
        expect(sum_of_large_ints(10, 5)).toEqual(20);
        expect(sum_of_large_ints(20, 20)).toEqual(190);
        expect(sum_of_large_ints(15, 10)).toEqual(60);
    })
});
