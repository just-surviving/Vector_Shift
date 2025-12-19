// textNode.js - Text node with dynamic variable handle generation

import { useCallback, useMemo, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

// Parse text to extract variables in {{variableName}} format
const parseVariables = (text) => {
  const regex = /\{\{(\w+)\}\}/g;
  const variables = new Set();
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    variables.add(match[1]);
  }
  
  return Array.from(variables);
};

// Auto-resize textarea hook
const useAutoResize = (value) => {
  const textareaRef = useRef(null);
  
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);
  
  return textareaRef;
};

export const TextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useAutoResize(data?.text);

  const handleTextChange = useCallback((e) => {
    updateNodeField(id, 'text', e.target.value);
  }, [id, updateNodeField]);

  // Extract variables from text
  const variables = useMemo(() => {
    return parseVariables(data?.text || '');
  }, [data?.text]);

  // Calculate handle positions dynamically
  const getHandlePosition = (index, total) => {
    if (total === 1) return 50;
    const spacing = 70 / (total + 1);
    return 15 + spacing * (index + 1);
  };

  return (
    <div className="pipeline-node text-node">
      {/* Dynamic input handles for variables */}
      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="handle-text"
          style={{ top: `${getHandlePosition(index, variables.length)}%` }}
        />
      ))}
      
      <div className="node-header">
        <div className="node-icon">📝</div>
        <span className="node-title">Text</span>
        <span className="node-id">{id}</span>
      </div>
      
      <div className="node-content">
        <div className="node-field">
          <label className="node-label">Template</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={data?.text || ''}
            onChange={handleTextChange}
            placeholder="Enter text with {{variables}}"
            rows={2}
            style={{ minHeight: '50px', maxHeight: '150px' }}
          />
        </div>
        
        {/* Display detected variables */}
        {variables.length > 0 && (
          <div className="variable-tags">
            {variables.map((variable) => (
              <span key={variable} className="variable-tag">
                {`{{${variable}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="handle-text"
      />
      
      {/* Handle labels */}
      <div className="handle-wrapper">
        {variables.map((variable, index) => (
          <span 
            key={variable}
            className="handle-label handle-label-left" 
            style={{ top: `${getHandlePosition(index, variables.length)}%` }}
          >
            {variable}
          </span>
        ))}
        <span className="handle-label handle-label-right" style={{ top: '50%' }}>output</span>
      </div>
    </div>
  );
};
