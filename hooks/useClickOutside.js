import { useEffect, useState } from 'react';

export function useOutsideClick(ref) {
  const [clickOutside, setClickOutside] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleClick = (e) => {
    ref.current?.contains(e.target) ? setClickOutside(false) : setClickOutside(true);
  };

  return clickOutside;
}
