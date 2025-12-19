// mergeNode.js - Merge multiple inputs node

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleStrategyChange = useCallback((e) => {
    updateNodeField(id, 'strategy', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node merge-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input1`}
        className="handle-merge"
        style={{ top: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input2`}
        className="handle-merge"
        style={{ top: '50%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input3`}
        className="handle-merge"
        style={{ top: '70%' }}
      />
      <div className="node-header">
        <div className="node-icon">🔗</div>
        <span className="node-title">Merge</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Strategy</label>
          <select
            className="node-select"
            value={data?.strategy || 'concat'}
            onChange={handleStrategyChange}
          >
            <option value="concat">Concatenate</option>
            <option value="array">Create Array</option>
            <option value="object">Merge Objects</option>
            <option value="first_non_empty">First Non-Empty</option>
            <option value="join_newline">Join with Newline</option>
            <option value="join_comma">Join with Comma</option>
          </select>
        </div>
        <div className="llm-info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
          <span>Combines up to 3 inputs</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="handle-merge"
      />
      <div className="handle-wrapper">
        <span className="handle-label handle-label-left" style={{ top: '30%' }}>in 1</span>
        <span className="handle-label handle-label-left" style={{ top: '50%' }}>in 2</span>
        <span className="handle-label handle-label-left" style={{ top: '70%' }}>in 3</span>
        <span className="handle-label handle-label-right" style={{ top: '50%' }}>output</span>
      </div>
    </div>
  );
};
