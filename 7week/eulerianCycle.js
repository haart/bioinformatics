var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n');

var parseGraph = function (text) {
	var graph = {};

	text.forEach(function (edge) {
		var nodes = edge.split(' -> ');
		graph[nodes[0]] = nodes[1].split(',');
	});

	return graph;
};

var eulerianCycle = function (graph) {
	var vertexes = Object.keys(graph),
		stack = [],
		path = [];

	stack.unshift(vertexes[4]);

	while (stack.length) {
		if (graph[stack[0]].length) {
			stack.unshift(graph[stack[0]].shift());
		} else {
			path.push(stack.shift());
		}
	}

	return path;
};

console.log(eulerianCycle(parseGraph(res)).reverse().join('->'));
