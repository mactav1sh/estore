import { Spinner } from './Spinner';

export const LoadingOverlay = () => {
  return (
    <div className="absolute top-0 left-0 flex min-h-full min-w-full items-center justify-center">
      <div className="absolute h-full w-full bg-white opacity-70"></div>
      <Spinner size="lg" />
    </div>
  );
};
