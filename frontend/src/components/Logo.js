// Logo.js - VectorShift Logo Component

export const Logo = ({ size = 32 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background gradient circle */}
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
    
    {/* Main circle background */}
    <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />
    
    {/* Pipeline nodes */}
    <circle cx="18" cy="24" r="6" fill="white" opacity="0.9" />
    <circle cx="46" cy="24" r="6" fill="white" opacity="0.9" />
    <circle cx="32" cy="44" r="6" fill="white" opacity="0.9" />
    
    {/* Connection lines */}
    <path 
      d="M24 24 L40 24" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      opacity="0.7"
    />
    <path 
      d="M18 30 L32 38" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      opacity="0.7"
    />
    <path 
      d="M46 30 L32 38" 
      stroke="white" 
      strokeWidth="2.5" 
      strokeLinecap="round"
      opacity="0.7"
    />
    
    {/* Arrow indicators */}
    <path 
      d="M36 24 L40 24 L38 22 M40 24 L38 26" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

export default Logo;
