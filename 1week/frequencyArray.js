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

console.log(fasterFrequentWords('TACAGTCGCCAATCTCTCCTGGGGAGTCGACGGCGGGGTGGTTCCAACTGCCAAATAACGTACCGTTGTCCTCTCGTTGGCATTTATAGATATCGCCGGGCTCTATCGCTCAAGTTTGGGTTTCAAACGTATGTCCGCGGGTGTCCTCTAGCATCTTGGTTATCTATGGACGGTACACCGTTCTTTTTGACCATGCCTCGCACGGTACACCTCAAAGCGTATCCCCCGGCGGAAGGGCTGCGCAAGTAACCCCTACGAAACTCACGCCGGGCGCAAAACGCCAATGATGCTTAGGTGTTATTGCAGCCATTCCCGCGAACCCAGGTTAGCTTATCTGAGATCAAAATTGAGGTCAACCTATACCACTCACATCTTTGCCGGGCACGAATGGACGTTGCGAATGAGATATAGTTGCTTTACTGACTCCACCCGCCCCCGTGGCAACTGACGTGATGACATGGTGCCCGACGATCACTAGGTGAGCGGTCCACACGAGTAGTAACACCTCCCTGTATTAATCACGGGTCTGCCTGTTGAGTCCAGCCATAGCAACTTATTTGATCACGGGTTATCATCCACAGGTAACACTGTGCCAATATCACGAACTAACCCGAATCAAGGCCGCCGACAGTGATCTGTCCCTAATGCGTCCCAGTCAGAATTCTGATAAACTTGTTATCGGACTGAATCGAACGCTATCCACTGCGCTCGGTACGCAATAGAATGTACTG', 5, 4).join(' '));