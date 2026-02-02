import { laborLawTips } from './data/laborLawTips.js';

console.log('=== laborLawTips 테스트 ===');
console.log('총 팁 개수:', laborLawTips.length);
console.log('\n처음 5개 팁:');
laborLawTips.slice(0, 5).forEach((tip, index) => {
    console.log(`${index + 1}. ${tip}`);
});

console.log('\n랜덤 10개 팁:');
const recentTips = [];
for (let i = 0; i < 10; i++) {
    const availableTips = laborLawTips.filter(tip => !recentTips.includes(tip));
    const selectedTip = availableTips[Math.floor(Math.random() * availableTips.length)];
    recentTips.push(selectedTip);
    console.log(`${i + 1}. ${selectedTip.substring(0, 50)}...`);
}
