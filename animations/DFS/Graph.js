class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addNode(node) {
    this.adjacencyList.set(node, []);
  }

  addEdge(source, destination) {
    this.adjacencyList.get(source).push(destination);
    this.adjacencyList.get(destination).push(source);
  }

  dfs(start) {
    const visited = new Set();
    const steps = [];

    function dfsRecursive(currentNode, path) {
      visited.add(currentNode);
      path.push(currentNode);
      steps.push([...path]);

      for (const neighbor of this.adjacencyList.get(currentNode)) {
        if (!visited.has(neighbor)) {
          dfsRecursive.call(this, neighbor, path);
        }
      }

      path.pop(); // Backtrack
    }

    dfsRecursive.call(this, start, []);

    return steps;
  }
}

const graph = new Graph();
