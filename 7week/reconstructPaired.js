var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	kd = res.shift().split(' '),
	k = Number(kd[0]),
	d = Number(kd[1]),
	text = res;


var parseGraph = function (text) {
	var graph = {};

	text.forEach(function (edge) {
		var nodes = edge.split('|');
		var node = nodes[0].substr(0, k - 1) + '|' + nodes[1].substr(0, k - 1);

		graph[node] = nodes[0].substr(1, k - 1) + '|' + nodes[1].substr(1, k - 1);
	});

	return graph;
};

console.log(parseGraph(text));

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