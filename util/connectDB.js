import {createConnection} from 'mysql2/promise'
import dotenv from "dotenv";
dotenv.config({path : '.env.local'});
const connectionInfo = {
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_ID,
    password: process.env.MYSQL_PW,
    database: 'stock',
    port:4532
}
export default async function connectDB(info=connectionInfo){
    try{
        return await createConnection(info);
    }catch(err){
        console.log(`Mysql Connection Error : ${err}`)
    }
}