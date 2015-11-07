var res = require('fs').readFileSync('res', {encoding: 'utf-8'}).split('\n'),
	nodes = res;

var findAdjacentNodes = function (nodes) {
	var pairs = [],
		suffixPosition = nodes[0].length - 1,
		prefixPosition = nodes[0].length - 2;

	nodes.forEach(function (outerNode, outerIndex) {
		var suffix = outerNode.substring(1, suffixPosition);

		nodes.forEach(function (innerNode, innerIndex) {
			var prefix = innerNode.substring(0, prefixPosition);

			if (suffix === prefix) {
				pairs.push([outerIndex, innerIndex])
			}
		})
	});

	return pairs;
};

var printAdjacencyList = function (nodes, pairs) {
	pairs.forEach(function (pair) {
		console.log(nodes[pair[0]], '->', nodes[pair[1]])
	});
};

console.time('overlap');
printAdjacencyList(nodes, findAdjacentNodes(nodes));
console.timeEnd('overlap');