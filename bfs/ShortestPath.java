import java.util.*;

public class ShortestPath{
	public static void main(String[] args) {
		
	}
}

class ShortestPathFinder {
	
	public ShortestPathFinder(Graph g) {
		
	}
}

class Graph{
	private Node[] nodes;
	
	public Graph(int nodeCount) {
		this.nodes = new Node[nodeCount];
	}
	public void addConnection(int a,int b, int distance){
		
	}
}

class Node{
	private static int nodeIndex = 0;
	private int index;
	public Node() {
		this.index = nodeIndex++;
	}
}