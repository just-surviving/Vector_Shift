# main.py - FastAPI backend for pipeline parsing

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional, Union
from collections import defaultdict

app = FastAPI(title="Pipeline Parser API")

# Enable CORS for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://vectorshift-pipeline.netlify.app",
        "https://*.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm.
    Returns True if the graph is a DAG, False if it contains cycles.
    """
    if not nodes:
        return True
    
    # Build adjacency list and in-degree count
    node_ids = {node.get('id') for node in nodes if node.get('id')}
    adj_list = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degree for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        
        # Only consider edges between existing nodes
        if source in node_ids and target in node_ids:
            adj_list[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm for topological sort
    # Start with nodes that have no incoming edges
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        # Reduce in-degree for all neighbors
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, there's no cycle (it's a DAG)
    return visited_count == len(node_ids)


@app.get('/')
def read_root():
    return {'status': 'ok', 'message': 'Pipeline Parser API is running'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Dict[str, Any]):
    """
    Parse the pipeline and return analysis results.
    
    Returns:
        - num_nodes: Number of nodes in the pipeline
        - num_edges: Number of edges (connections) in the pipeline
        - is_dag: Whether the pipeline forms a valid DAG (no cycles)
    """
    nodes = pipeline.get('nodes', [])
    edges = pipeline.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)