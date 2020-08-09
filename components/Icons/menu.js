import React from 'react';

export default function Menu({ className, color = '#fff' }) {
  return (
    <svg
      viewBox="0 0 270 270"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      className={className}
      width="30px"
      height="30px"
    >
      <path d="M114 0H10C4.5 0 0 4.5 0 10v104c0 5.5 4.5 10 10 10h104c5.5 0 10-4.5 10-10V10c0-5.5-4.5-10-10-10zm-10 104H20V20h84v84zM260 0H156c-5.5 0-10 4.5-10 10v104c0 5.5 4.5 10 10 10h104c5.5 0 10-4.5 10-10V10c0-5.5-4.5-10-10-10zm-10 104h-84V20h84v84zM114 146H10c-5.5 0-10 4.5-10 10v104c0 5.5 4.5 10 10 10h104c5.5 0 10-4.5 10-10V156c0-5.5-4.5-10-10-10zm-10 104H20v-84h84v84zM260 146H156c-5.5 0-10 4.5-10 10v104c0 5.5 4.5 10 10 10h104c5.5 0 10-4.5 10-10V156c0-5.5-4.5-10-10-10zm-10 104h-84v-84h84v84z" />
    </svg>
  );
}
