'use client';

interface LoadingPageProps {
  isLoading: boolean;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center animate-fade-in">
        <div className="mb-8 flex justify-center">
          <div className="infinity-spinner">
            <div></div>
            <div></div>
          </div>
        </div>
        <div>
          <h2 className="text-white text-2xl font-semibold mb-3 tracking-wide">TrueNode</h2>
          <p className="text-white/70 text-base">Delivering your True Node experience...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 