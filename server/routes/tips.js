import { Router } from 'express';
import { fallbackTips } from '../data/fallbackTips.js';

const router = Router();

// 최근에 사용된 팁을 추적 (최대 10개)
const recentTips = [];
const MAX_RECENT_TIPS = 10;

console.log(`[TIPS] fallbackTips 배열 로드 완료: ${fallbackTips.length}개 팁`);

// 팁 생성 라우트
router.get('/random', async (req, res) => {
    console.log(`[TIPS] /random 요청 수신`);
    res.set('Cache-Control', 'no-store');

    try {
        console.log(`[TIPS] 현재 recentTips 길이: ${recentTips.length}`);

        let selectedTip;

        // 사용 가능한 팁 풀 생성 (최근 사용된 팁 제외)
        const availableTips = fallbackTips.filter(tip => !recentTips.includes(tip));
        console.log(`[TIPS] 사용 가능한 팁: ${availableTips.length}/${fallbackTips.length}`);

        // 모든 팁을 다 사용했다면 recentTips 초기화
        if (availableTips.length === 0) {
            console.log(`[TIPS] 모든 팁 사용됨, recentTips 초기화`);
            recentTips.length = 0;
            selectedTip = fallbackTips[Math.floor(Math.random() * fallbackTips.length)];
        } else {
            // 사용 가능한 팁 중에서 랜덤 선택
            const randomIndex = Math.floor(Math.random() * availableTips.length);
            selectedTip = availableTips[randomIndex];
            console.log(`[TIPS] 선택된 팁: ${selectedTip.substring(0, 30)}...`);
        }

        // 최근 사용된 팁 목록에 추가
        recentTips.push(selectedTip);

        // 최대 개수 초과 시 가장 오래된 것 제거
        if (recentTips.length > MAX_RECENT_TIPS) {
            const removed = recentTips.shift();
            console.log(`[TIPS] 가장 오래된 팁 제거: ${removed.substring(0, 20)}...`);
        }

        // Add emoji if missing
        const tip = selectedTip.startsWith('💡') ? selectedTip : `💡 ${selectedTip}`;

        console.log(`[TIPS] 최종 전송 팁: ${tip.substring(0, 50)}...`);

        res.json({ tip });
    } catch (error) {
        console.error('[TIPS] 팁 생성 실패:', error);
        res.json({ tip: "💡 근로계약서는 근로 시작 전에 반드시 서면으로 작성하고, 사업주와 근로자가 각각 1부씩 보관해야 합니다." });
    }
});

export default router;

