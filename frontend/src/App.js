// App.js - Main application component with Error Boundary

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ControlBar } from './components/ControlBar';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <PipelineToolbar />
        <ControlBar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ErrorBoundary>
  );
}

export default App;
