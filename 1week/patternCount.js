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
var pattern = res[1];

var patternCount = function (text, pattern) {
	var count = 0;

	for (var i = 0; i <= text.length - pattern.length; i++) {
		if (text.substr(i, pattern.length) === pattern) {
			count += 1;
		}
	}

	return count;
};

console.log(patternCount(strand, pattern));