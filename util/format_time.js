/**
 * unix 시간을 lightweight-charts 에 필요한 yyyy-mm-dd 로 변환
 * @param {string} time  unix time
 * @returns {string} yyyy-mm-dd
 */
function modTime(time) {
    const date = new Date(time)
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yy}-${mm}-${dd}`;
}

export {modTime}