var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n');

var parseGraph = function (text) {
	var graph = {};

	text.forEach(function (edge) {
		var nodes = edge.split(' -> ');
		graph[nodes[0]] = nodes[1].split(',');
	});

	return graph;
};

var eulerianCycle = function (graph, start) {
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

console.log(eulerianCycle(parseGraph(res), indegree(parseGraph(res))).reverse().join('->'));