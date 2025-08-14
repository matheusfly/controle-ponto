import React from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AgentChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  pendingMessage?: string;
  onSend: (msg: string) => void;
  isSending: boolean;
}

const AgentChatPanel: React.FC<AgentChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  pendingMessage = '',
  onSend,
  isSending,
}) => {
  const [input, setInput] = React.useState(pendingMessage);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-army-olive shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-army-olive-light">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          🤖 Assistente IA
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-army-olive-light"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-3 py-2 whitespace-pre-wrap break-words ${
                m.role === 'user'
                  ? 'bg-lime-green text-charcoal-black'
                  : 'bg-gray-100 dark:bg-army-olive-light'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-army-olive-light rounded-lg px-3 py-2 animate-pulse">
              ...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-army-olive-light">
        <div className="flex items-center gap-2">
          <textarea
            className="flex-1 resize-none rounded-md border border-gray-300 dark:border-army-olive-light p-2 focus:outline-none focus:ring-2 focus:ring-lime-green max-h-32"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua solicitação..."
          />
          <button
            type="submit"
            disabled={isSending}
            className="p-2 bg-lime-green text-charcoal-black rounded-md hover:brightness-110 disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5 rotate-90" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgentChatPanel;

