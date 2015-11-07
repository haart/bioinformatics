var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	k = Number(res.shift()),
	dna = res;

var hamming = function (string1, string2) {
	var distance = 0;

	string1.split('').forEach(function (element, index) {
		if (element !== string2[index]) {
			distance++
		}
	});

	return distance
};

var numberToSymbol = function (number) {
	var symbols = ['A', 'C', 'G', 'T'];

	return symbols[number];
};

var numberToPattern = function numberToPattern(number, length) {
	if (length === 1) {
		return numberToSymbol(number)
	}

	var prefixIndex = Math.floor(number / 4),
		remainder = number % 4,
		prefixPattern = numberToPattern(prefixIndex, length - 1),
		symbol = numberToSymbol(remainder);

	return prefixPattern + symbol
};

var distanceBetweenPatternAndStrings = function (pattern, dna) {
	var k = pattern.length,
		distance = 0,
		hammingDistance;

	dna.forEach(function (text) {
		var i = 0,
			currentDistance;

		hammingDistance = Infinity;

		for (; i < text.length - k + 1; i++) {
			currentDistance = hamming(pattern, text.substr(i, k));
			if (hammingDistance > currentDistance) {
				hammingDistance = currentDistance;
			}
		}
		distance += hammingDistance;
	});

	return distance;
};

var medianString = function (dna, k) {
	var distance = Infinity,
		powerOfK = Math.pow(4, k),
		i = 0,
		pattern,
		currentDistance,
		median;

	for (; i < powerOfK; i++) {
		pattern = numberToPattern(i, k);
		currentDistance = distanceBetweenPatternAndStrings(pattern, dna);
		if (distance > currentDistance) {
			distance = currentDistance;
			median = pattern;
		}
	}

	return median;
};

console.log(medianString(dna, k));