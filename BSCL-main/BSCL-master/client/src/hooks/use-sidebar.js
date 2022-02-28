import React, {
  useState,
  useLayoutEffect,
  useContext,
  createContext
} from 'react';

const sidebarContext = createContext();

export const ProvideSidebar = ({ children }) => {
  const sidebar = useProvideSidebar();
  return (
    <sidebarContext.Provider value={sidebar}>
      {children}
    </sidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(sidebarContext);
};

const useProvideSidebar = () => {
  const [state, setState] = useState('close');

  const toggle = () => {
    if (state === 'mini' || state === 'close') {
      setState('open');
    }

    if (state === 'open') {
      if (window.innerWidth < 1024) {
        setState('close');
      } else {
        setState('mini');
      }
    }
  };

  const close = () => {
    if (state === 'open' && window.innerWidth < 1024) {
      setState('close');
    }
  };

  useLayoutEffect(() => {
    const updateSidebar = () => {
      if (window.innerWidth < 1024) {
        setState('close');
      } else {
        setState('open');
      }
    };

    window.addEventListener('resize', updateSidebar);
    updateSidebar();

    return () => window.removeEventListener('resize', updateSidebar);
  }, []);

  return { state, toggle, close };
};
