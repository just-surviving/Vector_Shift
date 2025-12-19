// llmNode.js - LLM node for AI model integration

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleModelChange = useCallback((e) => {
    updateNodeField(id, 'model', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node llm-node">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="handle-llm"
        style={{ top: '33%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="handle-llm"
        style={{ top: '66%' }}
      />
      <div className="node-header">
        <div className="node-icon">🤖</div>
        <span className="node-title">LLM</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Model</label>
          <select
            className="node-select"
            value={data?.model || 'gpt-4'}
            onChange={handleModelChange}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="claude-3">Claude 3</option>
            <option value="gemini-pro">Gemini Pro</option>
          </select>
        </div>
        <div className="llm-info">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>System → Prompt → Response</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="handle-llm"
      />
      <div className="handle-wrapper">
        <span className="handle-label handle-label-left" style={{ top: '33%' }}>system</span>
        <span className="handle-label handle-label-left" style={{ top: '66%' }}>prompt</span>
        <span className="handle-label handle-label-right" style={{ top: '50%' }}>response</span>
      </div>
    </div>
  );
};
