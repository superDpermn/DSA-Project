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
  { id: 8, name: "I" },
  { id: 9, name: "J" },
  { id: 10, name: "K" },
  { id: 11, name: "L" },
  { id: 12, name: "M" },
  { id: 13, name: "N" },
];

const nodeCount = nodes.length;

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
  { source: 6, target: 8 },
  { source: 8, target: 9 },
  { source: 8, target: 12 },
  { source: 9, target: 10 },
  { source: 4, target: 11 },
  { source: 11, target: 12 },
  { source: 12, target: 13 },
];

const linkCount = links.length;

// Set initial positions for nodes
nodes[0].x = 70;
nodes[0].y = 270;
nodes[1].x = 70;
nodes[1].y = 70;
nodes[2].x = 270;
nodes[2].y = 170;
nodes[3].x = 270;
nodes[3].y = 320;
nodes[4].x = 70;
nodes[4].y = 470;
nodes[5].x = 420;
nodes[5].y = 420;
nodes[6].x = 470;
nodes[6].y = 220;
nodes[7].x = 470;
nodes[7].y = 70;
nodes[8].x = 570;
nodes[8].y = 470;
nodes[9].x = 570;
nodes[9].y = 70;
nodes[10].x = 670;
nodes[10].y = 270;
nodes[11].x = 170;
nodes[11].y = 570;
nodes[12].x = 370;
nodes[12].y = 570;
nodes[13].x = 570;
nodes[13].y = 570;

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
  .attr("transform", (d) => `translate(${d.x},${d.y})`)
  .attr("class", "NODE");

node.append("circle").attr("r", 35).attr("class", "NodeCircle");

node
  .append("text")
  .text((d) => d.name)
  .attr("dy", 10)
  .attr("text-anchor", "middle")
  .attr("font-family", "Arial")
  .attr("font-size", "35px");

// Keep track of highlighted paths

const keepHighlight = [];
const finalizedPath = [];
const nodeHL = [];
const highlightedPaths = [];

// Function to highlight a specific path and remove highlight with transition
function highlightPath(pathIndex) {
  if (pathIndex < 0 || pathIndex >= linkCount) {
    return;
  }
  highlightedPaths.push(pathIndex);
  keepHighlight.push(pathIndex);
  if (!nodeHL.includes(links[pathIndex].source)) {
    nodeHL.push(links[pathIndex].source);
  }
  if (!nodeHL.includes(links[pathIndex].target)) {
    nodeHL.push(links[pathIndex].target);
  }
  node.classed("visited", (d, i) => nodeHL.includes(i));
  link.classed("highlighted", (d, i) => highlightedPaths.includes(i));
  link.classed("keepHL", (d, i) => keepHighlight.includes(i));

  setTimeout(() => {
    highlightedPaths.splice(0, 1);
    link.classed("highlighted", false);
  }, 400);
}

function highlightFinalPath(pathIndex) {
  if (pathIndex < 0 || pathIndex >= linkCount) {
    return;
  }
  finalizedPath.push(pathIndex);
  link.classed("FinalPath", (d, i) => finalizedPath.includes(i));
}

let firstNode = 0; //These are the starting node
let lastNode = 10; //and ending node, respectively

function findPathIndex(node1, node2) {
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

function onFinalResult(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    highlightFinalPath(findPathIndex(arr[i].id, arr[i + 1].id));
  }
}

function onResult(arr) {
  if (arr.length > 1) {
    highlightPath(
      findPathIndex(arr[arr.length - 1].id, arr[arr.length - 2].id)
    );
  }
}

function performDFS(arr, end) {
  let i = 0;
  let clearInt = setInterval(() => {
    onResult(arr[i]);
    if (i >= arr.length || arr[i].includes(end)) {
      clearInterval(clearInt);
      if (arr[i].includes(end)) {
        setTimeout(onFinalResult, 500, arr[i]);
      }
    }
    i++;
  }, 500);
}

function showCurrent(start, finish) {
  document.querySelector("p#current").innerText =
    nodes[start].name + " → " + nodes[finish].name;
}

function reset() {
  while (keepHighlight.length > 0) {
    keepHighlight.pop();
  }
  while (finalizedPath.length > 0) {
    finalizedPath.pop();
  }
  while (nodeHL.length > 0) {
    nodeHL.pop();
  }
  while (highlightedPaths.length > 0) {
    highlightedPaths.pop();
  }

  //updates the classes
  node.classed("visited", (d, i) => nodeHL.includes(i));
  link.classed("highlighted", (d, i) => highlightedPaths.includes(i));
  link.classed("keepHL", (d, i) => keepHighlight.includes(i));
}

function performRandom() {
  let a = Math.floor(Math.random() * nodeCount);
  let b = Math.floor(Math.random() * nodeCount);
  while (b == a) {
    b = Math.floor(Math.random() * nodeCount);
  }
  firstNode = a;
  lastNode = b;
  showCurrent(a, b);
  performDFS(graph.dfs(nodes[a]), nodes[b]);
}

performRandom();
