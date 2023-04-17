import { ReactNode, CSSProperties } from 'react';
import ContentWrapper from './ContentWrapper';

const AnnouncementBar = ({
  children,
  styles,
}: {
  children: ReactNode;
  styles?: CSSProperties;
}) => {
  return (
    <div className="bg-orange-100 py-1.5 text-gray-500" style={styles}>
      <ContentWrapper>
        <div className="flex items-center justify-center space-x-1">
          {children}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default AnnouncementBar;
