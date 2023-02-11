import { MutableRefObject, useEffect } from 'react';

const useOnOutsideClick = (
  ref: MutableRefObject<any>,
  callback: Function
): void => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      return callback();
    };

    document.body.addEventListener('click', listener);

    return () => document.body.removeEventListener('click', listener);
  }, [ref, callback]);
};

export default useOnOutsideClick;
