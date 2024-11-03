/**
 * Change Number or NumberString to Long Version. ex-12억3014만
 * @param {string | number} n 
 * @returns {string}
 */
function formatNumberLong(n) {
    const num = n.toString()
    const units = ['', '만', '억', '조', '경']; // 각 단위 배열
    const unit_no = Math.floor((num.length - 1) / 4)
    const unit_first = units[unit_no]
    const unit_last = unit_no ? units[unit_no - 1] : ''
    const num_base = num.length % 4 || 4
    const num_high = num.slice(0, num_base)
    const num_low = num.slice(num_base, num_base + 4)
    return `${num_high}${unit_first} ${num_low}${unit_last}`.trim()
}
/**
 * Change Number or NumberString to Short Version. ex-12.34만
 * @param {string | number} n 
 * @returns {string}
 */
function formatNumberShort(n) {
    const num = n.toString();
    const unit_no = (Math.floor((num.length - 1) / 4)) * 4
    /*만 미만이면 수정 안함*/
    if (!unit_no) { return num }
    /*최대 단위숫자가 두자릿수 이하이면 소수점 이하 두자릿수까지 표시, 아니면 최대 단위 이상만 표시
    ex) 12345 -> 1.23만 123456 -> 12.34만 1234567 -> 123만
    */
    else {
        const unit_name = ['', '만', '억', '조', '경'][Math.floor((num.length - 1) / 4)]; // 각 단위 배열
        const unit_main = num.slice(0, -1 * unit_no)
        const unit_part = num.slice(-1 * unit_no).slice(0, 2).replace(/0+$/, '')
        return num.length%4 > 2 || num.length%4 === 0 ? `${unit_main}${unit_name}`:
            !unit_part? `${unit_main}${unit_name}` : `${unit_main}.${unit_part}${unit_name}`
    }
}

function formatBigNumber_en(number,front = '', back = '') {
	let number_short;
	if (number < 1e3) number_short = `${number.toFixed(2)}` // Less than Thousand
    if (number >= 1e3) number_short = `${(number / 1e3).toFixed(2)}K`; // Thousand
    if (number >= 1e6) number_short = `${(number / 1e6).toFixed(2)}M`; // Million
    if (number >= 1e9) number_short = `${(number / 1e9).toFixed(2)}B`; // Billion
    if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}T`; // Trillion
    return `${front} ${number_short} ${back}`;
}

function formatBigNumber_kr(number,front = '', back = ''){
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}`;   // 만 이하
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}만`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}억`;   // 억
	if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}조`; // 조
	return `${front} ${number_short} ${back}`;
}

function formatMarketCap_kr(number,front = '', back = ''){
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}억`;   // 만
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}조`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}경`;   // 억
	return `${front} ${number_short} ${back}`;
}

export { formatNumberLong, formatNumberShort, formatBigNumber_en, formatBigNumber_kr, formatMarketCap_kr }