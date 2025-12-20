// LoadingOverlay.js - Loading overlay component

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="loading-spinner">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  </div>
);
