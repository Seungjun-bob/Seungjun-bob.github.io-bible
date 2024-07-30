const Database = require('better-sqlite3');
const path = require('path');
// 데이터베이스 파일 경로 설정
const dbPath = path.join(__dirname, 'db', 'data');

// 데이터베이스 연결
const db = new Database(dbPath);

// 쿼리 실행 함수
function runQuery(query, params = []) {
  try {
    return db.prepare(query).all(params);
  } catch (err) {
    console.error('쿼리 실행 오류:', err.message);
    throw err; // 또는 적절한 오류 처리를 수행하세요
  }
}

// 데이터베이스 종료 함수
function closeDb() {
  db.close();
  console.log('데이터베이스 연결이 종료되었습니다.');
}

// 모듈 내보내기
module.exports = {
  runQuery,
  closeDb
};