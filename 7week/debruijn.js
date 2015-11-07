var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	k = Number(res.shift()),
	text = res.shift();

var pathGraph = function (k, text) {
	var len = text.length - k,
		i = 0,
		nodes = {},
		key;

	for (; i <= len; i++) {
		key = text.substr(i, k - 1);
		if (typeof nodes[key] === 'undefined') {
			nodes[key] = '';
		}

		if (nodes[key].length && (nodes[key].length % (k - 1) === 0)) {
			nodes[key] += ',';
		}

		nodes[key] += text.substr(i + 1, k - 1);
	}

	return nodes;
};

var graph = pathGraph(k, text);

for (var prop in graph) {
	if (graph.hasOwnProperty(prop)) {
		console.log(prop, '->', graph[prop]);
	}
}