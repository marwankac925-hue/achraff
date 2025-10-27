
import React, { useState } from 'react';

const LaNuitBlanche: React.FC = () => {
  const [dreams, setDreams] = useState<string[]>([
    "I can't wait to travel the world with you.",
    "Let's build our dream house by the sea.",
    "Imagine us under the stars, just talking all night.",
  ]);
  const [newDream, setNewDream] = useState('');

  const handleShare = () => {
    if (newDream.trim()) {
      setDreams([...dreams, newDream]);
      setNewDream('');
    }
  };

  return (
    <div className="relative text-white p-4 rounded-xl overflow-hidden min-h-[60vh] flex flex-col justify-between">
      {/* Starry background effect */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute top-[50%] left-[80%] w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-[80%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute top-[10%] left-[90%] w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-[60%] left-[5%] w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
      </div>
      
      <div className="relative z-10 flex-grow space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        <h3 className="text-3xl font-dancing-script text-purple-300 mb-4 text-center">Our Future Dreams</h3>
        {dreams.map((dream, index) => (
          <div key={index} className="bg-black/20 p-4 rounded-lg border-l-4 border-purple-400 backdrop-blur-sm">
            <p className="italic">"{dream}"</p>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 pt-4 mt-4 border-t border-purple-800/50">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newDream}
            onChange={(e) => setNewDream(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleShare()}
            placeholder="Share a dream for our future..."
            className="flex-grow bg-gray-900/50 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white placeholder-gray-400"
          />
          <button onClick={handleShare} className="bg-gradient-to-r from-slate-600 to-purple-700 hover:opacity-90 text-white font-bold py-3 px-6 rounded-full transition-opacity">
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaNuitBlanche;
