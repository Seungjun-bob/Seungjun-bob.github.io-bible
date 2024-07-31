const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config();

// 커넥션 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,             // MariaDB 기본 포트
  dateStrings: 'date',
  connectionLimit: 1000,    // 최대 커넥션 수
  multipleStatements: true  // 여러 개의 SQL 문을 실행할 수 있도록 허용
});

// 쿼리 실행 함수
async function runQuery(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows, fields] = await connection.execute(query, params);
    return rows;
  } catch (err) {
    console.error('쿼리 실행 오류:', err.message);
    throw err; // 또는 적절한 오류 처리를 수행하세요
  } finally {
    if (connection) connection.release(); // 커넥션을 풀에 반환합니다
  }
}

// 데이터베이스 종료 함수
async function closeDb() {
  try {
    await pool.end();
    console.log('데이터베이스 연결이 종료되었습니다.');
  } catch (err) {
    console.error('커넥션 풀 종료 오류:', err.message);
  }
}

// 모듈 내보내기
module.exports = {
  runQuery,
  closeDb
};
