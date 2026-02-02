import { Upload, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

const Step1Upload = ({ onFileChange }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 모바일 디바이스 감지
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
            const isMobileDevice = mobileRegex.test(userAgent.toLowerCase());
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth <= 768;

            setIsMobile(isMobileDevice || (isTouchDevice && isSmallScreen));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="upload-section" style={{
            padding: isMobile ? '20px' : '40px',
            maxWidth: isMobile ? '100%' : '600px',
            margin: '0 auto'
        }}>
            <Upload className="upload-icon" size={isMobile ? 48 : 64} />
            <div className="upload-title" style={{
                fontSize: isMobile ? '20px' : '24px',
                marginTop: isMobile ? '12px' : '16px'
            }}>
                파일을 업로드하세요
            </div>
            <div className="upload-subtitle" style={{
                fontSize: isMobile ? '13px' : '14px',
                marginTop: '8px'
            }}>
                PDF, JPG, PNG (최대 10MB)
            </div>

            <input
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={onFileChange}
                style={{ display: 'none' }}
                id="file-input"
            />

            {/* 모바일용 카메라 촬영 input */}
            {isMobile && (
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={onFileChange}
                    style={{ display: 'none' }}
                    id="camera-input"
                />
            )}

            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '12px',
                marginTop: '24px',
                justifyContent: 'center',
                width: '100%'
            }}>
                <label
                    htmlFor="file-input"
                    className="upload-button"
                    style={{
                        fontSize: isMobile ? '15px' : '16px',
                        padding: isMobile ? '12px 24px' : '14px 32px',
                        width: isMobile ? '100%' : 'auto'
                    }}
                >
                    <Upload size={18} style={{ marginRight: '8px' }} />
                    파일 선택
                </label>

                {/* 모바일에서만 카메라 버튼 표시 */}
                {isMobile && (
                    <label
                        htmlFor="camera-input"
                        className="upload-button"
                        style={{
                            fontSize: '15px',
                            padding: '12px 24px',
                            width: '100%',
                            background: '#28a745',
                            borderColor: '#28a745'
                        }}
                    >
                        <Camera size={18} style={{ marginRight: '8px' }} />
                        카메라로 촬영
                    </label>
                )}
            </div>
        </div>
    );
};

export default Step1Upload;
