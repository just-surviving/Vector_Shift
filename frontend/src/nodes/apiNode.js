// apiNode.js - HTTP API request node

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleMethodChange = useCallback((e) => {
    updateNodeField(id, 'method', e.target.value);
  }, [id, updateNodeField]);

  const handleUrlChange = useCallback((e) => {
    updateNodeField(id, 'url', e.target.value);
  }, [id, updateNodeField]);

  const getMethodClass = (method) => {
    return `method-badge method-${method.toLowerCase()}`;
  };

  return (
    <div className="pipeline-node api-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-body`}
        className="handle-api"
        style={{ top: '35%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-headers`}
        className="handle-api"
        style={{ top: '65%' }}
      />
      <div className="node-header">
        <div className="node-icon">🌐</div>
        <span className="node-title">API Request</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Method</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              className="node-select"
              value={data?.method || 'GET'}
              onChange={handleMethodChange}
              style={{ flex: 1 }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <span className={getMethodClass(data?.method || 'GET')}>
              {data?.method || 'GET'}
            </span>
          </div>
        </div>
        <div className="node-field">
          <label className="node-label">URL</label>
          <input
            type="text"
            className="node-input"
            value={data?.url || ''}
            onChange={handleUrlChange}
            placeholder="https://api.example.com/endpoint"
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="handle-api"
        style={{ top: '35%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-error`}
        className="handle-api"
        style={{ top: '65%' }}
      />
      <div className="handle-wrapper">
        <span className="handle-label handle-label-left" style={{ top: '35%' }}>body</span>
        <span className="handle-label handle-label-left" style={{ top: '65%' }}>headers</span>
        <span className="handle-label handle-label-right" style={{ top: '35%' }}>response</span>
        <span className="handle-label handle-label-right" style={{ top: '65%' }}>error</span>
      </div>
    </div>
  );
};
