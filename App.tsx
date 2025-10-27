import React, { useState, useCallback, Fragment, ReactNode } from 'react';
import { ChatIcon, DiaryIcon, GamesIcon, IdeasIcon, MoonIcon, CloseIcon } from './components/icons';
import ProblemSolver from './features/ProblemSolver';
import Diary from './features/Diary';
import Ideas from './features/Ideas';
import Games from './features/Games';
import LaNuitBlanche from './features/LaNuitBlanche';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  Icon: React.FC<{ className?: string }>;
  Component: React.FC;
  gradient: string;
}

const features: Feature[] = [
  {
    id: 'problem-solver',
    title: '💬 حل مشاكل',
    subtitle: 'Problem Solver',
    Icon: ChatIcon,
    Component: ProblemSolver,
    gradient: 'from-fuchsia-500 to-cyan-500',
  },
  {
    id: 'diary',
    title: '📖 حكي و سرد',
    subtitle: 'Diary & Feelings',
    Icon: DiaryIcon,
    Component: Diary,
    gradient: 'from-amber-400 to-rose-400',
  },
  {
    id: 'ideas',
    title: '💡 أفكار و حيل',
    subtitle: 'Ideas & Tips',
    Icon: IdeasIcon,
    Component: Ideas,
    gradient: 'from-lime-400 to-teal-400',
  },
  {
    id: 'games',
    title: '🎮 الألعاب',
    subtitle: 'Games for Couples',
    Icon: GamesIcon,
    Component: Games,
    gradient: 'from-sky-400 to-indigo-500',
  },
  {
    id: 'nuit-blanche',
    title: '🌙 La Nuit Blanche',
    subtitle: 'ليلة بيضاء',
    Icon: MoonIcon,
    Component: LaNuitBlanche,
    gradient: 'from-slate-800 to-purple-900',
  },
];


const Card: React.FC<{ feature: Feature; onClick: (feature: Feature) => void }> = ({ feature, onClick }) => (
  <div
    onClick={() => onClick(feature)}
    className={`relative group cursor-pointer p-8 rounded-3xl shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] bg-gradient-to-br ${feature.gradient} text-white overflow-hidden`}
  >
    <div className="relative z-10 flex flex-col items-center text-center">
      <feature.Icon className="w-20 h-20 mb-4 drop-shadow-lg transition-transform duration-300 group-hover:scale-110" />
      <h2 className="text-2xl md:text-3xl font-bold">{feature.title}</h2>
      <p className="text-lg opacity-80">{feature.subtitle}</p>
    </div>
     <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
  </div>
);

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: ReactNode; title: string, gradient: string }> = ({ isOpen, onClose, children, title, gradient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className={`relative w-full max-w-4xl max-h-[90vh] bg-gray-800/50 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden`}>
        <div className={`flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r ${gradient} text-white`}>
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);

  const handleCardClick = useCallback((feature: Feature) => {
    setActiveFeature(feature);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveFeature(null);
  }, []);
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white selection:bg-pink-500/50">
      <main className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="font-dancing-script text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            💖 Achraf & Sara 💖
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mt-4">Our Special Place</p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
         {features.map((feature) => (
            <Card key={feature.id} feature={feature} onClick={handleCardClick} />
          ))}
        </div>
      </main>
      
      {activeFeature && (
        <Modal 
          isOpen={!!activeFeature} 
          onClose={handleCloseModal} 
          title={`${activeFeature.title} - ${activeFeature.subtitle}`}
          gradient={activeFeature.gradient}
        >
          <activeFeature.Component />
        </Modal>
      )}

      {/* Fix: The 'jsx' and 'global' props are not standard for the <style> tag in React. They are part of Next.js's styled-jsx. Removed them to resolve the type error. */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
