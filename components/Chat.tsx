import React, { useState } from 'react';
import axios from 'axios';

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessages([...messages, `You: ${input}`]);
    
    try {
      const response = await axios.post('/api/chat', { message: input });
      setMessages([...messages, `You: ${input}`, `AI: ${response.data.message}`]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    setInput('');
  };

  return (
    <div className="bg-gray-50 p-4 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">{msg}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l px-2 py-1"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-r">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
