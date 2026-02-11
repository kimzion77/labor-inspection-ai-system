import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, ClipboardCheck, AlertTriangle } from 'lucide-react';

const tabs = [
    { path: '/labor-guide', label: '홈', icon: Home },
    { path: '/labor-guide/checklist-advanced', label: '체크리스트', icon: ClipboardCheck },
    { path: '/labor-guide/cases', label: '위반사례', icon: AlertTriangle },
];

const DoneMobileLayout = ({ title, children, showBack = true, showTabs = true }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="labor-guide">
            {/* 상단 헤더 */}
            <header className="labor-guide-header">
                <div className="labor-guide-header-left">
                    {showBack && (
                        <button className="labor-guide-header-back" onClick={() => navigate(-1)}>
                            <ArrowLeft size={22} />
                        </button>
                    )}
                    <span className="labor-guide-header-title">{title || '사업주를 위한 노동법 안내'}</span>
                </div>
                <button className="labor-guide-header-home" onClick={() => navigate('/labor-guide')}>
                    <Home size={20} />
                </button>
            </header>

            {/* 콘텐츠 */}
            <main className="labor-guide-content">
                {children}
            </main>

            {/* 하단 탭바 */}
            {showTabs && (
                <nav className="bottom-tab-bar">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = location.pathname === tab.path ||
                            (tab.path !== '/labor-guide' && location.pathname.startsWith(tab.path));
                        return (
                            <button
                                key={tab.path}
                                className={`tab-item ${isActive ? 'active' : ''}`}
                                onClick={() => navigate(tab.path)}
                            >
                                <Icon size={22} />
                                <span className="tab-item-label">{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>
            )}
        </div>
    );
};

export default DoneMobileLayout;
