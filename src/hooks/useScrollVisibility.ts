import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollVisibilityOptions {
  delay?: number;
}

const useScrollVisibility = (options: UseScrollVisibilityOptions = {}) => {
  const { delay = 1000 } = options;
  const [isVisible, setIsVisible] = useState(true);
  // Fixed: Use ReturnType<typeof setTimeout> instead of NodeJS.Timeout
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScroll = useCallback(() => {
    setIsVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  }, [delay]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const hide = useCallback(() => {
    setIsVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { isVisible, hide };
};

export default useScrollVisibility;
