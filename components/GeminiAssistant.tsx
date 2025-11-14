
import React, { useState, useEffect, useRef } from 'react';
import { Vulnerability, ChatMessage } from '../types';
import { analyzeVulnerabilityWithGemini } from '../services/geminiService';
import { ICONS } from '../constants';
import { Button } from './ui/Button';

interface GeminiAssistantProps {
  vulnerability: Vulnerability;
}

const PRESET_QUERIES = [
    "Analyze the vulnerability type and explain the root cause.",
    "Suggest a detailed, step-by-step remediation plan.",
    "Assess the priority and potential business impact of this vulnerability.",
    "Write a short summary of this finding for a non-technical manager."
];

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ vulnerability }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const systemMessage: ChatMessage = {
            id: 'system-intro',
            role: 'system',
            content: `Analyzing vulnerability: **${vulnerability.title}**. Ask me anything or use one of the suggestions below.`
        };
        setMessages([systemMessage]);
    }, [vulnerability]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    const handleSendMessage = async (query?: string) => {
        const userQuery = query || input;
        if (!userQuery.trim() || isLoading) return;

        const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: userQuery };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await analyzeVulnerabilityWithGemini(vulnerability, userQuery);
            const modelMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { id: (Date.now() + 1).toString(), role: 'system', content: 'Sorry, I encountered an error.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-secondary dark:bg-dark-secondary rounded-lg border border-border dark:border-dark-border">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary dark:bg-dark-primary flex items-center justify-center text-primary-foreground dark:text-dark-primary-foreground">
                                {ICONS.assistant}
                            </div>
                        )}
                         <div className={`max-w-xl rounded-lg px-4 py-2 ${
                            msg.role === 'user' 
                                ? 'bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground' 
                                : msg.role === 'model' 
                                ? 'bg-card dark:bg-dark-card' 
                                : 'text-center w-full bg-transparent text-muted-foreground dark:text-dark-muted-foreground text-sm'
                         }`}>
                             {/* A simple markdown parser for bold text */}
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />') }}></p>
                         </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3 justify-start">
                         <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary dark:bg-dark-primary flex items-center justify-center text-primary-foreground dark:text-dark-primary-foreground">
                                {ICONS.assistant}
                         </div>
                         <div className="max-w-xl rounded-lg px-4 py-2 bg-card dark:bg-dark-card flex items-center">
                            <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse mr-2"></span>
                            <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse delay-200 mr-2"></span>
                            <span className="w-2.5 h-2.5 bg-muted-foreground rounded-full animate-pulse delay-400"></span>
                         </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
                 <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PRESET_QUERIES.map((q) => (
                        <Button key={q} variant="outline" size="sm" onClick={() => handleSendMessage(q)} disabled={isLoading}>
                            {q}
                        </Button>
                    ))}
                 </div>
            )}
            
            <div className="p-4 border-t border-border dark:border-dark-border">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask the AI assistant..."
                            className="w-full bg-background dark:bg-dark-background border border-input dark:border-dark-input rounded-md pl-4 pr-12 h-10"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading}>
                            {isLoading ? ICONS.spinner : ICONS.send}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
