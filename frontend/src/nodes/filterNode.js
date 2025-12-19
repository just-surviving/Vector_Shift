// filterNode.js - Conditional filter/branching node

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleConditionChange = useCallback((e) => {
    updateNodeField(id, 'condition', e.target.value);
  }, [id, updateNodeField]);

  const handleValueChange = useCallback((e) => {
    updateNodeField(id, 'value', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node filter-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        className="handle-filter"
      />
      <div className="node-header">
        <div className="node-icon">🔀</div>
        <span className="node-title">Filter</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Condition</label>
          <select
            className="node-select"
            value={data?.condition || 'equals'}
            onChange={handleConditionChange}
          >
            <option value="equals">Equals</option>
            <option value="not_equals">Not Equals</option>
            <option value="contains">Contains</option>
            <option value="not_contains">Not Contains</option>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
            <option value="is_empty">Is Empty</option>
            <option value="is_not_empty">Is Not Empty</option>
          </select>
        </div>
        <div className="node-field">
          <label className="node-label">Value</label>
          <input
            type="text"
            className="node-input"
            value={data?.value || ''}
            onChange={handleValueChange}
            placeholder="Comparison value"
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-true`}
        className="handle-filter"
        style={{ top: '35%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-false`}
        className="handle-filter"
        style={{ top: '65%' }}
      />
      <div className="handle-wrapper">
        <span className="handle-label handle-label-left" style={{ top: '50%' }}>input</span>
        <span className="handle-label handle-label-right" style={{ top: '35%' }}>true</span>
        <span className="handle-label handle-label-right" style={{ top: '65%' }}>false</span>
      </div>
    </div>
  );
};
