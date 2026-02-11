import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import MobileLayout from '../components/laborGuide/layout/MobileLayout';

const INITIAL_MESSAGE = {
    role: 'bot',
    content: '안녕하세요! 노동법 AI 상담입니다.\n\n사업 운영 중 궁금한 노동법 관련 질문을 입력해 주세요. 근로계약, 임금, 근로시간, 퇴직금 등 다양한 주제에 대해 안내해 드립니다.\n\n※ 본 상담은 참고용이며, 정확한 법률 자문은 노무사 또는 고용노동부(1350)에 문의하시기 바랍니다.'
};

function AIConsult() {
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        const text = input.trim();
        if (!text || isLoading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/labor-consult', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: text })
            });
            if (!response.ok) throw new Error('서버 응답 오류');
            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', content: data.answer || '죄송합니다, 답변을 생성하지 못했습니다.' }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'bot',
                content: '현재 AI 상담 서버에 연결할 수 없습니다.\n\n아래 채널을 통해 직접 상담하실 수 있습니다:\n\n• 고용노동부 상담센터: 1350\n• 고용노동부 AI 상담: ai.moel.go.kr\n• 근로조건 자율점검: 고용노동부 홈페이지'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <MobileLayout title="AI 노동법 상담">
            <div className="flex flex-col -mx-4 -my-4" style={{ height: 'calc(100vh - 130px)' }}>
                {/* 채팅 메시지 */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                                msg.role === 'user'
                                    ? 'bg-primary text-white rounded-2xl rounded-br-sm'
                                    : 'bg-white text-gray-700 rounded-2xl rounded-bl-sm shadow-sm'
                            }`}>
                                {msg.role === 'bot' && (
                                    <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-primary">
                                        <Bot size={14} /> AI 상담
                                    </div>
                                )}
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm px-4 py-3 flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-gray-200 border-t-primary rounded-full animate-spin"></div>
                                <span className="text-xs text-gray-text">답변 생성 중...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* 입력 영역 */}
                <div className="px-4 py-3 bg-white border-t border-gray-border flex items-center gap-2.5">
                    <input
                        className="flex-1 px-4 py-2.5 border border-gray-border rounded-full text-sm outline-none focus:border-primary transition-colors"
                        placeholder="질문을 입력하세요..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </MobileLayout>
    );
}

export default AIConsult;
