// noteNode.js - Documentation/annotation node

import { useCallback } from 'react';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleContentChange = useCallback((e) => {
    updateNodeField(id, 'content', e.target.value);
  }, [id, updateNodeField]);

  return (
    <div className="pipeline-node note-node">
      <div className="node-header">
        <div className="node-icon">📌</div>
        <span className="node-title">Note</span>
        <span className="node-id">{id}</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <textarea
            className="node-textarea"
            value={data?.content || ''}
            onChange={handleContentChange}
            placeholder="Add documentation or notes..."
            rows={4}
            style={{ minHeight: '80px' }}
          />
        </div>
      </div>
    </div>
  );
};
