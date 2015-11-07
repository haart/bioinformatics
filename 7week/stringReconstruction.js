var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n');

res.shift();

var eulerianPath = function (graph, start) {
	var stack = [],
		path = [];

	stack.unshift(start);

	while (stack.length) {
		if (typeof graph[stack[0]] !== 'undefined' && graph[stack[0]].length) {
			stack.unshift(graph[stack[0]].shift());
		} else {
			path.push(stack.shift());
		}
	}

	return path;
};

var indegree = function (graph) {
	var indegrees = {},
		edge,
		result;

	for (edge in graph) {
		if (graph.hasOwnProperty(edge)) {
			indegrees[edge] = graph[edge].length;
		}
	}

	for (edge in graph) {
		if (graph.hasOwnProperty(edge)) {
			graph[edge].forEach(function (edge) {
				indegrees[edge] = indegrees[edge] || 0;
				indegrees[edge]--;
			})
		}
	}

	for (edge in indegrees) {
		if (indegrees.hasOwnProperty(edge)) {
			if (indegrees[edge] === 1) {
				result = edge;
			}
		}
	}

	return result;
};

var pathGraphDeBruijn = function (edges) {
	var nodes = {},
		key;

	edges.forEach(function (edge) {
		var len = edge.length - 1;

		key = edge.substr(0, len);
		if (typeof nodes[key] === 'undefined') {
			nodes[key] = [];
		}

		nodes[key].push(edge.substr(1, len));
	});

	return nodes;
};

var stringSpelledByPattern = function (nodes) {
	var computedDna = nodes.shift(),
		lastPosition = computedDna.length - 1;

	nodes.forEach(function (dna) {
		computedDna += dna[lastPosition];
	});

	return computedDna;
};

var constructBinaries = function (k) {
	var binary,
		powerOfK = Math.pow(2, k),
		i = 0, j = 0, temp,
		binaries = [];

	for (; i < powerOfK; i++) {
		binary = '';
		temp = i;
		for (j = 0; j < k; j++) {
			if (temp % 2 === 1) {
				binary = '1' + binary;
			} else {
				binary = '0' + binary;
			}
			temp = Math.ceil(temp / 2);
		}
		binaries.push(binary);
	}

	return binaries;
};

console.log(constructBinaries(3).join('\n'));

//console.log(stringSpelledByPattern(eulerianPath(pathGraphDeBruijn(res), indegree(pathGraphDeBruijn(res))).reverse()));