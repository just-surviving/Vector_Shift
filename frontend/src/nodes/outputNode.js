// outputNode.js - Output node for pipeline results

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = useCallback((e) => {
    updateNodeField(id, 'outputName', e.target.value);
  }, [id, updateNodeField]);

  const handleTypeChange = useCallback((e) => {
    updateNodeField(id, 'outputType', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node output-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
        className="handle-output"
      />
      <div className="node-header">
        <div className="node-icon">📤</div>
        <span className="node-title">Output</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Name</label>
          <input
            type="text"
            className="node-input"
            value={data?.outputName || ''}
            onChange={handleNameChange}
            placeholder="Enter output name"
          />
        </div>
        <div className="node-field">
          <label className="node-label">Type</label>
          <select
            className="node-select"
            value={data?.outputType || 'Text'}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
            <option value="File">File</option>
            <option value="JSON">JSON</option>
          </select>
        </div>
      </div>
    </div>
  );
};
