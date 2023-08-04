import { BiLoader } from 'react-icons/bi';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: '1.2rem',
  md: '1.8rem',
  lg: '2.2rem',
};

export const Spinner = ({ size = 'sm' }: IProps) => {
  return (
    <div className="animate-ping text-pink-600">
      <BiLoader size={sizes[size]} />
    </div>
  );
};
