// ControlBar.js - Control bar with export/import and undo/redo

import { useStore } from '../store';
import { useRef } from 'react';

export const ControlBar = () => {
  const fileInputRef = useRef(null);
  
  const undo = useStore((state) => state.undo);
  const redo = useStore((state) => state.redo);
  const historyIndex = useStore((state) => state.historyIndex);
  const history = useStore((state) => state.history);
  const exportPipeline = useStore((state) => state.exportPipeline);
  const importPipeline = useStore((state) => state.importPipeline);
  const clearPipeline = useStore((state) => state.clearPipeline);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleExport = () => {
    const json = exportPipeline();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pipeline-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importPipeline(e.target.result);
        if (success) {
          alert('✅ Pipeline imported successfully!');
        } else {
          alert('❌ Failed to import pipeline. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    event.target.value = '';
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire pipeline? This cannot be undone.')) {
      clearPipeline();
    }
  };

  return (
    <div className="control-bar">
      <div className="control-group">
        <button
          className="control-button"
          onClick={undo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7v6h6M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
          </svg>
          <span>Undo</span>
        </button>
        
        <button
          className="control-button"
          onClick={redo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 7v6h-6M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7" />
          </svg>
          <span>Redo</span>
        </button>
      </div>

      <div className="control-divider"></div>

      <div className="control-group">
        <button
          className="control-button"
          onClick={handleExport}
          title="Export Pipeline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          <span>Export</span>
        </button>
        
        <button
          className="control-button"
          onClick={() => fileInputRef.current?.click()}
          title="Import Pipeline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
          <span>Import</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
        
        <button
          className="control-button control-button-danger"
          onClick={handleClear}
          title="Clear Pipeline"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};
