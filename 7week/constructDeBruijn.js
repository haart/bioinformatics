var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	kmer = res.shift(),
	edges = res;

var pathGraph = function (edges) {
	var nodes = {},
		key;

	edges.forEach(function (edge) {
		var len = edge.length - 1;

		key = edge.substr(0, len);
		if (typeof nodes[key] === 'undefined') {
			nodes[key] = '';
		}

		if (nodes[key].length) {
			nodes[key] += ',';
		}

		nodes[key] += edge.substr(1, len);
	});

	return nodes;
};

var graph = pathGraph(edges);

for (var prop in graph) {
	if (graph.hasOwnProperty(prop)) {
		console.log(prop, '->', graph[prop]);
	}
}