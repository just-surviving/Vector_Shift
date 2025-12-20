// ErrorBoundary.js - React Error Boundary for graceful error handling

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#0f172a',
          color: '#f8fafc',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            background: '#1e293b',
            padding: '40px',
            borderRadius: '12px',
            border: '1px solid #475569'
          }}>
            <svg 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="2"
              style={{ margin: '0 auto 20px' }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            
            <h1 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '10px',
              color: '#ef4444'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{ 
              color: '#94a3b8', 
              marginBottom: '20px',
              fontSize: '0.9375rem'
            }}>
              The application encountered an unexpected error. Don't worry, your work might be saved.
            </p>
            
            {this.state.error && (
              <details style={{
                background: '#0f172a',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'left',
                fontSize: '0.8125rem',
                color: '#64748b'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px', color: '#94a3b8' }}>
                  Error Details
                </summary>
                <pre style={{ 
                  overflow: 'auto', 
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
