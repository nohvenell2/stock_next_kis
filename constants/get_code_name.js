// 임시로 db 에서 코드 가져와 json 으로 저장하는 파일 
//todo 파일 기반으로 주식 코드 이름 정보를 다루기 때문에 주기적으로 실행해야함
//todo 추후 fetching 후 상태로 관리하도록 변경해야한다
import connectDB from "../util/connectDB.js";
import { writeFileSync } from 'fs';
//DB 에서 주식 코드, 이름 가져오기
const conn = await connectDB()
const [rows] = await conn.execute('SELECT stock_code, stock_name FROM stock_info ORDER BY market_cap DESC');
//주식 코드 : 한글명 객체
const stock_code_name = {}
const stock_code_codes = []
rows.forEach(row => {
    stock_code_name[row.stock_code] = row.stock_name
    stock_code_codes.push({stock_code:row.stock_code,stock_name:row.stock_name})
})
conn.end()
const jsonData1 = JSON.stringify(stock_code_name, null, 4)
writeFileSync('constants/stock_code_name.json', jsonData1, 'utf-8');
const jsonData2 = JSON.stringify(stock_code_codes, null, 4)
writeFileSync('constants/stock_code_codes.json', jsonData2, 'utf-8');
//export {stock_code_name, stock_code_codes}

/* 절대경로 찾기
import { fileURLToPath } from 'url';
import path from 'path';
//파일로 저장
//ES 모듈에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 저장할 경로 설정 (현재 프로젝트의 루트 디렉토리 기준)
const jsonData = JSON.stringify(data, null, 2)
const filePath = path.join(__dirname, 'constants', 'stock_code_name.json');
//console.log(filePath)
//console.log(jsonData)
writeFileSync(filePath, jsonData, 'utf-8');
*/