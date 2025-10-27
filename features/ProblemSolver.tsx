
import React, { useState } from 'react';
import { MicIcon, SendIcon } from '../components/icons';

interface Message {
  text: string;
  sender: 'Achraf' | 'Sara';
}

const ProblemSolver: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey, we need to talk about...", sender: 'Achraf' },
    { text: "I know. I'm ready to listen. What's on your mind?", sender: 'Sara' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      // Simple logic to alternate senders for demo purposes
      const sender = messages.length % 2 === 0 ? 'Achraf' : 'Sara';
      setMessages([...messages, { text: newMessage, sender }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[70vh] text-white">
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'Achraf' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === 'Achraf' ? 'bg-fuchsia-600 rounded-br-none' : 'bg-cyan-600 rounded-bl-none'}`}>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 flex items-center gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message here..."
          className="flex-grow bg-gray-700/50 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
        />
        <button className="p-3 rounded-full bg-cyan-500 hover:bg-cyan-400 transition-colors">
          <MicIcon className="w-6 h-6 text-white" />
        </button>
        <button onClick={handleSend} className="p-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 transition-colors">
          <SendIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProblemSolver;
