import { useEffect, useRef } from 'react';

function useClickAndScroll(callback: () => void) {
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClick = () => {
        callback();
      };
  
      const handleScroll = () => {
        callback();
      };
  
      if (divRef.current) {
        divRef.current.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll);
      }
  
      return () => {
        if (divRef.current) {
          divRef.current.removeEventListener('click', handleClick);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }, [callback]);
  
    return divRef;
}

export default useClickAndScroll