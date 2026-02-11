import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Building2, Factory, ClipboardCheck, AlertTriangle, ChevronRight } from 'lucide-react';
import DoneMobileLayout from '../components/DoneMobileLayout';
import '../done-styles.css';

const BUSINESS_SIZES = [
    {
        id: 'under5',
        value: 1,
        label: '5인 미만',
        desc: '간단한 노무 관리',
        icon: Users,
        color: '#0056B3'
    },
    {
        id: 'over5',
        value: 5,
        label: '5인 이상',
        desc: '필수 노무 의무 시작',
        icon: UserCheck,
        color: '#059669'
    },
    {
        id: 'over30',
        value: 30,
        label: '30인 이상',
        desc: '산업안전 관리 강화',
        icon: Building2,
        color: '#7C3AED'
    },
    {
        id: 'over50',
        value: 50,
        label: '50인 이상',
        desc: '중대재해처벌법 적용',
        icon: Factory,
        color: '#DC2626'
    },
];

const QUICK_MENU = [
    {
        id: 'checklist',
        label: '의무 체크리스트',
        path: '/labor-guide/checklist-advanced',
        icon: ClipboardCheck,
        color: '#0056B3',
        bgColor: '#EFF6FF'
    },
    {
        id: 'cases',
        label: '위반사례',
        path: '/labor-guide/cases',
        icon: AlertTriangle,
        color: '#DC2626',
        bgColor: '#FEF2F2'
    },
];

function LaborGuideHome() {
    const navigate = useNavigate();

    const handleSizeSelect = (size) => {
        localStorage.setItem('selectedBusinessSize', size.value.toString());
        navigate('/labor-guide/checklist-advanced');
    };

    return (
        <DoneMobileLayout title="고용노동부" showBack={false}>
            {/* 히어로 섹션 */}
            <div className="home-hero">
                <h1 className="home-hero-title">우리 사업장 규모는?</h1>
                <p className="home-hero-subtitle">규모에 맞는 노동법 의무를 확인하세요</p>
            </div>

            {/* 사업장 규모 선택 그리드 */}
            <div className="business-size-grid">
                {BUSINESS_SIZES.map((size) => {
                    const Icon = size.icon;
                    return (
                        <div
                            key={size.id}
                            className="size-card"
                            onClick={() => handleSizeSelect(size)}
                        >
                            <div className="size-card-icon" style={{ background: `${size.color}15` }}>
                                <Icon size={28} color={size.color} />
                            </div>
                            <div className="size-card-title">{size.label}</div>
                            <div className="size-card-desc">{size.desc}</div>
                        </div>
                    );
                })}
            </div>

            {/* 빠른 메뉴 */}
            <div className="quick-menu-list">
                {QUICK_MENU.map((menu) => {
                    const Icon = menu.icon;
                    return (
                        <div
                            key={menu.id}
                            className="quick-menu-card"
                            onClick={() => navigate(menu.path)}
                        >
                            <div
                                className="quick-menu-icon"
                                style={{ background: menu.bgColor }}
                            >
                                <Icon size={20} color={menu.color} />
                            </div>
                            <span className="quick-menu-title">{menu.label}</span>
                            <ChevronRight size={20} className="quick-menu-arrow" />
                        </div>
                    );
                })}
            </div>
        </DoneMobileLayout>
    );
}

export default LaborGuideHome;
