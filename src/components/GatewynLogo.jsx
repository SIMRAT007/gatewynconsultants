export default function GatewynLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arch background */}
      <path
        d="M 40 180 L 40 60 Q 40 20 80 20 L 120 20 Q 160 20 160 60 L 160 180"
        fill="none"
        stroke="#E7CD87"
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Door */}
      <g>
        {/* Door frame */}
        <rect
          x="50"
          y="90"
          width="40"
          height="90"
          rx="4"
          fill="#E7CD87"
          stroke="#c9a84c"
          strokeWidth="2"
        />
        
        {/* Door panels */}
        <rect x="55" y="95" width="30" height="35" rx="2" fill="#142845" opacity="0.3" />
        <rect x="55" y="135" width="30" height="40" rx="2" fill="#142845" opacity="0.3" />
        
        {/* Door handle */}
        <circle cx="75" cy="145" r="3" fill="#142845" />
        
        {/* Door opening effect */}
        <path
          d="M 50 90 Q 45 140 50 180"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="2"
          opacity="0.6"
        />
      </g>
      
      {/* Globe */}
      <g transform="translate(115, 100)">
        {/* Globe circle */}
        <circle
          cx="0"
          cy="0"
          r="35"
          fill="none"
          stroke="#E7CD87"
          strokeWidth="4"
        />
        
        {/* Latitude lines */}
        <ellipse cx="0" cy="0" rx="35" ry="12" fill="none" stroke="#E7CD87" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="35" ry="24" fill="none" stroke="#E7CD87" strokeWidth="1.5" opacity="0.4" />
        
        {/* Longitude lines */}
        <ellipse cx="0" cy="0" rx="12" ry="35" fill="none" stroke="#E7CD87" strokeWidth="1.5" opacity="0.6" />
        <ellipse cx="0" cy="0" rx="24" ry="35" fill="none" stroke="#E7CD87" strokeWidth="1.5" opacity="0.4" />
        
        {/* Center vertical line */}
        <line x1="0" y1="-35" x2="0" y2="35" stroke="#E7CD87" strokeWidth="2" />
        
        {/* Continents (simplified) */}
        <path d="M -15 -10 Q -10 -15 -5 -10 L 0 -8 L 5 -12 L 8 -8 L 5 -5 L 0 -3 L -8 -5 Z" fill="#E7CD87" opacity="0.5" />
        <path d="M 10 5 Q 15 3 18 8 L 15 15 L 10 12 L 8 8 Z" fill="#E7CD87" opacity="0.5" />
        <path d="M -12 10 L -8 15 L -15 18 L -18 12 Z" fill="#E7CD87" opacity="0.5" />
      </g>
      
      {/* Decorative elements */}
      <circle cx="100" cy="30" r="3" fill="#E7CD87" opacity="0.4" />
      <circle cx="80" cy="40" r="2" fill="#E7CD87" opacity="0.3" />
      <circle cx="120" cy="40" r="2" fill="#E7CD87" opacity="0.3" />
    </svg>
  );
}
