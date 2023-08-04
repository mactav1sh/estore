import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollRestoration = (props: React.PropsWithChildren) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  return <>{props.children}</>;
};

export default ScrollRestoration;
