import { ReactNode } from 'react';
import ContentWrapper from './ContentWrapper';

const AnnouncementBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-700 py-1.5 text-gray-100">
      <ContentWrapper>
        <div className="flex items-center justify-center space-x-1">
          {children}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default AnnouncementBar;
