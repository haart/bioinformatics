var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	nm = res.shift().split(' ').map(Number),
	n = nm[0],
	m = nm[1],
	down = (function (n) {
		var down = [];

		for (var i = 1; i <= n; i++) {
			down.push(res.shift().split(' ').map(Number));
		}

		return down;
	})(n),
	separator = res.shift(),
	right = (function (n) {
		var right = [];

		for (var i = 0; i <= n; i++) {
			right.push(res.shift().split(' ').map(Number));
		}

		return right;
	})(n);

var manhattanTourist = function (n, m, down, right) {
	var s = [],
		i, j;

	for (i = 0; i <= n; i++) {
		s[i] = [];
		for (j = 0; j <= m; j++) {
			s[i][j] = 0;
		}
	}

	for (i = 1; i <= n; i++) {
		s[i][0] = s[i - 1][0] + down[i - 1][0];
	}

	for (j = 1; j <= m; j++) {
		s[0][j] = s[0][j - 1] + right[0][j - 1];
	}

	for (i = 1; i <= n; i++) {
		for (j = 1; j <= m; j++) {
			s[i][j] = Math.max(s[i - 1][j] + down[i - 1][j], s[i][j - 1] + right[i][j - 1]);
		}
	}

	return s[n][m];
};

console.log(manhattanTourist(n, m, down, right));