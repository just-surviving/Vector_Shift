// inputNode.js - Input node for pipeline data entry

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = useCallback((e) => {
    updateNodeField(id, 'inputName', e.target.value);
  }, [id, updateNodeField]);

  const handleTypeChange = useCallback((e) => {
    updateNodeField(id, 'inputType', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node input-node">
      <div className="node-header">
        <div className="node-icon">📥</div>
        <span className="node-title">Input</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Name</label>
          <input
            type="text"
            className="node-input"
            value={data?.inputName || ''}
            onChange={handleNameChange}
            placeholder="Enter input name"
          />
        </div>
        <div className="node-field">
          <label className="node-label">Type</label>
          <select
            className="node-select"
            value={data?.inputType || 'Text'}
            onChange={handleTypeChange}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
            <option value="Number">Number</option>
            <option value="JSON">JSON</option>
          </select>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="handle-input"
      />
    </div>
  );
};
