
import React from 'react';

const ideas = [
  { title: "Weekly Date Night", description: "Dedicate one night a week just for the two of you. No phones, no distractions. Cook together, watch a movie, or just talk." },
  { title: "'I Appreciate You' Jar", description: "Write down things you appreciate about each other on small notes and put them in a jar. Read them together when you need a boost." },
  { title: "Learn Something New Together", description: "Take a class together—cooking, dancing, or even a new language. Growing together strengthens your bond." },
  { title: "Plan a Surprise", description: "It doesn't have to be big. A surprise lunch, a small gift, or a planned weekend getaway can make your partner feel cherished." },
  { title: "The 5-Minute Cuddle", description: "Before starting your day or going to sleep, spend five uninterrupted minutes just holding each other. It's a simple way to connect physically and emotionally." },
];

const Ideas: React.FC = () => {
  return (
    <div className="text-white space-y-6">
      <h3 className="text-3xl font-bold text-center text-lime-300 mb-8">Ideas to Strengthen Your Love</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea, index) => (
          <div key={index} className="bg-gradient-to-br from-teal-800/50 to-lime-900/50 p-6 rounded-2xl border border-teal-700 shadow-lg hover:shadow-lime-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <h4 className="font-bold text-xl text-lime-300 mb-2">{idea.title}</h4>
            <p className="text-gray-300">{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
