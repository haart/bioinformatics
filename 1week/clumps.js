/**
 * Created by Haart on 21/10/14.
 */

var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

/*

CGGACTCGACAGATGTGAAGAACGACAATGTGAAGACTCGACACGACAGAGTGAAGAGAAGAGGAAACATTGTAA
 5 50 4

 */

var strand = res[0];
var factors = res[1].split(' '),
	k = factors[0],
	L = factors[1],
	t = factors[2];

var symbolToNumber = function (symbol) {
	var symbols = {A: 0, C: 1, G: 2, T: 3};

	return symbols[symbol];
};

var numberToSymbol = function (number) {
	var symbols = ['A', 'C', 'G', 'T'];

	return symbols[number];
};

var patternToNumber = function patternToNumber (pattern) {
	if (pattern.length === 0) {
		return 0;
	}

	var lastCharacter = pattern[pattern.length-1];
	var remainingString = pattern.substring(0, pattern.length - 1);

	return 4 * patternToNumber(remainingString) + symbolToNumber(lastCharacter)
};

var numberToPattern = function numberToPattern (number, length) {
	if (length === 1) {
		return numberToSymbol(number)
	}

	var prefixIndex = Math.floor(number / 4),
		remainder = number % 4,
		prefixPattern = numberToPattern(prefixIndex, length - 1),
		symbol = numberToSymbol(remainder);

	return prefixPattern + symbol
};

var computingFrequencies = function (text, k) {
	var frequencyArray = [],
		powerOfK = Math.pow(4, k),
		textLength = text.length - k,
		pattern,
		patternAsNumber;

	for (var i = 0; i < powerOfK; i++) {
		frequencyArray.push(0)
	}

	for (i = 0; i <= textLength; i++) {
		pattern = text.substring(i, i + k);
		patternAsNumber = patternToNumber(pattern);
		frequencyArray[patternAsNumber] += 1;
	}

	return frequencyArray
};

var fasterFrequentWords = function (text, k, t) {
	t = parseInt(t, 10);
	k = parseInt(k, 10);

	var frequentPatterns = {},
		frequencyArray = computingFrequencies(text, k),
		powerOfK = Math.pow(4, k),
		pattern;

	for (var i = 0; i < powerOfK; i++) {
		if (frequencyArray[i] === t) {
			pattern = numberToPattern(i, k);
			frequentPatterns[pattern] = 1;
		}
	}

	return Object.keys(frequentPatterns);
};

var frequentWordsBySorting = function (text, k, t) {
	t = parseInt(t, 10);
	k = parseInt(k, 10);

	var frequentPatterns = {},
		i,
		textLength = text.length - k,
		pattern,
		index = [],
		count = [];

	for (i = 0; i <= textLength; i++) {
		pattern = text.substring(i, i + k);
		index[i] = patternToNumber(pattern);
		count[i] = 1;
	}

	index.sort(function(a, b) {
		return a - b;
	});

	for (i = 1; i <= textLength; i++) {
		if (index[i] === index[i-1]) {
			count[i] = count[i-1] + 1;
		}
	}

	for (i = 0; i <= textLength; i++) {
		if (count[i] === t) {
			frequentPatterns[numberToPattern(index[i], k)] = 1;
		}
	}

	return Object.keys(frequentPatterns);
};

var findClumpsNaive = function (strand, k, t, L) {
	var currentPosition = 0;
	var clump = '';
	var kmers = {};

	while (currentPosition < strand.length) {
		clump = strand.substring(currentPosition, currentPosition + L);
		// var words = fasterFrequentWords(clump, k, t);
		var words = frequentWordsBySorting(clump, k, t);

		words.forEach(function (element) {
			kmers[element] = 1;
		});
		currentPosition += 1;
	}

	return Object.keys(kmers);
};

var clumpFinding = function (genome, k, t, L) {
	t = parseInt(t, 10);
	k = parseInt(k, 10);
	L = parseInt(L, 10);

	var frequentPatterns = {},
		powerOfK = Math.pow(4, k),
		clump = [],
		i, j,
		genomeLength = genome.length - L,
		text,
		frequencyArray,
		firstPattern,
		lastPattern;

	for (i = 0; i < powerOfK; i++) {
		clump[i] = 0;
	}

	text = genome.substring(0, L);
	frequencyArray = computingFrequencies(text, k);

	for (i = 1; i < genomeLength; i++) {
		firstPattern = genome.substring(i - 1, i - 1 + k);
		j = patternToNumber(firstPattern, k);
		frequencyArray[j] -= 1;
		lastPattern = genome.substring(i + L - k, i + L);
		j = patternToNumber(lastPattern, k);
		frequencyArray[j] += 1;

		if (frequencyArray[j] >= t) {
			clump[j] = 1
		}
	}

	for (i = 0; i < powerOfK; i++) {
		if (clump[i] === 1) {
			frequentPatterns[numberToPattern(i, k)] = 1;
		}
	}

	return Object.keys(frequentPatterns);
};

console.log(clumpFinding('CCGACAGGCTAGTCTATAATCCTGAGGCGTTACCCCAATACCGTTTACCGTGGGATTTGCTACTACAACTCCTGAGCGCTACATGTACGAAACCATGTTATGTAT', 4, 3, 30).join(' '));