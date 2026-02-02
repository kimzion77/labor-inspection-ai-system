import { Router } from 'express';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import XLSX from 'xlsx';
import { laborLawTips } from '../data/laborLawTips.js';

const router = Router();

// 최근에 사용된 팁을 추적 (최대 10개)
const recentTips = [];
const MAX_RECENT_TIPS = 10;

console.log(`[TIPS] laborLawTips 배열 로드 완료: ${laborLawTips.length}개 팁`);

// 팁 생성 라우트
router.get('/random', async (req, res) => {
    console.log(`[TIPS] /random 요청 수신`);
    res.set('Cache-Control', 'no-store');

    try {
        console.log(`[TIPS] 현재 recentTips 길이: ${recentTips.length}, 내용:`, recentTips.map(t => t.substring(0, 20)));

        let selectedTip;
        let attempts = 0;
        const maxAttempts = 50;

        // 사용 가능한 팁 풀 생성 (최근 사용된 팁 제외)
        const availableTips = laborLawTips.filter(tip => !recentTips.includes(tip));
        console.log(`[TIPS] 사용 가능한 팁: ${availableTips.length}/${laborLawTips.length}`);

        // 모든 팁을 다 사용했다면 recentTips 초기화
        if (availableTips.length === 0) {
            console.log(`[TIPS] 모든 팁 사용됨, recentTips 초기화`);
            recentTips.length = 0;
            selectedTip = laborLawTips[Math.floor(Math.random() * laborLawTips.length)];
        } else {
            // 사용 가능한 팁 중에서 랜덤 선택
            const randomIndex = Math.floor(Math.random() * availableTips.length);
            selectedTip = availableTips[randomIndex];
            console.log(`[TIPS] 랜덤 인덱스: ${randomIndex}, 선택된 팁: ${selectedTip.substring(0, 30)}...`);
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
        res.json({ tip: "💡 2026년 최저임금은 시간급 10,320원이에요." });
    }
});

export default router;
