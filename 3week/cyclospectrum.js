var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	sample = res[0];

var cyclospectrum = function (sample) {
	var aminoAcids = {
		"G": 57,
		"A": 71,
		"S": 87,
		"P": 97,
		"V": 99,
		"T": 101,
		"C": 103,
		"I": 113,
		"L": 113,
		"N": 114,
		"D": 115,
		"K": 128,
		"Q": 128,
		"E": 129,
		"M": 131,
		"H": 137,
		"F": 147,
		"R": 156,
		"Y": 163,
		"W": 186
	};

	var prefixMass = [0],
		cyclicSpectrum = [0],
		peptideMass,
		massDifference = 0;

	var i, j;

	for (i = 0; i < sample.length; i++) {
		if (aminoAcids.hasOwnProperty(sample[i])) {
			prefixMass.push(aminoAcids[sample[i]] + prefixMass[i]);
		}
	}

	peptideMass = prefixMass[sample.length];

	for (i = 0; i < sample.length; i++) {
		for (j = i + 1; j <= sample.length; j++) {
			massDifference = prefixMass[j] - prefixMass[i];

			cyclicSpectrum.push(massDifference);
			if (i > 0 && j < sample.length) {
				cyclicSpectrum.push(peptideMass - massDifference);
			}
		}
	}

	return cyclicSpectrum.sort(function (a, b) {
		return a - b;
	})
};

console.log(cyclospectrum(sample).join(' '));