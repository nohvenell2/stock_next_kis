import stock_code_name from '../constants/stock_code_name.js';
const CODES = Object.keys(stock_code_name);
/**
 * 입력한 주식 코드가 주식 코드 목록에 포함되있는지 확인
 * @param {string} code 
 * @returns {boolean}
 */
const isCode = (code) => CODES.includes(code)
export default isCode