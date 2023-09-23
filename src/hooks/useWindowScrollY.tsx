import { useState, useEffect } from 'react';

function useWindowScrollY() {
    const [windowScrollY, setWindowScrollY] = useState(window.scrollY);

    const handleScroll = () => {
        setWindowScrollY(window.scrollY);
    };

    useEffect(() => {
        // Add event listener to track window scroll
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array to run the effect only once

    return windowScrollY;
}

export default useWindowScrollY;