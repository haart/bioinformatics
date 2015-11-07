var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	input = res[0].split(' ').map(Number),
	aminoAcids = [57, 71, 87, 97, 99, 101, 103, 113, 114, 115, 128, 129, 131, 137, 147, 156, 163, 186];

var cyclospectrum = function (sample, cyclic) {
	var prefixMass = [0],
		cyclicSpectrum = [0],
		peptideMass,
		massDifference = 0;

	cyclic = cyclic || 1;

	var i, j;

	for (i = 0; i < sample.length; i++) {
		if (~aminoAcids.indexOf(sample[i])) {
			prefixMass.push(sample[i] + prefixMass[i]);
		}
	}

	peptideMass = prefixMass[sample.length];

	for (i = 0; i < sample.length; i++) {
		for (j = i + 1; j <= sample.length; j++) {
			massDifference = prefixMass[j] - prefixMass[i];

			cyclicSpectrum.push(massDifference);
			if (!!~cyclic && i > 0 && j < sample.length) {
				cyclicSpectrum.push(peptideMass - massDifference);
			}
		}
	}

	return cyclicSpectrum.sort(function (a, b) {
		return a - b;
	})
};

var consistencyCheck = function (theoretical, experimental) {
	var score = 0, index = 0,
		local = theoretical.slice(0);

	for (var i = 0; i < experimental.length; i++) {
		index = local.indexOf(experimental[i]);

		if (~index) {
			score++;
			local[index] = null;
		}
	}

	return score === experimental.length;
};

var expand = function (peptides) {
	var expanded = [], i, j, peptide;

	for (i = 0; i < aminoAcids.length; i++) {
		for (j = 0; j < peptides.length; j++) {
			peptide = peptides[j].slice(0);
			peptide.push(aminoAcids[i]);
			expanded.push(peptide);
		}
	}

	return expanded;
};

var cyclopeptideSequencing = function (sequence) {
	var peptides = [[]], candidates = [], removals = [], i, peptide,
		sum = function (prev, curr) {
			return prev + curr
		};

	while (peptides.length) {
		peptides = expand(peptides);
		removals.splice(0);

		for (i = 0; i < peptides.length; i++) {
			peptide = peptides[i];

			if (peptide.reduce(sum) === sequence[sequence.length - 1]) {
				if (cyclospectrum(peptide, 1).join(' ') === sequence.join(' '))
					candidates.push(peptide);
				removals.push(i);
			} else if (!consistencyCheck(sequence, cyclospectrum(peptide, -1)))
				removals.push(i);
		}

		peptides = peptides.filter(function (el, index) {
			return !~removals.indexOf(index);
		})
	}

	return candidates;
};

console.log(cyclopeptideSequencing(input).map(function (el) {
	return el.join('-')
}).join(' '));