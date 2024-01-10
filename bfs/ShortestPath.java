import java.util.*;

public class ShortestPath {
	public static void main(String[] args) {

	}

	public static boolean ArrayContains(Node[] arr, Node node) {
		for (Node n : arr) {
			if (node.equals(n)) {
				return true;
			}
		}
		return false;
	}
}

class ShortestPathFinder {
	public ShortestPathFinder() {

	}

	public LinkedList<Node> getShortestPath(Node a, Node b) {
		LinkedList<Node> retList = new LinkedList<Node>();
		retList.add(a);

		// more code here

		return retList;
	}

	private HashMap<Node, Integer> SearchNode(Node currentNode, ArrayList<Node> restrictedNodes) {
		HashMap<Node, Integer> neighborMap = new HashMap<Node, Integer>();
		HashMap<Node, Integer> allNeighbors = currentNode.getNeighbors();
		for (Node nb : allNeighbors.keySet()) {
			if (!restrictedNodes.contains(nb)) {
				neighborMap.put(nb, allNeighbors.get(nb));
			}
		}
		return neighborMap;
	}
}

class Node {
	private static int nodeIndex = 0;
	private int INDEX;
	private String NAME;
	private HashMap<Node, Integer> neighbors;

	public Node(String name) {
		this.INDEX = nodeIndex++;
		this.NAME = name;
	}

	public String getName() {
		return this.NAME;
	}

	public int getIndex() {
		return this.INDEX;
	}

	public boolean equals(Node n) {
		return n.getIndex() == this.INDEX;
	}

	public void addNeighbor(Node node, int distance) {
		neighbors.put(node, distance);
		node.addNeighbor2(this, distance);
	}

	private void addNeighbor2(Node node, int distance) {// to avoid recursion
		neighbors.put(node, distance);
	}

	public HashMap<Node, Integer> getNeighbors() {
		return neighbors;
	}
}