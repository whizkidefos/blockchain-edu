import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const BottomControls = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percentage = (scrolled / documentHeight) * 100;
      setScrollPercentage(Math.min(percentage, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50">
      {/* Chat Window */}
      {isChatOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-80 mb-4 transition-all duration-300 animate-fade-in">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-96 overflow-y-auto">
            <div className="text-gray-600 dark:text-gray-300">
              How can I help you today?
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Scroll Indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2">
          <div className="w-12 h-12 rounded-full relative flex items-center justify-center bg-gray-50 dark:bg-gray-700">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent"
              style={{
                background: `conic-gradient(from 0deg, #3B82F6 ${scrollPercentage}%, transparent ${scrollPercentage}%)`,
                maskImage: 'radial-gradient(transparent 60%, black 60%)',
                WebkitMaskImage: 'radial-gradient(transparent 60%, black 60%)'
              }}
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {Math.round(scrollPercentage)}%
            </span>
          </div>
        </div>

        {/* AI Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default BottomControls;