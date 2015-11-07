/**
 * Created by Haart on 21/10/14.
 */

var res = require('fs').readFileSync(process.argv[2], {encoding: 'utf-8'}).split('\n');

/*

 Sample Input:
 GCGCG
 GCG
 Sample Output:
 2

 */

var strand = res[0];
var kmer = res[1];

var patternCount = function (text, pattern) {
	var count = 0;

	for (var i = 0; i <= text.length - pattern.length; i++) {
		if (text.substr(i, pattern.length) === pattern) {
			count += 1;
		}
	}

	return count;
};

// console.log(patternCount(strand, pattern));

var frequentWords = function (text, k) {
	var frequentPatterns = {},
		count = [],
		pattern;

	for (var i = 0; i <= text.length - k; i++) {
		pattern = text.substr(i, k);
		count.push(patternCount(text, pattern));
	}

	var maxValue = Math.max.apply(null, count);

	for (var j = 0; j <= text.length - k; j++) {
		if (count[j] === maxValue) {
			pattern = text.substr(j, k);
			frequentPatterns[pattern] = 1;
		}
	}

	return Object.keys(frequentPatterns).join(" ");
};

console.log(frequentWords(strand, kmer));