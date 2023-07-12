/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
  const n = graph.length;
  const outdegree = new Array(n).fill(0);
  const neighbors = new Array(n).fill(null).map(() => []);
  const safeNodes = [];

  // Step 1: Build the inverse graph
  for (let i = 0; i < n; i++) {
    for (const neighbor of graph[i]) {
      outdegree[i]++;
      neighbors[neighbor].push(i);
    }
  }

  // Step 2: Perform topological sorting
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (outdegree[i] === 0) {
      queue.push(i);
    }
  }

  while (queue.length > 0) {
    const node = queue.shift();
    safeNodes.push(node);

    for (const neighbor of neighbors[node]) {
      outdegree[neighbor]--;
      if (outdegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return safeNodes.sort((a, b) => a - b);
};