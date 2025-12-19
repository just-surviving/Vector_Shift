// transformNode.js - Data transformation node

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleOperationChange = useCallback((e) => {
    updateNodeField(id, 'operation', e.target.value);
  }, [id, updateNodeField]);

  const handleCustomCodeChange = useCallback((e) => {
    updateNodeField(id, 'customCode', e.target.value);
  }, [id, updateNodeField]);

  const showCustomCode = data?.operation === 'custom';

  return (
    <div className="pipeline-node transform-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        className="handle-transform"
      />
      <div className="node-header">
        <div className="node-icon">⚡</div>
        <span className="node-title">Transform</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Operation</label>
          <select
            className="node-select"
            value={data?.operation || 'uppercase'}
            onChange={handleOperationChange}
          >
            <optgroup label="Text">
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
              <option value="trim">Trim Whitespace</option>
              <option value="reverse">Reverse</option>
            </optgroup>
            <optgroup label="Data">
              <option value="parse_json">Parse JSON</option>
              <option value="stringify_json">Stringify JSON</option>
              <option value="extract_keys">Extract Keys</option>
              <option value="extract_values">Extract Values</option>
            </optgroup>
            <optgroup label="Advanced">
              <option value="split">Split by Delimiter</option>
              <option value="join">Join Array</option>
              <option value="custom">Custom Expression</option>
            </optgroup>
          </select>
        </div>
        {showCustomCode && (
          <div className="node-field">
            <label className="node-label">Expression</label>
            <textarea
              className="node-textarea"
              value={data?.customCode || ''}
              onChange={handleCustomCodeChange}
              placeholder="data.map(x => x.value)"
              rows={2}
            />
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="handle-transform"
      />
      <div className="handle-wrapper">
        <span className="handle-label handle-label-left" style={{ top: '50%' }}>input</span>
        <span className="handle-label handle-label-right" style={{ top: '50%' }}>output</span>
      </div>
    </div>
  );
};
