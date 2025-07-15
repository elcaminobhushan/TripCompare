import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../../types/chat';
import { processUserInput } from '../../services/chatService';
import ResponseRenderer from '../chat/ResponseRenderer';

interface ChatInterfaceProps {
  // No props needed anymore
}

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    const storedResponse = localStorage.getItem('initialAIResponse');
    
    if (storedResponse) {
      try {
        const parsedResponse = JSON.parse(storedResponse);
        
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: parsedResponse.content || `Compare these packages: ${parsedResponse.packages?.map((p: any) => p.title).join(' and ')}`,
          timestamp: new Date()
        };
        setMessages([userMessage]);

        const response = processUserInput(parsedResponse.content || '');
        
        setTimeout(() => {
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: response.content,
            timestamp: new Date(),
            response,
            suggestions: [
              "Compare prices and value",
              "Show included activities",
              "Accommodation details",
              "Best time to visit"
            ]
          };
          setMessages(prev => [...prev, aiMessage]);
        }, 500);

        localStorage.removeItem('initialAIResponse');
      } catch (e) {
        console.error('Error parsing stored response:', e);
        setMessages([createDefaultMessage()]);
      }
    } else {
      setMessages([createDefaultMessage()]);
    }
  }, []);

  const createDefaultMessage = (): ChatMessage => ({
    id: '1',
    type: 'ai',
    content: "Hi! I'm your AI travel assistant. Let me help you find your perfect vacation package.",
    timestamp: new Date(),
    suggestions: [
      "Compare prices and value",
      "Show included activities",
      "Accommodation details",
      "Best time to visit"
    ]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = processUserInput(input);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: response.content,
      timestamp: new Date(),
      response,
      suggestions: [
        "Tell me more about activities",
        "Show accommodation options",
        "Compare prices",
        "What's included?"
      ]
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const response = processUserInput(suggestion);
    
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        response,
        suggestions: [
          "Tell me more about activities",
          "Show accommodation options",
          "Compare prices",
          "What's included?"
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-gray-200 p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <Bot className="h-4 w-4 md:h-6 md:w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-sm md:text-base">AI Travel Assistant</h2>
            <p className="text-xs md:text-sm text-gray-600">Powered by advanced AI</p>
          </div>
        </div>
      </div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 md:gap-3 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-primary-100 text-primary-600'
                  : 'bg-purple-100 text-purple-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="h-3 w-3 md:h-5 md:w-5" />
                ) : (
                  <Bot className="h-3 w-3 md:h-5 md:w-5" />
                )}
              </div>

              <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
                <div className={`rounded-xl p-3 md:p-4 shadow-sm text-sm md:text-base ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-100'
                }`}>
                  {message.content}
                </div>

                {message.response && <ResponseRenderer response={message.response} />}
                
                {message.type === 'ai' && message.suggestions && (
                  <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="bg-white shadow-sm border border-gray-200 hover:border-primary-300 hover:bg-primary-50 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Bot className="h-3 w-3 md:h-5 md:w-5 text-purple-600" />
              </div>
              <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-3 md:p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about the packages..."
            className="flex-1 input bg-gray-50 border-gray-200 shadow-sm text-sm md:text-base px-3 md:px-4 py-2 md:py-3 focus:border-primary-300 focus:ring-primary-200"
          />
          <button
            type="submit"
            className={`btn-primary px-4 md:px-6 py-2 md:py-3 shadow-sm transition-all ${
              !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;