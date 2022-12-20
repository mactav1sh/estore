import React from 'react';
import { BiLoader } from 'react-icons/bi';

interface IProps {
  size?: 'small' | 'medium' | 'large';
}

const Spinner = ({ size }: IProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-200 px-2">
      <div className=" w-full max-w-4xl   rounded-md bg-white p-6">
        <div className="animate-ping text-pink-600">
          <BiLoader size="1.5rem" />
        </div>
      </div>
    </main>
  );
};

export default Spinner;
