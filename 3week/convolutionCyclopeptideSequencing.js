var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	convolution = Number(res[0]),
	leaders = Number(res[1]),
	input = res[2].split(' ').map(Number).sort(function (a, b) { return a -b });

var aminoAcids = (function (convolution, input) {
	var i, j, differences = {}, diff,
		local = input.slice(0).sort(function (a, b) { return b - a }),
		output;

	for (i = 0; i < local.length; i++) {
		for (j = i + 1; j < local.length; j++) {
			diff = local[i]-local[j];
			if (diff >= 57 && diff <= 200) {
				differences[diff] = differences[diff] + 1 || 1;
			}
		}
	}

	output = Object.keys(differences)
		.map(Number)
		.map(function (key) {
			return {aacid: key, score: differences[key]};
		})
		.sort(function (a, b) {
			return b.score - a.score;
		})
		.filter(function (element, i, array) {
			var index = convolution > array.length ? array.length - 1 : convolution - 1;
			return element.score >= array[index].score
		})
		.map(function (aacid) {
			return aacid.aacid
		})
		.sort(function (a, b) {
			return a - b;
		});

	return output;
})(convolution, input);

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

var score = function (peptide, spectrum, linear) {
	var score = 0, index = 0,
		local = spectrum.slice(0),
		experimental = cyclospectrum(peptide, linear);

	for (var i = 0; i < experimental.length; i++) {
		index = local.indexOf(experimental[i]);

		if (~index) {
			score++;
			local[index] = null;
		}
	}

	return score;
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

var trim = function (leaderboard, spectrum, leaders) {
	return leaderboard
		.map(function (leader) {
			return {element: leader, score: score(leader, spectrum, -1)}
		})
		.sort(function (a, b) {
			return b.score - a.score
		})
		.filter(function (leader, i, array) {
			var index = leaders > array.length ? array.length - 1 : leaders - 1;
			return leader.score >= array[index].score
		})
		.map(function (leader) {
			return leader.element
		})
};

var leaderboardCyclopeptideSequencing = function (spectrum, leaders) {
	var leaderboard = [[]], leader = [], removals = [], i, peptide,
		sum = function (prev, curr) {
			return prev + curr
		};

	while (leaderboard.length) {
		leaderboard = expand(leaderboard);
		removals.splice(0);

		for (i = 0; i < leaderboard.length; i++) {
			peptide = leaderboard[i];

			if (peptide.reduce(sum) === spectrum[spectrum.length - 1]) {
				if (score(peptide, spectrum, 1) > score(leader, spectrum, 1)) {
					leader = peptide;
				}
			} else if (peptide.reduce(sum) > spectrum[spectrum.length - 1]) {
				removals.push(i);
			}
		}

		leaderboard = leaderboard.filter(function (el, index) {
			return !~removals.indexOf(index);
		});

		leaderboard = trim(leaderboard, spectrum, leaders);
	}

	return leader;
};

console.log(leaderboardCyclopeptideSequencing(input, leaders).join('-'));