//todo 임시로 db 에서 코드 가져와 json 으로 저장하는 파일 
import connectDB from "../util/connectDB.js";
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path'
//DB 에서 주식 코드, 이름 가져오기
const conn = await connectDB()
const [rows] = await conn.execute('SELECT stock_code, stock_name FROM stock_info');
//주식 코드 : 한글명 객체
const data = {}
rows.forEach(row => {
    data[row.stock_code] = row.stock_name
})
conn.end()
const jsonData = JSON.stringify(data, null, 4)
writeFileSync('constants/stock_code_name.json', jsonData, 'utf-8');

/* 절대경로 찾기
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