import React, { useState, useEffect } from 'react';
import { apiClient } from '../../utils/apiClient';

const LoadingOverlay = ({ isAnalyzing, progress }) => {
    const [tip, setTip] = useState('');

    useEffect(() => {
        if (isAnalyzing) {
            setTip('💡 근로기준법을 분석하고 있습니다...'); // Initial placeholder

            const fetchTip = async () => {
                try {
                    // 서버에서 이미 중복 방지를 처리하므로 단순히 요청만 하면 됨
                    const res = await apiClient.get(`/api/tips/random?_t=${Date.now()}`);
                    const data = await res.json();
                    if (data.tip) {
                        setTip(data.tip);
                        console.log('[LoadingOverlay] 새 팁 수신:', data.tip.substring(0, 50) + '...');
                    }
                } catch (error) {
                    console.error('[LoadingOverlay] 팁 가져오기 실패:', error);
                    // 에러 발생 시 기본 팁 유지
                }
            };

            fetchTip();
            // Rotate tips every 3 seconds
            const interval = setInterval(fetchTip, 3000);
            return () => clearInterval(interval);
        }
    }, [isAnalyzing]);

    if (!isAnalyzing) return null;

    return (
        <div className="loading-overlay">
            <div className="loading-content" style={{
                maxWidth: '90%',
                width: '100%',
                maxWidth: 'min(600px, 90vw)',
                padding: '20px'
            }}>
                <div className="loading-spinner"></div>
                <div style={{
                    marginTop: '20px',
                    fontSize: 'clamp(16px, 4vw, 18px)',
                    fontWeight: 600,
                    color: '#003366'
                }}>
                    분석 중... {progress}%
                </div>
                <div style={{
                    marginTop: '24px',
                    padding: 'clamp(12px, 3vw, 16px)',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    fontSize: 'clamp(13px, 3.5vw, 15px)',
                    color: '#495057',
                    lineHeight: '1.6',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    wordBreak: 'keep-all',
                    whiteSpace: 'normal',
                    minHeight: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    {tip}
                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
