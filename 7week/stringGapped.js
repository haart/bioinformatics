var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	d = Number(res.shift()),
	text = res;

var stringSpelledByPattern = function (nodes) {
	var computedDna = nodes.shift(),
		lastPosition = computedDna.length - 1;

	nodes.forEach(function (dna) {
		computedDna += dna[lastPosition];
	});

	return computedDna;
};

var stringGapped = function (d, text) {
	var firstPatterns = [],
		secondPatterns = [],
		prefixString,
		suffixString;

	text.map(function (pair) {
		return pair.split('|');
	}).forEach(function (pair) {
		firstPatterns.push(pair[0]);
		secondPatterns.push(pair[1]);
	});

	prefixString = stringSpelledByPattern(firstPatterns);
	suffixString = stringSpelledByPattern(secondPatterns);

	var k = firstPatterns[0].length;
	for (var i = k + d; i < prefixString.length; i++) {
		if (prefixString[i] !== suffixString[i - k - d]) {
			return false;
		}
	}

	return prefixString + suffixString.substr(suffixString.length - (k + d));
};

console.log(stringGapped(d, text));