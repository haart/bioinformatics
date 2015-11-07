/**
 * Created by Haart on 27/10/14.
 */

var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

var input = res[0];

var skew = function (input) {
	var start = [0];
	for (var i = 0; i < input.length; i++) {
		if (input[i] === 'C') {
			start.push(start[i] - 1);
			continue;
		}

		if (input[i] === 'G') {
			start.push(start[i] + 1);
			continue;
		}

		start.push(start[i])
	}

	return start;
};

var findMinimums = function (array) {
	var original = array.slice(0),
		indices = [],
		i = 0,
		currentIndex;

	array.sort(function (a, b) {
		return a - b;
	});

	while (array[i] === array[0]) {
		currentIndex = original.indexOf(array[i]);
		indices.push(currentIndex);
		original[currentIndex] = null;
		i++;
	}

	return indices;
};

console.log(findMinimums(skew('CATTCCAGTACTTCATGATGGCGTGAAGA')).join(' '));