// Sample data representing nodes and links
const nodes = [
  { id: 0, name: "A" },
  { id: 1, name: "B" },
  { id: 2, name: "C" },
  { id: 3, name: "D" },
  { id: 4, name: "E" },
  { id: 5, name: "F" },
  { id: 6, name: "G" },
  { id: 7, name: "H" },
];

const links = [
  { source: 0, target: 1 },
  { source: 0, target: 3 },
  { source: 1, target: 2 },
  { source: 1, target: 7 },
  { source: 2, target: 3 },
  { source: 2, target: 6 },
  { source: 3, target: 4 },
  { source: 4, target: 5 },
  { source: 5, target: 6 },
  { source: 6, target: 7 },
];

// Set initial positions for nodes
nodes[0].x = 70;
nodes[0].y = 270;
nodes[1].x = 170;
nodes[1].y = 70;
nodes[2].x = 270;
nodes[2].y = 270;
nodes[3].x = 70;
nodes[3].y = 470;
nodes[4].x = 270;
nodes[4].y = 470;
nodes[5].x = 470;
nodes[5].y = 470;
nodes[6].x = 470;
nodes[6].y = 270;
nodes[7].x = 470;
nodes[7].y = 70;

nodes.forEach((node) => {
  graph.addNode(node);
});

links.forEach((link) => {
  graph.addEdge(nodes[link.source], nodes[link.target]);
});

// Create the SVG container
const svg = d3.select("svg");

// Draw links as curves
const link = svg
  .selectAll("path")
  .data(links)
  .enter()
  .append("path")
  .attr("d", (d) => {
    const sourceNode = nodes[d.source];
    const targetNode = nodes[d.target];
    return `M${sourceNode.x},${sourceNode.y}C${
      (sourceNode.x + targetNode.x) / 2
    },${(sourceNode.y + targetNode.y) / 2} ${
      (sourceNode.x + targetNode.x) / 2
    },${(sourceNode.y + targetNode.y) / 2} ${targetNode.x},${targetNode.y}`;
  })
  .attr("class", "link")
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 7);

const node = svg
  .selectAll("g")
  .data(nodes)
  .enter()
  .append("g")
  .attr("transform", (d) => `translate(${d.x},${d.y})`);

node.append("circle").attr("r", 35).attr("fill", "rgb(0, 148, 185)");

node
  .append("text")
  .text((d) => d.name)
  .attr("dy", 5)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial")
  .attr("font-size", "25px");

// Keep track of highlighted paths

const keepHighlight = [];

const highlightedPaths = [];

// Function to highlight a specific path and remove highlight with transition
function highlightPath(pathIndex) {
  highlightedPaths.push(pathIndex);
  keepHighlight.push(pathIndex);
  link.classed("highlighted", (d, i) => highlightedPaths.includes(i));
  link.classed("keepHL", (d, i) => keepHighlight.includes(i));

  setTimeout(() => {
    highlightedPaths.splice(0, 1);
    link.classed("highlighted", false);
  }, 1000);
}

const bfsGenerator = graph.bfs(nodes[0], nodes[5]);

function findPathIndex(node1, node2) {
  console.log(nodes[node1].name, nodes[node2].name);
  for (let i = 0; i < links.length; i++) {
    if (
      (links[i].source == node1 || links[i].source == node2) &&
      (links[i].target == node1 || links[i].target == node2)
    ) {
      return i;
    }
  }
  return -1;
}

let lastNode = nodes[0];
function performBFS() {
  const result = bfsGenerator.next();

  if (!result.done) {
    const pathLen = result.value.path.length;
    if (pathLen > 0) {
      const pathIndex = findPathIndex(
        result.value.currentNode.id,
        result.value.path[pathLen - 1].id
      );
      if (pathIndex != -1) {
        highlightPath(pathIndex);
      }
    }

    // console.log(`Visit Node: ${result.value.currentNode}`);
    // console.log(`Current Path: ${result.value.path}`);
    setTimeout(performBFS, 1000); // Delay for better visualization
  } else {
    console.log("BFS Completed");
  }
}

performBFS();
