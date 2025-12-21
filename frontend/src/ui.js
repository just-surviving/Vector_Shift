// ui.js - Main pipeline canvas with React Flow

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Import all node types
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { APINode } from './nodes/apiNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { NoteNode } from './nodes/noteNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

// Register all node types
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  api: APINode,
  transform: TransformNode,
  merge: MergeNode,
  note: NoteNode,
};

// Initialize node data based on type
const getInitNodeData = (nodeID, type) => {
  const baseData = { id: nodeID, nodeType: type };
  
  switch (type) {
    case 'customInput':
      return { ...baseData, inputName: nodeID.replace('customInput-', 'input_'), inputType: 'Text' };
    case 'customOutput':
      return { ...baseData, outputName: nodeID.replace('customOutput-', 'output_'), outputType: 'Text' };
    case 'llm':
      return { ...baseData, model: 'gpt-4' };
    case 'text':
      return { ...baseData, text: '{{input}}' };
    case 'filter':
      return { ...baseData, condition: 'equals', value: '' };
    case 'api':
      return { ...baseData, method: 'GET', url: '', headers: '{}' };
    case 'transform':
      return { ...baseData, operation: 'uppercase', customCode: '' };
    case 'merge':
      return { ...baseData, strategy: 'concat' };
    case 'note':
      return { ...baseData, content: 'Add your notes here...' };
    default:
      return baseData;
  }
};

// MiniMap node color function
const getNodeColor = (node) => {
  switch (node.type) {
    case 'customInput': return '#10b981';
    case 'customOutput': return '#ef4444';
    case 'llm': return '#6366f1';
    case 'text': return '#f59e0b';
    case 'filter': return '#ec4899';
    case 'api': return '#0ea5e9';
    case 'transform': return '#a855f7';
    case 'merge': return '#14b8a6';
    case 'note': return '#94a3b8';
    default: return '#6366f1';
  }
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Use individual selectors to avoid infinite loop
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Connection validation
  const isValidConnection = useCallback((connection) => {
    // Prevent self-connections
    if (connection.source === connection.target) {
      return false;
    }

    // Check if connection already exists
    const existingConnection = edges.find(
      edge => 
        edge.source === connection.source && 
        edge.target === connection.target &&
        edge.sourceHandle === connection.sourceHandle &&
        edge.targetHandle === connection.targetHandle
    );

    return !existingConnection;
  }, [edges]);

  return (
    <div ref={reactFlowWrapper} className="pipeline-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        snapToGrid
        connectionLineType="smoothstep"
        connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
        isValidConnection={isValidConnection}
        deleteKeyCode="Delete"
        multiSelectionKeyCode="Shift"
        fitView
      >
        <Background color="#334155" gap={gridSize} size={1} />
        <Controls />
        <MiniMap 
          nodeColor={getNodeColor}
          maskColor="rgba(15, 23, 42, 0.8)"
        />
      </ReactFlow>
    </div>
  );
};
