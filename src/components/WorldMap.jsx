import { useState } from 'react';
import mapImage from '../assets/map.png';

const DESTINATIONS = [
  { id: 'ca', label: 'Canada', x: 96, y: 70, color: '#E7CD87', visas: '2.5K+', pulse: true },
  { id: 'us', label: 'USA', x: 86, y: 98, color: '#E7CD87', visas: '3.2K+', pulse: true },
  { id: 'uk', label: 'UK', x: 226, y: 67, color: '#E7CD87', visas: '1.8K+', pulse: true },
  { id: 'de', label: 'Germany', x: 240, y: 75, color: '#E7CD87', visas: '950+', pulse: true },
  { id: 'au', label: 'Australia', x: 394, y: 196, color: '#E7CD87', visas: '2.1K+', pulse: true },
  { id: 'nz', label: 'New Zealand', x: 422, y: 213, color: '#E7CD87', visas: '680+', pulse: true },
  { id: 'sg', label: 'Singapore', x: 365, y: 151, color: '#E7CD87', visas: '540+', pulse: true },
  { id: 'ae', label: 'UAE', x: 278, y: 123, color: '#E7CD87', visas: '1.2K+', pulse: true },
];

export default function WorldMap({ className = '' }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={`relative select-none ${className}`} style={{ overflow: 'visible' }}>
      <svg
        viewBox="0 0 480 280"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-full"
        style={{ 
          overflow: 'visible',
          display: 'block'
        }}
      >
        <defs>
          {/* Golden filter for the map - inverts black to white/golden */}
          <filter id="goldenFilter">
            {/* Invert colors */}
            <feColorMatrix
              type="matrix"
              values="-1 0 0 0 1
                       0 -1 0 0 1
                       0 0 -1 0 1
                       0 0 0 1 0"
            />
            {/* Apply golden tone */}
            <feColorMatrix
              type="matrix"
              values="1.2 0 0 0 0
                      0.9 0 0 0 0
                      0.4 0 0 0 0
                      0 0 0 0.8 0"
            />
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
          
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(231,205,135,0.02)" />
            <stop offset="50%" stopColor="rgba(231,205,135,0.25)" />
            <stop offset="100%" stopColor="rgba(231,205,135,0.02)" />
          </linearGradient>
        </defs>

        {/* Map Image with golden filter */}
        <image
          href={mapImage}
          x="0"
          y="0"
          width="480"
          height="280"
          preserveAspectRatio="xMidYMid meet"
          filter="url(#goldenFilter)"
          opacity="0.8"
        />

        {/* Connection lines from origin to destinations */}
        {DESTINATIONS.map((dest, i) => {
          const isHovered = hovered === dest.id;
          
          return (
            <g key={`line-${dest.id}`}>
              <line
                x1="340" y1="120"
                x2={dest.x} y2={dest.y}
                stroke={isHovered ? "rgba(231,205,135,0.35)" : "url(#lineGradient)"}
                strokeWidth={isHovered ? "1.5" : "1"}
                strokeDasharray="5 8"
                style={{ 
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: isHovered ? 'url(#soft-glow)' : 'none'
                }}
              />
              
              {isHovered && (
                <line
                  x1="340" y1="120"
                  x2={dest.x} y2={dest.y}
                  stroke="rgba(231,205,135,0.2)"
                  strokeWidth="4"
                  strokeDasharray="5 8"
                  filter="url(#soft-glow)"
                  opacity="0.6"
                />
              )}
            </g>
          );
        })}

        {/* Destination markers */}
        {DESTINATIONS.map((dest, i) => {
          const cx = dest.x;
          const cy = dest.y;
          const isHovered = hovered === dest.id;
          
          return (
            <g
              key={dest.id}
              onMouseEnter={() => setHovered(dest.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle 
                cx={cx} 
                cy={cy} 
                r={isHovered ? 7 : 5} 
                fill="rgba(231,205,135,0.15)" 
                filter="url(#soft-glow)"
                style={{ transition: 'all 0.3s ease' }}
              />
              
              <circle 
                cx={cx} 
                cy={cy} 
                r={isHovered ? 5 : 3.5} 
                fill="none" 
                stroke="#E7CD87" 
                strokeWidth={isHovered ? "1.2" : "0.9"}
                opacity={isHovered ? 0.8 : 0.5}
                style={{ transition: 'all 0.3s ease' }}
              />
              
              <circle 
                cx={cx} 
                cy={cy} 
                r={isHovered ? 3 : 2} 
                fill="#E7CD87" 
                opacity={isHovered ? 1 : 0.8}
                filter={isHovered ? "url(#glow-filter)" : "none"}
                style={{ transition: 'all 0.3s ease' }}
              />

              {isHovered && (
                <g>
                  <rect 
                    x={cx - 32} 
                    y={cy - 30} 
                    width="64" 
                    height="22" 
                    rx="4" 
                    fill="#142845" 
                    stroke="#E7CD87" 
                    strokeWidth="0.8" 
                    opacity="0.98"
                    filter="url(#soft-glow)"
                  />
                  <text 
                    x={cx} 
                    y={cy - 20} 
                    textAnchor="middle" 
                    fill="#E7CD87" 
                    fontSize="7" 
                    fontFamily="Outfit" 
                    fontWeight="600"
                    letterSpacing="0.3"
                  >
                    {dest.label}
                  </text>
                  <text 
                    x={cx} 
                    y={cy - 12} 
                    textAnchor="middle" 
                    fill="rgba(231,205,135,0.6)" 
                    fontSize="5" 
                    fontFamily="Outfit" 
                    fontWeight="400"
                  >
                    {dest.visas} visas
                  </text>
                </g>
              )}
            </g>
          );
        })}

        <g filter="url(#glow-filter)">
          <circle cx="340" cy="120" r="6" fill="#E7CD87" opacity="0.95" />
          <circle cx="340" cy="120" r="3" fill="#142845" opacity="0.8" />
        </g>
        
        <text 
          x="340" 
          y="138" 
          textAnchor="middle" 
          fill="#E7CD87" 
          fontSize="6" 
          fontFamily="Outfit" 
          fontWeight="500"
          opacity="0.8"
          letterSpacing="0.5"
        >
          Your Origin
        </text>
      </svg>
    </div>
  );
}
