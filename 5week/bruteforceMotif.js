var suffix = function (pattern) {
	return pattern.substring(1, pattern.length);
};

var nucleotides = function () {
	return ['A', 'C', 'G', 'T']
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

var firstSymbol = function (pattern) {
	return pattern.substring(0, 1);
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

var truthy = function (value) {
	return value === true;
};

var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	kd = res.shift().split(' '),
	k = Number(kd[0]),
	d = Number(kd[1]);

var motifEnumeration = function (dna, k, d) {
	var patterns = {},
		i,
		pattern,
		neighborhood,
		secondNeigb,
		flag,
		foundInDna = [];

	for (i = 0; i < dna[0].length + 1 - k; i++) {
		pattern = dna[0].substr(i, k);
		neighborhood = neighbors(pattern, d);
		neighborhood.forEach(function (el) {
			secondNeigb = neighbors(el, d);
			foundInDna.splice(0);

			dna.forEach(function(sample) {
				flag = false;

				secondNeigb.forEach(function (sEl) {
					if (flag) {
						return;
					}

					flag = !!~sample.indexOf(sEl);
				});

				flag ? foundInDna.push(true) : foundInDna.push(false);
			});

			if (foundInDna.every(truthy)) {
				patterns[el] = 1;
			}
		});
	}

	return Object.keys(patterns).join(' ');
};

console.log(motifEnumeration(res, k, d));