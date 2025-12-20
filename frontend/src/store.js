// store.js - Enhanced Zustand state management with undo/redo

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

const MAX_HISTORY = 50;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  history: [],
  historyIndex: -1,
  clipboard: null,

  // Save state to history
  saveToHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    
    // Limit history size
    if (newHistory.length > MAX_HISTORY) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },

  // Undo
  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: [...prevState.nodes],
        edges: [...prevState.edges],
        historyIndex: historyIndex - 1
      });
    }
  },

  // Redo
  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: [...nextState.nodes],
        edges: [...nextState.edges],
        historyIndex: historyIndex + 1
      });
    }
  },

  // Generate unique node ID
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  // Add a new node
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
    get().saveToHistory();
  },

  // Handle node changes (position, selection, etc.)
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
    
    // Only save to history for certain change types
    const shouldSaveHistory = changes.some(change => 
      change.type === 'remove' || change.type === 'add'
    );
    
    if (shouldSaveHistory) {
      get().saveToHistory();
    }
  },

  // Handle edge changes
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
    
    const shouldSaveHistory = changes.some(change => 
      change.type === 'remove' || change.type === 'add'
    );
    
    if (shouldSaveHistory) {
      get().saveToHistory();
    }
  },

  // Handle new connections with validation
  onConnect: (connection) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
      return;
    }
    
    // Add connection
    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          height: 20,
          width: 20,
          color: '#6366f1'
        },
        style: {
          stroke: '#6366f1',
          strokeWidth: 2
        }
      }, get().edges),
    });
    
    get().saveToHistory();
  },

  // Update a specific field in a node's data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue }
          };
        }
        return node;
      }),
    });
  },

  // Delete selected nodes
  deleteSelectedNodes: () => {
    const { nodes, edges } = get();
    const selectedNodeIds = nodes.filter(n => n.selected).map(n => n.id);
    
    if (selectedNodeIds.length === 0) return;
    
    // Remove selected nodes and their connected edges
    set({
      nodes: nodes.filter(n => !n.selected),
      edges: edges.filter(e => 
        !selectedNodeIds.includes(e.source) && 
        !selectedNodeIds.includes(e.target)
      )
    });
    
    get().saveToHistory();
  },

  // Copy selected nodes
  copySelectedNodes: () => {
    const { nodes } = get();
    const selectedNodes = nodes.filter(n => n.selected);
    
    if (selectedNodes.length > 0) {
      set({ clipboard: selectedNodes });
    }
  },

  // Paste nodes from clipboard
  pasteNodes: () => {
    const { clipboard, nodes, getNodeID } = get();
    
    if (!clipboard || clipboard.length === 0) return;
    
    const newNodes = clipboard.map(node => {
      const newId = getNodeID(node.type);
      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 50,
          y: node.position.y + 50
        },
        selected: false,
        data: {
          ...node.data,
          id: newId
        }
      };
    });
    
    set({
      nodes: [...nodes, ...newNodes]
    });
    
    get().saveToHistory();
  },

  // Export pipeline as JSON
  exportPipeline: () => {
    const { nodes, edges } = get();
    return JSON.stringify({ nodes, edges }, null, 2);
  },

  // Import pipeline from JSON
  importPipeline: (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.nodes && data.edges) {
        set({
          nodes: data.nodes,
          edges: data.edges
        });
        get().saveToHistory();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import pipeline:', error);
      return false;
    }
  },

  // Clear all nodes and edges
  clearPipeline: () => {
    set({
      nodes: [],
      edges: [],
      nodeIDs: {}
    });
    get().saveToHistory();
  },

  // Get pipeline data for submission
  getPipelineData: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  }
}));
