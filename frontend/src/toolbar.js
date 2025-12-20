// toolbar.js - Pipeline toolbar with draggable nodes

import { DraggableNode } from './draggableNode';
import { Logo } from './components/Logo';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-header">
        <div className="toolbar-logo">
          <Logo size={36} />
          <div className="toolbar-brand">
            <h1>VectorShift</h1>
            <span className="toolbar-subtitle">Pipeline Builder</span>
          </div>
        </div>
      </div>
      <div className="toolbar-nodes">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="filter" label="Filter" />
        <DraggableNode type="api" label="API" />
        <DraggableNode type="transform" label="Transform" />
        <DraggableNode type="merge" label="Merge" />
        <DraggableNode type="note" label="Note" />
      </div>
    </div>
  );
};
