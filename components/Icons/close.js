import React from 'react';

export default function Close({ className = undefined, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={className} width="15px" height="15px">
      <g fill="none" fillRule="evenodd">
        <path
          fill={color}
          fillOpacity=".45"
          fillRule="nonzero"
          d="M5.2 4.346l4.801 4.802 4.795-4.793.849.849-4.795 4.793 4.795 4.794-.849.849-4.794-4.795L5.2 15.65l-.849-.849 4.802-4.803-4.802-4.802.849-.849z"
        />
      </g>
    </svg>
  );
}
