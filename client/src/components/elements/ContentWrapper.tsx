import { ReactNode } from 'react';

export const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto px-2 md:max-w-3xl lg:max-w-7xl">{children}</div>
  );
};
