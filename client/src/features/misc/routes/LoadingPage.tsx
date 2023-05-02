import Spinner from '../../../components/elements/Spinner';

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingPage;
