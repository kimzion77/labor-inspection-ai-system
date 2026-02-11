import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, ClipboardCheck, Map, AlertTriangle, MessageCircle } from 'lucide-react';
import '../.././../labor-guide.css';

const tabs = [
    { path: '/labor-guide', label: '체크리스트', icon: ClipboardCheck },
    { path: '/labor-guide/situations', label: '상황별', icon: Map },
    { path: '/labor-guide/cases', label: 'FAQ', icon: AlertTriangle },
    { path: '/labor-guide/consult', label: 'AI상담', icon: MessageCircle },
];

const MobileLayout = ({ title, children, showBack = true }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="labor-app min-h-screen bg-gray-bg flex flex-col">
            {/* 상단 헤더 */}
            <header className="bg-navy-deep text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    {showBack && (
                        <button onClick={() => navigate(-1)} className="p-1">
                            <ArrowLeft size={22} />
                        </button>
                    )}
                    <span className="text-[17px] font-bold">{title || '노동법 안내'}</span>
                </div>
                <button onClick={() => navigate('/')} className="p-1">
                    <Home size={20} />
                </button>
            </header>

            {/* 콘텐츠 */}
            <main className="flex-1 overflow-y-auto pb-20">
                <div className="max-w-[768px] mx-auto px-4 py-4">
                    {children}
                </div>
            </main>

            {/* 하단 탭바 */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-border flex justify-around py-1.5 pb-safe z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    const isActive = location.pathname === tab.path;
                    return (
                        <button
                            key={tab.path}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px] transition-colors ${isActive ? 'text-primary' : 'text-gray-text'}`}
                            onClick={() => navigate(tab.path)}
                        >
                            <Icon size={22} />
                            <span className="text-[11px] font-semibold">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileLayout;
