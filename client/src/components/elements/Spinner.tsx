import React from 'react';
import { BiLoader } from 'react-icons/bi';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: '1.5rem',
  md: '2.2rem',
  lg: '2.9rem',
};

const Spinner = ({ size = 'sm' }: IProps) => {
  return (
    <div className="animate-ping text-pink-600">
      <BiLoader size={sizes[size]} />
    </div>
  );
};

export default Spinner;
