/**
 * 미국형 숫자 축약 형식으로 반환
 * @param {Number | string} n 
 * @param {string} front 
 * @param {string} back 
 * @returns {string}
 */
function formatBigNumber_en(n,front = '', back = '') {
    const number = Number(n)
	let number_short;
	if (number < 1e3) number_short = `${number.toFixed(2)}` // Less than Thousand
    if (number >= 1e3) number_short = `${(number / 1e3).toFixed(2)}K`; // Thousand
    if (number >= 1e6) number_short = `${(number / 1e6).toFixed(2)}M`; // Million
    if (number >= 1e9) number_short = `${(number / 1e9).toFixed(2)}B`; // Billion
    if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}T`; // Trillion
    return `${front}${number_short}${back}`;
}
/**
 * 한국형 숫자 축약 형식으로 반환
 * @param {Number | string} n 
 * @param {string} front 
 * @param {string} back 
 * @returns {string}
 */
function formatBigNumber_kr(n,front = '', back = ''){
    const number = Number(n)
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}`;   // 만 이하
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}만`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}억`;   // 억
	if (number >= 1e12) number_short = `${(number / 1e12).toFixed(2)}조`; // 조
	return `${front}${number_short}${back}`;
}
/**
 * 억 단위 숫자를 한국 숫자 축약 형식으로 반환
 * @param {Number | string} n 
 * @param {string} front 
 * @param {string} back 
 * @returns {string}
 */
function formatMarketCap_kr(n,front = '', back = ''){
    const number = Number(n)
	let number_short;
	if (number < 1e4) number_short = `${(number / 1e4).toFixed(2)}억`;   // 만
    if (number >= 1e4) number_short = `${(number / 1e4).toFixed(2)}조`;   // 만
    if (number >= 1e8) number_short = `${(number / 1e8).toFixed(2)}경`;   // 억
	return `${front}${number_short}${back}`;
}
/**
 * 세자릿수마다 컴마가 붙는 숫자 형식
 * @param {Number|string} n 
 * @param {string} front 
 * @param {string} back 
 * @returns {string}
 */
function formatNumberComma(n,front='',back=''){
    const number = Number(n)
    return `${front}${number.toLocaleString('en-us')}${back}`
}
/**
 * 숫자를 소숫점 n 자리수로 강제하고, 소숫점 부분이 .000 이면 Int 문자열로 반환
 * @param {Number|string} n 
 * @param {Number} fixed
 * @param {string} front 
 * @param {string} back 
 * @returns {string}
 */
function formatFloatInt(n,fixed,front='',back=''){
    const number = Number(n)
    const number_str = number.toFixed(fixed);
    const number_convert = number_str.endsWith(".00") ? parseInt(number_str) : number_str
    return `${front}${number_convert}${back}`
}

export { formatBigNumber_en, formatBigNumber_kr, formatMarketCap_kr, formatNumberComma, formatFloatInt }