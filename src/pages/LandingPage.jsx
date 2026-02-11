import { ShieldCheck, CheckCircle2, FileText, ArrowRight, Upload } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const goToService = (service) => navigate(`/analyze/${service}`);

    const services = [
        { key: 'contract', icon: <FileText size={32} color="#0056B3" />, title: '근로계약서 분석', desc: 'AI가 근로계약서의 법적 적합성을 분석합니다', bg: '#e6f0ff' },
        { key: 'salary', icon: <FileText size={32} color="#22C55E" />, title: '임금명세서 분석', desc: '임금명세서의 법정 기재사항을 검토합니다', bg: '#e6fff0' },
        { key: 'rule', icon: <FileText size={32} color="#F59E0B" />, title: '취업규칙 분석', desc: '취업규칙의 필수 기재사항을 확인합니다', bg: '#fff4e6' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'white' }}>
            {/* 헤더 */}
            <header style={{
                background: '#003366',
                color: 'white',
                padding: isMobile ? '12px 16px' : '16px 48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <ShieldCheck size={isMobile ? 24 : 28} />
                    <span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 700 }}>노동법 AI 분석</span>
                </div>
                {!isMobile && (
                    <nav style={{ display: 'flex', gap: '32px' }}>
                        {services.map(s => (
                            <button key={s.key} onClick={() => goToService(s.key)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '15px', fontWeight: 500 }}>
                                {s.title.replace(' 분석', '')}
                            </button>
                        ))}
                    </nav>
                )}
            </header>

            {/* 히어로 섹션 */}
            <section style={{
                padding: isMobile ? '40px 20px' : '80px 48px',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: isMobile ? '32px' : '64px',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                <div>
                    <div style={{
                        display: 'inline-block',
                        background: '#f0f4ff',
                        border: '1px solid #d0d9ff',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        marginBottom: '24px'
                    }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#003366' }}>고용노동부</span>
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? 'clamp(28px, 8vw, 48px)' : '48px',
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: '#001F54',
                        marginBottom: '24px',
                        wordBreak: 'keep-all'
                    }}>
                        당신의 노동 권리,{isMobile ? ' ' : <br />}AI가 검토해드립니다
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '14px' : '16px',
                        color: '#666',
                        marginBottom: '32px',
                        lineHeight: 1.6,
                        wordBreak: 'keep-all'
                    }}>
                        근로계약서, 임금명세서, 취업규칙을 업로드하면{isMobile ? ' ' : <br />}
                        AI가 노동법 위반 여부를 즉시 분석합니다
                    </p>

                    <div style={{ marginBottom: '40px' }}>
                        {['최신 근로기준법 반영', '무료 분석 서비스', '신속한 결과 제공'].map(text => (
                            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <CheckCircle2 size={20} color="#22C55E" />
                                <span style={{ fontSize: isMobile ? '14px' : '15px', color: '#333' }}>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* 모바일: 서비스별 버튼 / 데스크톱: 단일 CTA */}
                    {isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {services.map(s => (
                                <button key={s.key} onClick={() => goToService(s.key)} style={{
                                    padding: '14px 24px',
                                    background: '#0056B3',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}>
                                    {s.title} <ArrowRight size={18} />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <button onClick={() => goToService('contract')} style={{
                            padding: '16px 40px',
                            background: '#0056B3',
                            color: 'white',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.3s'
                        }}>
                            분석 시작하기 <ArrowRight size={20} />
                        </button>
                    )}
                </div>

                {/* 업로드 존 (데스크톱만) */}
                {!isMobile && (
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '48px',
                        border: '2px dashed #0056B3',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '450px'
                    }}>
                        <Upload size={72} color="#0056B3" style={{ marginBottom: '24px' }} />
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#001F54', marginBottom: '8px', textAlign: 'center' }}>파일을 드래그 & 드롭하거나 클릭하세요</h3>
                        <p style={{ fontSize: '15px', color: '#666', marginBottom: '8px' }}>근로계약서, 임금명세서, 취업규칙</p>
                        <p style={{ fontSize: '13px', color: '#999' }}>지원 형식: PDF, JPG, PNG (최대 10MB)</p>
                    </div>
                )}
            </section>

            {/* 서비스 카드 섹션 */}
            <section style={{
                padding: isMobile ? '40px 20px' : '60px 48px',
                background: '#f8fafc',
                borderTop: '1px solid #e2e8f0'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    fontSize: isMobile ? '24px' : '32px',
                    fontWeight: 700,
                    color: '#001F54',
                    marginBottom: isMobile ? '32px' : '48px',
                    wordBreak: 'keep-all'
                }}>
                    서비스 안내
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: '20px',
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {services.map(item => (
                        <div key={item.key} onClick={() => goToService(item.key)} style={{
                            background: 'white',
                            padding: '28px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            border: '1px solid #e2e8f0',
                            textAlign: 'center'
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{ width: '64px', height: '64px', background: item.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#001F54' }}>{item.title}</h3>
                            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 특장점 (데스크톱만) */}
            {!isMobile && (
                <section style={{ background: '#f8f9fa', padding: '80px 48px' }}>
                    <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 700, color: '#001F54', marginBottom: '64px' }}>
                        왜 AI 노동법 분석 서비스인가요?
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                        {[
                            { icon: <ArrowRight size={32} color="#0056B3" />, bg: '#e6f0ff', title: '신속한 분석', desc: '복잡한 노동법 조항을 AI가 자동 분석하여 신속하게 결과를 제공합니다.' },
                            { icon: <CheckCircle2 size={32} color="#22C55E" />, bg: '#e6fff0', title: '정확한 검토', desc: '2026년 최신 근로기준법을 반영하여 법률 위반 사항을 정확하게 식별합니다.' },
                            { icon: <FileText size={32} color="#F59E0B" />, bg: '#fff4e6', title: '상세한 가이드', desc: '위반 사항뿐만 아니라 개선 방안과 관련 법조항까지 상세히 안내합니다.' },
                        ].map(f => (
                            <div key={f.title} style={{ background: 'white', padding: '32px', borderRadius: '12px', textAlign: 'center' }}>
                                <div style={{ width: '64px', height: '64px', background: f.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#001F54' }}>{f.title}</h3>
                                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 푸터 */}
            <footer style={{ background: '#001F54', color: 'white', padding: isMobile ? '32px 20px 24px' : '48px 48px 32px' }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '24px' : '40px'
                }}>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>분석 서비스</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {services.map(s => (
                                <button key={s.key} onClick={() => goToService(s.key)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', textAlign: 'left', fontSize: '14px' }}>
                                    {s.title.replace(' 분석', '')}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>고객지원</h4>
                        <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                            <p>문의하기</p>
                            <p>개인정보처리방침</p>
                            <p>이용약관</p>
                        </div>
                    </div>
                    {!isMobile && (
                        <div>
                            <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>연락처</h4>
                            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                                <p style={{ fontWeight: 700, marginBottom: '4px' }}>고용노동부</p>
                                <p style={{ marginBottom: '8px' }}>(30117) 세종특별자치시 한누리대로 422</p>
                                <p>대표전화 1350(유료, 평일 09시~18시)</p>
                                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>*평일 근무시간(09:00~18:00) 이후 업무상담은 제한될 수 있습니다.</p>
                            </div>
                        </div>
                    )}
                </div>
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.2)',
                    marginTop: isMobile ? '24px' : '32px',
                    paddingTop: isMobile ? '16px' : '24px',
                    textAlign: 'center',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.6)'
                }}>
                    © 2026 고용노동부. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
