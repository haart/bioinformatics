// A C G T

var alphabet = ['A', 'C', 'G', 'T'],
	res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	kt = res.shift().split(' '),
	k = Number(kt[0]),
	t = Number(kt[1]),
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

var mostProbablePattern = function (dna, k, matrix) {
	var i = 0,
		probability = 0,
		pattern,
		patternProbability,
		result = dna.substr(0, k);

	var calculateProbability = function (pattern) {
		var probability = 1,
			i = 0;

		for (; i < pattern.length; i++) {
			probability *= matrix[i][pattern[i]];
		}

		return probability;
	};

	for (; i <= dna.length - k; i++) {
		pattern = dna.substr(i, k);
		patternProbability = calculateProbability(pattern);

		if (probability < patternProbability) {
			probability = patternProbability;
			result = pattern;
		}
	}

	return result;
};

var greedyMotifSearch = function (dna, k, t) {
	var fDna = dna[0],
		bestMotifs = [],
		motifs = [],
		i, j,
		matrix;

	var score = function (motifs) {
		var consensus = '',
			root = motifs[0].split(''),
			result = 0;

		root.forEach(function (el, index) {
			var column = [0, 0, 0, 0];

			motifs.forEach(function (motif) {
				column[alphabet.indexOf(motif[index])] += 1;
			});

			consensus += alphabet[column.indexOf(Math.max.apply(null, column))];
		});

		motifs.forEach(function(motif) {
			result += hamming(motif, consensus);
		});

		return result;
	};

	var produceProfileMatrix = function (motifs) {
		var root = motifs[0].split(''),
			result = [];

		root.forEach(function (el, index) {
			var column = {'A': 1, 'G': 1, 'C': 1, 'T': 1},
				sum = 4;

			motifs.forEach(function (motif) {
				column[motif[index]] += 1;
				sum += 1;
			});

			for (el in column) {
				if (column.hasOwnProperty(el)) {
					column[el] = column[el] / sum;
				}
			}

			result.push(column);
		});

		return result;
	};

	dna.forEach(function (text) {
		bestMotifs.push(text.substr(0, k));
	});

	for (i = 0; i <= fDna.length - k; i++) {
		motifs.splice(0);
		motifs.push(fDna.substr(i, k));

		for (j = 1; j < t; j++) {
			matrix = produceProfileMatrix(motifs);
			motifs.push(mostProbablePattern(dna[j], k, matrix));
		}

		if (score(motifs) < score(bestMotifs)) {
			bestMotifs = motifs.slice(0);
		}
	}

	return bestMotifs.join('\n');
};

console.log(greedyMotifSearch(dna, k, t));