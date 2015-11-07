var suffix = function (pattern) {
	return pattern.substring(1, pattern.length);
};

var firstSymbol = function (pattern) {
	return pattern.substring(0, 1);
};

var symbolToNumber = function (symbol) {
	var symbols = {A: 0, C: 1, G: 2, T: 3};

	return symbols[symbol];
};

var numberToSymbol = function (number) {
	var symbols = ['A', 'C', 'G', 'T'];

	return symbols[number];
};

var hamming = function (string1, string2) {
	var distance = 0;

	string1.split('').forEach(function (element, index) {
		if (element !== string2[index]) {
			distance++
		}
	});

	return distance
};

var patternToNumber = function patternToNumber(pattern) {
	if (pattern.length === 0) {
		return 0;
	}

	var lastCharacter = pattern[pattern.length - 1];
	var remainingString = pattern.substring(0, pattern.length - 1);

	return 4 * patternToNumber(remainingString) + symbolToNumber(lastCharacter)
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

var nucleotides = function () {
	return ['A', 'C', 'G', 'T']
};

var neighbors = function neighbors(pattern, d) {
	if (d === 0) {
		return [pattern];
	}

	if (pattern.length === 1) {
		return nucleotides();
	}

	var neighborhood = [],
		suffixNeighbors = neighbors(suffix(pattern), d);

	suffixNeighbors.forEach(function (text) {
		if (hamming(suffix(pattern), text) < d) {
			nucleotides().forEach(function (x) {
				neighborhood.push(x + text);
			})
		} else {
			neighborhood.push(firstSymbol(pattern) + text)
		}
	});

	return neighborhood
};

//console.log(neighbors('TAGC', '3').length);

var approximatePatterns = function (text, pattern, d) {
	var textLength = text.length - pattern.length,
		deltaPattern,
		position = [];

	for (var i = 0; i <= textLength; i++) {
		deltaPattern = text.substring(i, i + pattern.length);

		if (hamming(pattern, deltaPattern) <= d) {
			position.push(i);
		}
	}

	return position;
};

//console.log(approximatePatterns('TACGCATTACAAAGCACA', 'AA', 1).length);

var reverseComplement = function (strand) {
	var complements = {
		"A": "T",
		"T": "A",
		"C": "G",
		"G": "C"
	};

	return strand.split('').map(function (item) {
		return complements[item]
	}).reverse().join('');
};

var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

var pattern = res[0],
	k = parseInt(res[1], 10),
	d = parseInt(res[2], 10);

var frequentWordsWithMismatches = function (text, k, d) {
	var frequentPatterns = {},
		powerOfK = Math.pow(4, k),
		frequencyArray = [],
		close = [],
		i,
		textLength = text.length - k,
		neighborhood;

	for (i = 0; i < powerOfK; i++) {
		close[i] = 0;
		frequencyArray[i] = 0;
	}

	for (i = 0; i <= textLength; i++) {
		neighborhood = neighbors(text.substring(i, i + k), d);

		neighborhood.forEach(function (pattern) {
			close[patternToNumber(pattern)] = 1;
		});
	}

	for (i = 0; i < powerOfK; i++) {
		if (close[i] === 1) {
			frequencyArray[i] = approximatePatterns(text, numberToPattern(i, k), d).length + approximatePatterns(text, reverseComplement(numberToPattern(i, k)), d).length
		}
	}

	var max = 0;
	for (i = 0; i < frequencyArray.length; i++) {
		if (frequencyArray[i] > max) {
			max = frequencyArray[i];
		}
	}

	for (i = 0; i < powerOfK; i++) {
		if (frequencyArray[i] === max) {
			frequentPatterns[numberToPattern(i, k)] = 1;
		}
	}

	return Object.keys(frequentPatterns);
};

console.log(frequentWordsWithMismatches(pattern, k, d).join(' '));