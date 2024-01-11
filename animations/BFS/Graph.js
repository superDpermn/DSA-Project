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

  *bfs(start, end) {
    const visited = new Set();
    const queue = [[start, []]];

    while (queue.length > 0) {
      const [currentNode, path] = queue.shift();

      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        yield { currentNode, path };

        if (currentNode === end) {
          return; // Stop the search when the end node is found
        }

        for (const neighbor of this.adjacencyList.get(currentNode)) {
          if (!visited.has(neighbor)) {
            const newPath = [...path, currentNode];
            queue.push([neighbor, newPath]);
          }
        }
      }
    }
  }
}

const graph = new Graph();
