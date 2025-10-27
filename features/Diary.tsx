
import React, { useState } from 'react';

interface DiaryEntry {
  id: number;
  text: string;
  date: string;
}

const Diary: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    { id: 1, text: "Today was magical. Thinking about our future together fills my heart with so much joy.", date: new Date().toLocaleDateString() },
  ]);
  const [newEntry, setNewEntry] = useState('');

  const handleSave = () => {
    if (newEntry.trim()) {
      setEntries([...entries, { id: Date.now(), text: newEntry, date: new Date().toLocaleDateString() }]);
      setNewEntry('');
    }
  };

  return (
    <div className="text-white grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-amber-300">Share Your Thoughts</h3>
        <div className="bg-white/10 p-4 rounded-xl notebook-paper">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write what's in your heart..."
            className="w-full h-48 bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none p-2"
          />
        </div>
        <button onClick={handleSave} className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-opacity">
          Save Entry
        </button>
      </div>
      <div className="space-y-4">
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg shadow-rose-500/20">
            <img src="https://picsum.photos/seed/couplelove/600/400" alt="Romantic moment" className="w-full h-full object-cover"/>
        </div>
        <h3 className="text-2xl font-bold text-rose-300 mt-8">Past Entries</h3>
        <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
          {entries.slice().reverse().map(entry => (
            <div key={entry.id} className="bg-white/5 p-4 rounded-lg border-l-4 border-amber-400">
              <p className="text-gray-200">{entry.text}</p>
              <p className="text-right text-xs text-gray-400 mt-2">{entry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Diary;
