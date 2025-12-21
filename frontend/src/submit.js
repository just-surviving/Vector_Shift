// submit.js - Submit button with backend integration and loading state

import { useState } from 'react';
import { useStore } from './store';
import { LoadingOverlay } from './components/LoadingOverlay';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Use individual selectors to avoid infinite loop
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert('⚠️ Please add some nodes to the pipeline before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/pipelines/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Create a more detailed result message
      const resultMessage = 
        `🎯 Pipeline Analysis Results\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `📊 Total Nodes: ${data.num_nodes}\n` +
        `🔗 Total Edges: ${data.num_edges}\n` +
        `✅ Valid DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `${data.is_dag 
          ? '✨ Your pipeline is a valid Directed Acyclic Graph!\n\nThis means there are no circular dependencies and the pipeline can be executed in a proper order.' 
          : '⚠️ Warning: Your pipeline contains cycles!\n\nCircular dependencies detected. Please review your connections to ensure proper data flow.'}`;
      
      alert(resultMessage);
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      
      const errorMessage = 
        `❌ Connection Error\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Failed to connect to the backend server.\n\n` +
        `Error: ${error.message}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Please ensure:\n` +
        `• Backend server is running on ${apiUrl}\n` +
        `• CORS is properly configured\n` +
        `• Network connection is stable`;
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay message="Analyzing pipeline..." />}
      
      <div className="submit-container">
        <div className="submit-info">
          <span className="submit-stats">
            {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'} • {edges.length} {edges.length === 1 ? 'edge' : 'edges'}
          </span>
        </div>
        
        <button 
          className="submit-button" 
          onClick={handleSubmit}
          disabled={isLoading || nodes.length === 0}
        >
          {isLoading ? (
            <>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              Submit Pipeline
            </>
          )}
        </button>
        
        <div className="submit-shortcuts">
          <span className="shortcut-hint">💡 Tip: Use Ctrl+Z/Y for undo/redo</span>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};
